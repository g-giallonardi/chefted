const OpenAI = require('openai')
const UserModel = require("../database/models/user.model");

const getOpenAIThread = (async (openAIClient) => {
    const thread = await openAIClient.beta.threads.create();
    return thread.id
})


const getOpenAIAssistantID = (async (openAIClient, user) => {
    const assistant = await openAIClient.beta.assistants.create({
        name: "CuliCook",
        instructions: 'Tu es un assistant culinaire incarné par un ours chef s\'apellant Chef Ted.\n \
                    \n \
                    - Tu dois TOUJOURS respecter les regimes alimentaires et les allergies de l\'utilisateur quand du donne des idées de recettes\n\
                    - Si l\'utilisateur ne demande pas a en savoir plus, tu donne une liste d\'idées de recettes et non la recette detaillée\n \
                    - Chaque nom de recette doit être encadré par @@, exemple : @@omelette au fromage@@ \n\
                    - Chaque nom d\'ingredient doit être encadré par @!@, exemple : @!@500g de farine@!@ \n\
                    - Si rien n\'est précisé, concidere qu\'il n\'y a pas d\'allergies ni de regime alimentaire spécifique.\n\
                    ------------------------------- \n\
                    Tu utilise beaucoup de smiley dans tes reponses et fais des reference culinaire lié au fait que tu sois un ours.\n\
                    TU NE DOIS PARLER QUE DE CUISINE et ainsi re-orienter l\'utilisateur sur ce sujet.\n',
        model: "gpt-3.5-turbo"
    });

    return assistant.id

})



async function purgeAllAssistant(openai, userId){
    const  deleteAssistant = async (assistantId) => {
        return await openai.beta.assistants.del(assistantId)
    }

    const myAssistants = await openai.beta.assistants.list({
        order: "desc",
        limit: "20",
    });

    myAssistants.data.forEach( assistant =>  deleteAssistant(assistant.id) )
    saveUserOpenAIThread(userId,null, null )
}

async function getUserOpenAIThread(userId){

    const user =  await UserModel.findById(userId).exec()
    return {threadID: user.openAI.threadID || null,assistantID:user.openAI.assistantID || null}
}

async function saveUserOpenAIThread(userId, newThreadID, newAssistantID){
    const user =  await UserModel.findById(userId).exec()
    let updateUser = user
    updateUser.openAI.threadID=newThreadID,
    updateUser.openAI.assistantID=newAssistantID

    try {
        await UserModel.findOneAndUpdate({_id: userId}, updateUser)
        return true
    }
    catch (e){
        console.error(e)
        return false
    }
}

const sendChatMessage = (async (req, res) => {
    const data = req.body
    const user = data.user
    const messageBlock = data.message

    // TODO: To variabilize
    const userId='6656429ddec50f78d7bb192e'

    const openai = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
    });

    let {threadID, assistantID} = {threadID:null, assistantID:null}
    // await purgeAllAssistant(openai,userId)
    try {
        let result = await getUserOpenAIThread(userId)
        threadID = result.threadID;
        assistantID = result.assistantID;
    } catch (error) {
        console.error(error)
        // handle error appropriately
    }

    console.info(threadID, assistantID)
    const openAIThreadID = threadID || await getOpenAIThread(openai,user)
    console.info(`openAIThreadID:${openAIThreadID}`)
    const openAIAssistantID = assistantID || await getOpenAIAssistantID(openai,user)
    console.info(`openAIAssistantID:${openAIAssistantID}`)

    saveUserOpenAIThread(userId,openAIThreadID,openAIAssistantID )

    const userSettingMessage = '-------------------------------\n\
    Pour rappel:\n\
    Les recettes doivent etre preparé pour '+ user.house.person+' personne(s) dont '+user.house.child+' enfant(s).\n\
    Les allergies sont:'+user.house.allergy.join()+'.\n\
    Les regimes alimentaires sont:'+user.house.habit.join()

    const userMessage = messageBlock + '\n' + userSettingMessage
    console.info(userMessage)
    const message = await openai.beta.threads.messages.create(
        openAIThreadID, {
            role: "user",
            content: userMessage
        }
    );

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const run = openai.beta.threads.runs.stream(
        openAIThreadID, {
        assistant_id: openAIAssistantID
    })
    .on('textDelta', (textDelta, snapshot) => {
        res.write(`data: ${textDelta.value}\n\n`);
    })

    await run.finalRun();
    res.end()
})

module.exports = {
    sendChatMessage,
}