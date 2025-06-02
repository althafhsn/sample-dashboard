# 📊 Sales Prediction System — Full Stack Project

A modern full-stack sales prediction and management system built with:

- **📦 Sample Dashboard Frontend** (React 19 + TypeScript + Tailwind CSS)
- **⚡ FastAPI Backend** (Python 3.8+)

This project allows users to manage sales data and generate a 7-day forecast through a sleek dashboard UI and a high-performance API.

---

## 📁 Project Structure


├── backend/ # FastAPI backend
│ ├── app/
│ │ ├── FileStorage.py
│ │ ├── main.py
│ │ └── models.py
│ │ └── sales.py
│ ├── run.py   # FastAPI app entry point
│ └── requirements.txt
  └── sales_data.txt  # Dummy DB
   
├── frontend/ # Sample Dashboard Frontend
│ ├── public/
│ ├── src/
│ ├── tailwind.config.js
│ ├── package.json
│ └── ...
└── README.md 



---

## 🚀 Features

### 📦 Backend (FastAPI)

- ✅ Create, Read, Update, Delete (CRUD) for sales data
- 📈 Generate dummy sales forecasts for the next 7 days
- 🔧 File-based storage (no database setup required)
- 🧪 Swagger UI for API testing (`/docs`)

### 🧩 Frontend (Sample Dashboard)

- ⚡ Built with React 19, Tailwind CSS, and TypeScript
- 📋 Dashboard UI with tables and forecast data
- 🔄 Responsive layout with modern admin features
- 🧭 React Router support for navigation

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/althafhsn/sample-dashboard.git
cd sample-dashboard

2️⃣ Backend Setup (FastAPI)
Navigate to the backend folder:

bash
Copy
Edit
cd backend
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
# or manually:
pip install fastapi uvicorn pydantic
Run the FastAPI server:

bash
Copy
Edit
uvicorn main:app --reload
Visit:

Swagger API Docs: http://localhost:8000/docs

Root Endpoint: http://localhost:8000


3️⃣ Frontend Setup (Sample Dashboard)
Open a new terminal and navigate to the frontend folder:

bash
Copy
Edit
cd frontend
Install Node dependencies:

bash
Copy
Edit
npm install
# or
yarn install
If you encounter issues, try:

bash
Copy
Edit
npm install --legacy-peer-deps
Run the development server:

bash
Copy
Edit
npm run dev
# or
yarn dev
Visit the dashboard UI at http://localhost:5173

🔌 API Endpoints Overview
Method	Endpoint	Description
GET	/sales	Get all sales
GET	/sales/{id}	Get a specific sale
POST	/sales	Add a new sale
PUT	/sales/{id}	Update an existing sale
DELETE	/sales/{id}	Delete a sale
GET	/sales/forecast	Get dummy 7-day forecast

🛠 Prerequisites
Python 3.8+

Node.js 18+ (20+ recommended)

pip (Python package installer)

npm or yarn (JavaScript package manager)

🧪 Testing the API
Use any of the following tools:

✅ Swagger UI: http://localhost:8000/docs

🧪 Postman or Insomnia

🔁 React frontend connected directly to FastAPI

📜 License
This project is open-source and available under the MIT License.

👨‍💻 Author
Made with ❤️ by Althaf Husain

yaml
Copy
Edit

---

Let me know if you’d like to add:

- Screenshots of the dashboard  
- Environment variable support  
- Docker or deployment steps  
- Production database support (e.g., PostgreSQL or SQLite)

I'm happy to assist!







