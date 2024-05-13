const OpenAI = require('openai')
const {rules} = require("nodemon/lib/rules");

const changeMeal = (async (req, res) => {
    data = req.body
    currentMeal = data.currentMeal
    user = data.user

    const openai = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
    });

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: 'Tu es un assistant culinaire. L\'utilisateur va te fournir une recette qu\'il n\'aime pas.\
                    Trouve un autre plat en respectant les regimes alimentaires suivant: '+user.house.habit.join()+'.\
                    Donne le nom de la recette en JSON au format sous la clé \'recipe\' '
            },
            {
                role: "user",
                content: currentMeal
            }
        ],
        model: "gpt-3.5-turbo",
        response_format: { "type": "json_object" }
    });
    res.send(completion.choices[0].message.content || '')
  console.log(completion.choices[0]);

})

const changeMenu = (async (req, res) => {
    data = req.body
    habit = data.habit
    allergies = data.allergies.filter((a) => a.checked).map((a) => a.name)
    batchCooking = data.batchCooking

    console.info(allergies)
    const openai = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
    });

    let rules = 'You are a cooking assistant\n\
                Create a complete menu for one week.\n\
                You have to follow the below rules:\n\
                - Take care of the following allergies : '+allergies.join()+'\n'
    if(batchCooking){
        rules += '- Week is based on ONLY 3 recipes \n'
    }
    if(habit === 'flexitarien'){
        rules += '- One meal a day must contains animal proteins\n'
    }
    else{
       rules += '- Take care of this specific diet: '+habit+'\n'
    }
    // rules += '- One day in the week, a cheat meal must be plan\n'

    rules += 'Response must be in french and follows the JSON format below :\n\
              { "menu": [{"midi": xxxx,"soir":xxxx},...]}'
    // rules += 'response must be a list'
    console.info(rules)

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: rules,
            },
            {
                role: "user",
                content: 'Compose mon menu'
            }
        ],
        model: "gpt-3.5-turbo",
        // response_format: { "type": "json_object" }
    });
    const content = completion.choices[0].message.content.replaceAll('\n','') || ''
    res.send(content)
    console.log(content);

})

module.exports = {
    changeMeal,
    changeMenu,
}