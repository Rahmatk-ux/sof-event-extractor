# 📌 SoF Event Extractor – Laytime Intelligence

### 🔹 Summary

This project is built for the **MariTHON Hackathon (IME & TBIGEU)**.
It extracts **events, start times, and end times** from **Statements of Facts (SoF)** in PDF and Word formats.
The system outputs structured **JSON** and downloadable **CSV**, with a **React + TailwindCSS frontend** and a **FastAPI backend**.

---

### ⚙️ Local Setup

#### 1. Clone Repository

```bash
git clone https://github.com/Rahmatk-ux/sof-event-extractor.git
cd sof-event-extractor
```

#### 2. Backend (FastAPI)

```bash
cd Backend
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate   # Linux/Mac

pip install -r requirements.txt
uvicorn main:app --reload
```

➡ Runs at: [http://127.0.0.1:8000](http://127.0.0.1:8000)
➡ API Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

#### 3. Frontend (React + Vite)

```bash
cd Frontend
npm install
npm run dev
```

➡ Runs at: [http://127.0.0.1:5173](http://127.0.0.1:5173)

---

### 🚀 Deployment on Render

#### Backend (FastAPI)

1. Inside `Backend/` create a file named **Procfile**:

   ```
   web: uvicorn main:app --host 0.0.0.0 --port 10000
   ```
2. Push changes to GitHub.
3. On [Render](https://render.com):

   * Create **New Web Service** → Connect GitHub repo.
   * Set Root Directory: `Backend/`
   * **Build Command**:

     ```bash
     pip install -r requirements.txt
     ```
   * **Start Command**:

     ```bash
     uvicorn main:app --host 0.0.0.0 --port 10000
     ```
   * Deploy 🎉

#### Frontend (React + Vite)

1. In `Frontend/` update **vite.config.js** with correct backend API URL (Render backend link).
2. Push to GitHub.
3. On Render:

   * Create **New Static Site** → Connect GitHub repo.
   * Root Directory: `Frontend/`
   * **Build Command**:

     ```bash
     npm install && npm run build
     ```
   * **Publish Directory**:

     ```
     dist
     ```
   * Deploy 🎉

---

### 🔗 Links

* 📹 [Hackathon Demo (IME Laytime Calculator)](https://youtu.be/RqXq3IbhAtg)
* 🌐 [IME Website](https://www.theimehub.com)
* 📄 [Hackathon Guidelines](./Guidelines_and_Evaluation_Criteria.docx)
* 🔗 **Deployed Backend**: [https://sof-event-extractor.onrender.com/]
