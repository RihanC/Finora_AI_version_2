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
    try:
        print("User: Tell me a joke about coding.")

        # 3. Generate Chat Completion
        # Using llama-3.1-8b-instant for speed and efficiency.
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": "Tell me a joke about coding.",
                }
            ],
            model="llama-3.1-8b-instant",
        )

        # 4. Output Response
        print(f"Groq: {chat_completion.choices[0].message.content}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run()
