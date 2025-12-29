# EducatAI - AI-Powered Career Mentorship Platform

> An intelligent career mentorship platform that leverages AI agents to provide personalized guidance, job recommendations, and learning resources for career development.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![LangGraph](https://img.shields.io/badge/LangGraph-Latest-purple.svg)](https://langchain-ai.github.io/langgraph/)
[![Python](https://img.shields.io/badge/Python-3.11+-yellow.svg)](https://www.python.org/)

## 🎯 Overview

EducatAI is a full-stack career mentorship platform that combines the power of AI agents, large language models, and real-time data to provide personalized career guidance. The platform helps users:

- 📄 **Parse and analyze resumes** to extract skills, experience, and qualifications
- 💼 **Discover real job opportunities** from LinkedIn, Indeed, Glassdoor, and other platforms
- 📊 **Analyze market trends** including salary insights, demand forecasts, and skill gaps
- 📚 **Get personalized learning recommendations** tailored to career goals
- 🗺️ **Generate custom learning roadmaps** with milestones and progress tracking
- 💬 **Chat with an AI career mentor** for guidance and advice

## 🏗️ Architecture

### Tech Stack

**Backend:**

- **FastAPI** - Modern, high-performance Python web framework
- **LangGraph** - Stateful AI agent orchestration framework
- **PostgreSQL** - Primary database with pgvector extension
- **Claude 3.5 Sonnet** (via Anthropic) - Advanced language model for AI reasoning
- **Voyage AI** - Semantic embeddings for intelligent job matching
- **JSearch API** (RapidAPI) - Real-time job data aggregation

**Frontend:**

- **React 19** - Modern UI with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **React Router** - Client-side routing
- **Appwrite** - Authentication and user management

**AI & ML:**

- **LangChain** - LLM application framework
- **Voyage AI Embeddings** (voyage-3.5) - Semantic similarity scoring
- **Claude 3.5 Sonnet** - Natural language understanding and generation
- **LangGraph State Machine** - Conversational agent state management

## ✨ Key Features

### 1. 📄 Resume Parser

- Extract structured data from PDF and DOCX resumes
- AI-powered parsing using Claude 3.5 Sonnet
- Identifies: Name, email, phone, skills, experience, education, certifications, projects
- Automatic user profile creation from parsed data

### 2. 💼 Real-Time Job Recommendations

- **JSearch API Integration**: Aggregates jobs from LinkedIn, Indeed, Glassdoor, ZipRecruiter
- **Semantic Matching**: Voyage AI embeddings calculate 0-100 match scores
- **Real URLs**: Direct links to company career pages and job boards
- **Actual Salary Data**: Real compensation ranges from job postings
- **Smart Filtering**: Location preferences, experience level, employment type

### 3. 📊 Market Trends Analysis

- AI-powered analysis of current market conditions
- Salary insights and compensation trends
- Job demand forecasting
- Skill gap identification
- Industry-specific recommendations

### 4. 📚 Learning Resources

- Personalized course and tutorial recommendations
- Multiple learning platforms: Coursera, Udemy, YouTube, official docs
- Difficulty levels: Beginner, Intermediate, Advanced
- Duration and cost estimates
- Prerequisite guidance

### 5. 🤖 AI Career Mentor

- Conversational AI agent built with LangGraph
- Contextual understanding of career goals
- Long-term memory across sessions
- Personalized advice and guidance
- Progress tracking and milestone management

### 6. 🗺️ Learning Roadmaps

- Custom learning paths based on target roles
- Milestone-based progress tracking
- Weekly progress insights
- Roadmap regeneration with updated goals

## 🚀 Getting Started

### Prerequisites

- **Python 3.11+**
- **Node.js 18+** and npm/yarn
- **PostgreSQL 15+** with pgvector extension
- **API Keys**:
  - Anthropic (Claude)
  - Voyage AI
  - JSearch API (RapidAPI)

### Backend Setup

1. **Clone the repository**

```bash
git clone https://github.com/agspades/educat-anokha.git
cd educat-anokha/server
```

2. **Create virtual environment**

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Setup PostgreSQL**

```bash
# Create database
createdb educat_db

# Enable pgvector extension
psql educat_db -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

5. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/educat_db

# AI Services
ANTHROPIC_API_KEY=your_anthropic_api_key_here
VOYAGE_API_KEY=your_voyage_api_key_here

# JSearch API (RapidAPI)
JSEARCH_API_KEY=your_jsearch_api_key_here
JSEARCH_API_HOST=jsearch.p.rapidapi.com

# App Configuration
APP_NAME=EducatAI Career Mentor
APP_VERSION=1.0.0
LOG_LEVEL=INFO
```

6. **Initialize database**

```bash
python -m database  # Creates tables
```

7. **Run the server**

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

- API Documentation: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to client directory**

```bash
cd ../client
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Appwrite** (for authentication)
   Edit `src/lib/appwrite.ts` with your Appwrite project details.

4. **Run development server**

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Health & Status

- `GET /` - Health check and API version

### Agent Interactions

- `POST /agent/message` - Send message to AI career mentor
- `GET /agent/memory/summary` - Get user's memory summary
- `GET /agent/progress` - Get weekly progress insights

### Resume & Profile

- `POST /agent/resume/parse` - Upload and parse resume (PDF/DOCX)
- Returns structured data: name, email, skills, experience, education

### Job Recommendations

- `POST /agent/jobs/recommend` - Get personalized job recommendations

```json
{
  "user_id": "user_123",
  "limit": 10,
  "location": "Remote",
  "employment_type": "FULLTIME"
}
```

### Market Trends

- `POST /agent/market/trends` - Analyze market trends for target role

```json
{
  "user_id": "user_123"
}
```

### Learning Resources

- `POST /agent/learning/resources` - Get personalized learning recommendations

```json
{
  "user_id": "user_123",
  "topic": "Python Backend Development",
  "difficulty": "intermediate"
}
```

### Roadmaps & Progress

- `POST /agent/roadmap/regenerate` - Generate new learning roadmap
- `POST /agent/milestone/complete` - Mark milestone as completed
- `POST /agent/job/application` - Log job application outcome

## 🧪 Testing

### Test Resume Parsing

```bash
# Place test PDF in test-docs/ directory
cd server
python -c "
from resume_parser import resume_parser
result = resume_parser.parse_resume('test-docs/sample_resume.pdf')
print(result)
"
```

### Test Job Recommendations

```bash
# Direct test of JSearch API integration
cd server
python test_jsearch.py
```

### Test API Endpoints

```bash
# Using curl
curl -X POST http://localhost:8000/agent/jobs/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test_user",
    "limit": 5
  }'
```

## 📁 Project Structure

```
educat-anokha/
├── client/                    # React frontend
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── auth-components/  # Authentication UI
│   │   ├── landing-page-components/
│   │   ├── profile-components/
│   │   ├── roadmap-components/
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/            # Custom hooks
│   │   ├── lib/              # Utilities (Appwrite)
│   │   └── main.tsx          # Entry point
│   ├── package.json
│   └── vite.config.ts
│
├── server/                    # FastAPI backend
│   ├── main.py               # FastAPI app & endpoints (11 endpoints)
│   ├── database.py           # SQLAlchemy models & setup
│   ├── config.py             # Pydantic settings
│   ├── schemas.py            # Request/response models
│   ├── services.py           # CareerMentorService (LangGraph agent)
│   ├── resume_parser.py      # Resume parsing with Claude AI
│   ├── job_recommender.py    # Job matching with JSearch + Voyage AI
│   ├── learning_resources.py # Learning resource recommendations
│   ├── requirements.txt      # Python dependencies
│   ├── .env.example          # Environment template
│   ├── test_jsearch.py       # JSearch API test script
│   └── docs/
│       └── JSEARCH_SETUP.md  # JSearch API setup guide
│
└── README.md                  # This file
```

## 🔑 API Keys Setup

### 1. Anthropic (Claude AI)

1. Visit [console.anthropic.com](https://console.anthropic.com/)
2. Create account and generate API key
3. Add to `.env`: `ANTHROPIC_API_KEY=sk-ant-...`

### 2. Voyage AI (Embeddings)

1. Visit [dash.voyageai.com](https://dash.voyageai.com/)
2. Sign up and create API key
3. Add to `.env`: `VOYAGE_API_KEY=pa-...`

### 3. JSearch API (RapidAPI)

1. Visit [rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
2. Subscribe to Basic plan (100 requests/month free)
3. Copy API key from "Code Snippets" section
4. Add to `.env`:

```env
JSEARCH_API_KEY=your_key_here
JSEARCH_API_HOST=jsearch.p.rapidapi.com
```

Detailed setup: [server/docs/JSEARCH_SETUP.md](server/docs/JSEARCH_SETUP.md)

## 🔧 Configuration

Key settings in `server/config.py`:

```python
# Database
DATABASE_URL = "postgresql://..."

# AI Models
ANTHROPIC_API_KEY = "sk-ant-..."
ANTHROPIC_MODEL = "claude-3-5-sonnet-20241022"
VOYAGE_API_KEY = "pa-..."

# JSearch API
JSEARCH_API_KEY = "..."
JSEARCH_API_HOST = "jsearch.p.rapidapi.com"

# Application
APP_NAME = "EducatAI Career Mentor"
LOG_LEVEL = "INFO"
```

## 🐛 Troubleshooting

### Resume Parser Returns Empty Data

- **Cause**: PDF is image-based (scanned document)
- **Solution**: Use text-based PDFs or add OCR support (Tesseract)

### JSearch API Returns 0 Jobs

- **Cause**: Query too specific or rate limit reached
- **Solution**: Simplify search query or wait 60 seconds between requests
- **Free tier limit**: 100 requests/month

### Database Connection Error

- **Check**: PostgreSQL is running (`sudo systemctl status postgresql`)
- **Check**: Database exists (`psql -l | grep educat_db`)
- **Check**: pgvector extension installed (`psql educat_db -c "\dx"`)

### Import Errors

- **Solution**: Ensure virtual environment is activated
- **Solution**: Reinstall dependencies: `pip install -r requirements.txt`

## 🚧 Known Limitations

1. **Resume Parser**: Only works with text-based PDFs (not scanned images)
2. **JSearch API**: Free tier limited to 100 requests/month
3. **Real-time Data**: Job listings may have slight delays (API caching)
4. **Semantic Matching**: Match scores are estimates based on text similarity

## 🔮 Future Enhancements

- [ ] Add OCR support for image-based PDFs (Tesseract/AWS Textract)
- [ ] Implement caching for JSearch API responses
- [ ] Add interview preparation module
- [ ] Integration with more job boards (LinkedIn Jobs API)
- [ ] Resume builder and optimization suggestions
- [ ] Salary negotiation guidance
- [ ] Company culture insights
- [ ] Networking recommendations

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Anthropic** for Claude AI
- **Voyage AI** for semantic embeddings
- **RapidAPI/JSearch** for job data aggregation
- **LangChain** for the excellent AI framework
- **FastAPI** for the amazing web framework

## 📞 Support

For questions or issues:

- Open an issue on GitHub
- Check the [documentation](server/docs/)
- Review API docs at `/docs` endpoint

---

Built with ❤️ using LangGraph, FastAPI, and React
