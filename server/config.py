"""Configuration management for the Career Mentor API."""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Application
    APP_NAME: str = "Agentic Career Mentor API"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # API
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    
    # Database
    DATABASE_URL: str = "sqlite:///./career_mentor.db"
    
    # Anthropic Claude
    ANTHROPIC_API_KEY: str
    ANTHROPIC_MODEL: str = "claude-haiku-4-5-20251001"
    
    # Voyage AI Embeddings
    VOYAGE_API_KEY: str
    VOYAGE_MODEL: str = "voyage-3.5"
    
    # JSearch API (RapidAPI)
    JSEARCH_API_KEY: str = ""
    JSEARCH_API_HOST: str = "jsearch.p.rapidapi.com"
    
    # LangSmith (Optional)
    LANGCHAIN_TRACING_V2: bool = False
    LANGCHAIN_API_KEY: str = ""
    LANGCHAIN_PROJECT: str = "career-mentor"
    
    # Memory & Vector Store
    VECTOR_DIMENSION: int = 1024  # Voyage embeddings are 1024 dimensions
    MEMORY_SIMILARITY_THRESHOLD: float = 0.7
    
    # Agent
    MAX_ITERATIONS: int = 15
    CHECKPOINT_ENABLED: bool = True
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins into a list."""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
