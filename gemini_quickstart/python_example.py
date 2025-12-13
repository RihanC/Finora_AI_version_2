import os
from groq import Groq
from dotenv import load_dotenv

# 1. Load Environment Variables
load_dotenv()

# 2. Authenticate
client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

def run():
    print("--- Groq Chatbot (Type 'quit' to exit) ---")
    while True:
        try:
            user_input = input("You: ")
            if user_input.lower() in ['quit', 'exit']:
                break

            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": user_input,
                    }
                ],
                model="llama-3.1-8b-instant",
            )

            print(f"Groq: {chat_completion.choices[0].message.content}\n")

        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    run()
