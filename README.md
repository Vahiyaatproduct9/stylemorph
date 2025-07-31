🎨 StyleMorph
StyleMorph is an AI-powered styling playground combining a Next.js frontend with a Python backend and buttressed by the Gemini 2.5 Flash AI agent for real-time creativity.

🚀 Features
Gemini 2.5 Flash: fast, efficient, and built for “thinking” — powering StyleMorph’s design logic and style generation 
medium.com
+5
cloud.google.com
+5
news.ycombinator.com
+5
.

Next.js frontend: sleek, reactive UI for interacting with AI.

Python backend: handles AI orchestration, API calls, and data flow.

🧩 Architecture
markdown
Copy
Edit
Gemini 2.5 Flash agent
        ↕
Python backend
        ↕
Next.js frontend
AI messages flow to the backend, which communicates with Gemini and streams responses back to the frontend.

⚙️ Setup Instructions
Clone the repo:

bash
Copy
Edit
git clone https://github.com/Vahiyaatproduct9/stylemorph.git
cd stylemorph
Install backend deps:

bash
Copy
Edit
cd backend && pip install -r requirements.txt
Install frontend deps:

bash
Copy
Edit
cd ../frontend && npm install
Add your Gemini API key and other env variables (.env.local).

Run backend (e.g. FastAPI or Flask):

bash
Copy
Edit
uvicorn api:app --reload
Run frontend:

bash
Copy
Edit
npm run dev
Open localhost:3000, play with StyleMorph.

🧠 Why It’s Cool
Gemini 2.5 Flash is optimized for low-latency and better reasoning in AI interactions—ideal for live styling experiences 
cloud.google.com
.

Modular design makes it easy to swap AI models, scale up, or integrate creative tools.

🛠 Want to contribute?
Open issues or submit PRs—StyleMorph is all about iteration and creative hacking. Any suggestions or style ideas welcome!
