const OpenAI = require('openai')

const getOpenAIThread = (async (openAIClient) => {
    const thread = await openAIClient.beta.threads.create();
    return thread.id
})

const getOpenAIAssistantID = (async (openAIClient, user) => {
    const assistant = await openAIClient.beta.assistants.create({
        name: "CuliCook",
        instructions: 'tu es un assistant culinaire. Tu vas principalement aider l\'utilisateur a concevoir un menu pour le midi et le soir.\n \
                    \n \
                    Pour cela tu dois respecter ses regles dans l\'ordre de priorité:\n \
                    1. tu DOIS ABSOLUMENT respecter le regime alimentaire de l\'utilisateur. \n \
                    2. Si la regle 1 le permet, tu DOIS ABSOLUMENT integrer une recette avec des proteines animales sur un des deux repas\n \
                    3. chaque repas dois avoir un plat et un dessert simple (yaourt, fromage, entremet, etc...)\n \
                    \n \
                    Donne le menu avec les ingredients pour le nombre de personne indiqué par l\'utilisateur ( pour 4 personne si il ne le precise pas) .\n \
                    \n \
                    Les repas doivent etre preparé pour '+ user.house.person+' personne(s) dont '+user.house.child+' enfant(s).\
                    Sauf indications contraire les allergies sont:'+user.house.allergy.join()+'.\
                    Sauf indications contraire les regimes alimentaires sont:'+user.house.habit.join()+'.\
                    Tu utilise beaucoup de smiley dans tes reponses',
        model: "gpt-3.5-turbo"
    });

    return assistant.id

})

const sendChatMessage = (async (req, res) => {
    const data = req.body
    const user = data.user
    const messageBlock = data.message

    const openai = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
    });

    console.info(`user:${JSON.stringify(user)}`)
    const openAIThreadID = user.openAI?.threadID || await getOpenAIThread(openai)
    console.info(`openAIThreadID:${openAIThreadID}`)
    const openAIAssistantID = user.openAI?.assistantID || await getOpenAIAssistantID(openai)
    console.info(`openAIAssistantID:${openAIAssistantID}`)

    const message = await openai.beta.threads.messages.create(
        openAIThreadID, {
            role: "user",
            content: messageBlock
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
        console.info(textDelta.value)
        res.write(`data: ${textDelta.value}\n\n`);
    })

    const result = await run.finalRun();
    res.end()
})

module.exports = {
    sendChatMessage,
}