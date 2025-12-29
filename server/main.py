"""Main FastAPI application for Career Mentor API."""
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
import logging
import uuid

from config import settings
from database import init_db, get_db, UserProfile
from schemas import (
    AgentMessageRequest, AgentMessageResponse,
    RoadmapRegenerateRequest,
    MilestoneCompleteRequest,
    ApplicationOutcomeRequest,
    MemorySummary,
    WeeklyProgress,
    HealthResponse
)
from services import CareerMentorService

# Configure logging
logging.basicConfig(
    level=settings.LOG_LEVEL,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Agentic AI Career Mentor Backend - LangGraph + FastAPI",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize database on startup."""
    logger.info("Starting Career Mentor API...")
    init_db()
    logger.info("Database initialized")


def ensure_user_profile(db: Session, user_id: str) -> UserProfile:
    """
    Ensure user profile exists, create if not found.
    
    Args:
        db: Database session
        user_id: User identifier
    
    Returns:
        UserProfile instance
    """
    profile = db.query(UserProfile).filter(
        UserProfile.user_id == user_id
    ).first()
    
    if not profile:
        profile = UserProfile(
            user_id=user_id,
            skills=[],
            career_goals=[],
            target_role=None
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
        logger.info(f"Created new user profile for {user_id}")
    
    return profile


# Health check
@app.get("/", response_model=HealthResponse)
async def health_check():
    """API health check endpoint."""
    return HealthResponse(
        status="healthy",
        version=settings.APP_VERSION,
        timestamp=datetime.utcnow()
    )


# ============== Protected Endpoints ==============
# All endpoints expect user_id in request body (from frontend auth)

@app.post("/agent/message", response_model=AgentMessageResponse)
async def agent_message(
    request: AgentMessageRequest,
    db: Session = Depends(get_db)
):
    """
    Main agent conversation endpoint.
    
    Frontend should verify user authentication and pass user_id.
    """
    try:
        service = CareerMentorService(db)
        result = await service.process_message(
            user_id=request.user_id,
            message=request.message,
            context=request.context
        )
        
        return AgentMessageResponse(**result)
    
    except Exception as e:
        logger.error(f"Error processing message: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/agent/memory/summary")
async def get_memory_summary(
    user_id: str,
    db: Session = Depends(get_db)
):
    """Get user's long-term memory summary."""
    try:
        service = CareerMentorService(db)
        summary = await service.get_memory_summary(user_id)
        
        return summary
    
    except Exception as e:
        logger.error(f"Error fetching memory summary: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/agent/roadmap/current")
async def get_current_roadmap(
    user_id: str,
    db: Session = Depends(get_db)
):
    """Get user's current active roadmap."""
    try:
        service = CareerMentorService(db)
        roadmap = await service.get_current_roadmap(user_id)
        
        if not roadmap:
            raise HTTPException(status_code=404, detail="No active roadmap found")
        
        return roadmap
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching roadmap: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/agent/roadmap/regenerate")
async def regenerate_roadmap(
    request: RoadmapRegenerateRequest,
    db: Session = Depends(get_db)
):
    """Generate a new personalized roadmap."""
    try:
        # Ensure user profile exists
        ensure_user_profile(db, request.user_id)
        
        service = CareerMentorService(db)
        roadmap = await service.regenerate_roadmap(
            user_id=request.user_id,
            target_role=request.target_role,
            focus_areas=request.focus_areas,
            timeline_weeks=request.timeline_weeks or 12
        )
        
        return roadmap
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error regenerating roadmap: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/agent/milestone/complete")
async def complete_milestone(
    request: MilestoneCompleteRequest,
    db: Session = Depends(get_db)
):
    """Mark a milestone as completed."""
    try:
        service = CareerMentorService(db)
        success = await service.complete_milestone(
            user_id=request.user_id,
            milestone_id=request.milestone_id,
            reflection=request.reflection,
            learned_skills=request.learned_skills
        )
        
        if not success:
            raise HTTPException(status_code=404, detail="Milestone not found")
        
        return {"success": True, "message": "Milestone completed successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error completing milestone: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/agent/application/outcome")
async def log_application_outcome(
    request: ApplicationOutcomeRequest,
    db: Session = Depends(get_db)
):
    """Log job application outcome for learning."""
    try:
        # Ensure user profile exists
        ensure_user_profile(db, request.user_id)
        
        service = CareerMentorService(db)
        app_id = await service.log_application_outcome(
            user_id=request.user_id,
            company=request.company,
            position=request.position,
            status=request.status.value,
            feedback=request.feedback,
            interview_topics=request.interview_topics,
            applied_date=request.applied_date
        )
        
        return {
            "success": True,
            "application_id": app_id,
            "message": "Application outcome logged successfully"
        }
    
    except Exception as e:
        logger.error(f"Error logging application: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/agent/progress/weekly", response_model=WeeklyProgress)
async def get_weekly_progress(
    user_id: str,
    week_offset: int = 0,
    db: Session = Depends(get_db)
):
    """
    Get weekly progress summary.
    
    Args:
        user_id: User identifier
        week_offset: Weeks back from current (0 = this week, 1 = last week)
    """
    try:
        service = CareerMentorService(db)
        progress = await service.get_weekly_progress(user_id, week_offset)
        
        return WeeklyProgress(**progress)
    
    except Exception as e:
        logger.error(f"Error fetching weekly progress: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Run with: uvicorn main:app --reload --host 0.0.0.0 --port 8000
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG
    )
