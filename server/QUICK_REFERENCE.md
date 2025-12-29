# 🚀 Quick Reference Card

## ⚡ One-Line Setup

```bash
cd server && ./start.sh
```

## 🔑 Must Configure

Edit `.env`:

```env
GOOGLE_API_KEY="your_gemini_api_key_here"
```

## 🧪 Test Everything

```bash
python example_usage.py
```

## 📖 View API Docs

```
http://localhost:8000/docs
```

## 🔌 Example API Call

```bash
curl -X POST http://localhost:8000/agent/message \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test123",
    "message": "I want to become a backend developer"
  }'
```

## 📁 Key Files

- `main.py` - API endpoints
- `graph/career_graph.py` - Agent logic
- `memory.py` - Long-term memory
- `services.py` - Business logic
- `database.py` - Data models

## 🛠️ Common Commands

```bash
# Start server
uvicorn main:app --reload

# With Docker
docker-compose up -d

# Check logs
docker-compose logs -f api

# Database shell (SQLite)
sqlite3 career_mentor.db

# Database shell (PostgreSQL)
psql career_mentor_db
```

## 📚 Documentation

- `README.md` - Main docs
- `SETUP.md` - Installation
- `ARCHITECTURE.md` - Technical details
- `PROJECT_OVERVIEW.md` - Visual guide

## 🎯 Core Endpoints

```
POST   /agent/message              # Main chat
GET    /agent/memory/summary       # User context
GET    /agent/roadmap/current      # Active roadmap
POST   /agent/roadmap/regenerate   # New roadmap
POST   /agent/milestone/complete   # Mark done
POST   /agent/application/outcome  # Log job app
GET    /agent/progress/weekly      # Progress report
```

## 🔧 Troubleshooting

- **Port 8000 in use**: Change port in `.env` or use `--port 8001`
- **Database errors**: Run `python -c "from database import init_db; init_db()"`
- **API key errors**: Check `.env` has correct `GOOGLE_API_KEY`
- **Import errors**: Activate venv: `source venv/bin/activate`

## 📊 Project Stats

- 23 files
- 3,500+ lines of code
- 7 API endpoints
- 5 database tables
- 5 agent nodes
- 8 agent tools

---

**Ready to build! 🎉**
