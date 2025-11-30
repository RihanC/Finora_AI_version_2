require('dotenv').config();
const Groq = require('groq-sdk');

// 1. Authenticate
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function run() {
    try {
        console.log('User: Hello, how are you?');

        // 2. Generate Chat Completion
        // Using llama-3.1-8b-instant for speed and efficiency.
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: 'Hello, how are you?',
                },
            ],
            model: 'llama-3.1-8b-instant',
        });

        // 3. Output Response
        console.log('Groq:', chatCompletion.choices[0]?.message?.content || "");
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
