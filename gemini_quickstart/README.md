# Groq API Quickstart

This folder contains ready-to-run code samples for the Groq API using the `llama-3.1-8b-instant` model.

## Prerequisites

- **API Key**: Your API key is stored in `.env`.

## 1. Node.js Example

### Setup
```bash
cd gemini_quickstart
npm install dotenv groq-sdk
```

### Run
```bash
node node_example.js
```

### Expected Output
```text
User: Hello, how are you?
Groq: I'm doing well, thank you! How can I help you today?
```

---

## 2. Python Example

### Setup
```bash
cd gemini_quickstart
pip install python-dotenv groq
```

### Run
```bash
python python_example.py
```

### Expected Output
```text
User: Tell me a joke about coding.
Groq: Why do Java developers wear glasses? Because they don't see sharp.
```

---

## 3. cURL Example

### Run
(Git Bash or Linux/Mac terminal)
```bash
cd gemini_quickstart
bash curl_example.sh
```

### Expected Output
JSON response containing the generated text.
