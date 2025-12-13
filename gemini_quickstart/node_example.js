require('dotenv').config();
const Groq = require('groq-sdk');
require('dotenv').config();
const Groq = require('groq-sdk');

// 1. Authenticate
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function askQuestion() {
    rl.question('You: ', async (userInput) => {
        if (userInput.toLowerCase() === 'exit' || userInput.toLowerCase() === 'quit') {
            rl.close();
            return;
        }

        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [{ role: 'user', content: userInput }],
                model: 'llama-3.1-8b-instant',
            });

            console.log('Groq:', chatCompletion.choices[0]?.message?.content || "");
            console.log(); // Empty line for readability
        } catch (error) {
            console.error('Error:', error);
        }

        askQuestion(); // Loop
    });
}

console.log("--- Groq Chatbot (Type 'quit' to exit) ---");
askQuestion();
