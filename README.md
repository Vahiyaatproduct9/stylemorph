# StyleMorph

StyleMorph is an AI-powered creative tool that allows users to explore and manipulate design styles using real-time intelligence. It integrates a Next.js frontend with a Python backend and leverages the Gemini 2.5 Flash model as the core AI engine.

## Features

- Gemini 2.5 Flash integration for fast, context-aware responses
- AI-driven style transformations and idea generation
- Next.js frontend for responsive user interaction
- Python backend for handling AI communication and data flow
- Modular and scalable architecture

## Tech Stack

- Gemini 2.5 Flash (Google Vertex AI)
- Python (FastAPI or Flask)
- Next.js (React)

## Project Structure

Gemini 2.5 Flash (Google Vertex AI)
↕
Python Backend (API handler)
↕
Next.js Frontend (UI/UX)

bash
Copy
Edit

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Vahiyaatproduct9/stylemorph.git
   cd stylemorph
Backend setup:

bash
Copy
Edit
cd backend
pip install -r requirements.txt
Frontend setup:

bash
Copy
Edit
cd ../frontend
npm install
Configure environment variables:

Create a .env.local file in the frontend directory.

Add your Gemini API key and other necessary configuration.

Start the backend server:

bash
Copy
Edit
uvicorn app:app --reload
Start the frontend development server:

bash
Copy
Edit
npm run dev
Open the app:
Visit http://localhost:3000 in your browser.

About Gemini 2.5 Flash
StyleMorph uses Gemini 2.5 Flash from Google Vertex AI. This model is optimized for high-speed inference and efficient reasoning, making it suitable for interactive, real-time applications such as creative design and style manipulation.

Contributing
Contributions are welcome. If you have suggestions for improvements or additional features, feel free to open an issue or submit a pull request.
