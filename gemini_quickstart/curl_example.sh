# Load API key from .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "Sending request to Groq API..."

curl "https://api.groq.com/openai/v1/chat/completions" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${GROQ_API_KEY}" \
  -d '{
    "model": "llama-3.1-8b-instant",
    "messages": [{
      "role": "user",
      "content": "Explain quantum computing in one sentence"
    }]
  }'

echo -e "\n\nDone."
