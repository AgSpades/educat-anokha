"""Agent tools for interacting with memory, data, and external systems."""
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import json
from sqlalchemy.orm import Session

from langchain.tools import tool
from langchain_google_genai import ChatGoogleGenerativeAI

from database import UserProfile, Milestone, Application, Roadmap
from memory import memory_manager
from config import settings


class CareerMentorTools:
    """Tools available to the career mentor agent."""
    
    def __init__(self, db: Session):
        self.db = db
        self.llm = ChatGoogleGenerativeAI(
            model=settings.GEMINI_MODEL,
            google_api_key=settings.GOOGLE_API_KEY,
            temperature=0.7
        )
    
    async def read_user_profile(self, user_id: str) -> Dict[str, Any]:
        """
        Read complete user profile including skills, goals, and progress.
        
        Args:
            user_id: User identifier
        
        Returns:
            Dictionary with user profile data
        """
        profile = self.db.query(UserProfile).filter(
            UserProfile.user_id == user_id
        ).first()
        
        if not profile:
            # Create new profile
            profile = UserProfile(user_id=user_id)
            self.db.add(profile)
            self.db.commit()
            self.db.refresh(profile)
        
        return {
            "user_id": profile.user_id,
            "current_role": profile.current_role,
            "target_role": profile.target_role,
            "experience_years": profile.experience_years,
            "skills": profile.skills or [],
            "career_goals": profile.career_goals or [],
            "interests": profile.interests or []
        }
    
    async def update_user_skills(
        self,
        user_id: str,
        skills: List[Dict[str, Any]]
    ) -> bool:
        """
        Update user's skill set.
        
        Args:
            user_id: User identifier
            skills: List of skill objects with name, level
        
        Returns:
            Success boolean
        """
        profile = self.db.query(UserProfile).filter(
            UserProfile.user_id == user_id
        ).first()
        
        if profile:
            profile.skills = skills
            profile.updated_at = datetime.utcnow()
            self.db.commit()
            return True
        
        return False
    
    async def get_skill_gaps(
        self,
        user_id: str,
        target_role: str
    ) -> List[str]:
        """
        Analyze skill gaps for a target role.
        
        Args:
            user_id: User identifier
            target_role: Target job role
        
        Returns:
            List of missing skills
        """
        profile = await self.read_user_profile(user_id)
        current_skills = {s['name'].lower() for s in profile['skills']}
        
        # Role-specific skill requirements (2025 market)
        role_requirements = {
            "software engineer": [
                "data structures", "algorithms", "system design",
                "git", "testing", "ci/cd", "cloud platforms"
            ],
            "frontend developer": [
                "react", "typescript", "html/css", "responsive design",
                "state management", "testing", "performance optimization"
            ],
            "backend developer": [
                "rest api", "databases", "authentication", "caching",
                "microservices", "docker", "kubernetes"
            ],
            "fullstack developer": [
                "react", "node.js", "databases", "rest api",
                "docker", "ci/cd", "system design"
            ],
            "data scientist": [
                "python", "pandas", "scikit-learn", "sql",
                "statistics", "ml algorithms", "data visualization"
            ],
            "ml engineer": [
                "python", "tensorflow/pytorch", "mlops", "docker",
                "model deployment", "distributed training", "monitoring"
            ],
            "devops engineer": [
                "kubernetes", "docker", "ci/cd", "infrastructure as code",
                "monitoring", "cloud platforms", "scripting"
            ]
        }
        
        required = role_requirements.get(target_role.lower(), [])
        gaps = [skill for skill in required if skill not in current_skills]
        
        return gaps
    
    async def analyze_market_trends(
        self,
        role: str,
        location: str = "Remote"
    ) -> Dict[str, Any]:
        """
        Analyze current job market trends for a role (mock/simplified).
        
        Args:
            role: Job role to analyze
            location: Job location
        
        Returns:
            Market analysis data
        """
        # Mock market data - in production, integrate with real APIs
        return {
            "role": role,
            "demand_level": "high",
            "avg_salary_range": "$80k - $150k",
            "top_skills_2025": [
                "AI/ML integration",
                "Cloud platforms (AWS/Azure)",
                "System design",
                "Performance optimization"
            ],
            "trending_technologies": [
                "LangChain/LangGraph",
                "Vector databases",
                "Real-time systems"
            ],
            "advice": f"Strong demand for {role} roles. Focus on hands-on projects and system design."
        }
    
    async def generate_project_ideas(
        self,
        skills_to_learn: List[str],
        difficulty: str = "intermediate"
    ) -> List[Dict[str, Any]]:
        """
        Generate project ideas to learn specific skills.
        
        Args:
            skills_to_learn: Target skills
            difficulty: Project difficulty level
        
        Returns:
            List of project suggestions
        """
        prompt = f"""Generate 3 practical project ideas to learn these skills: {', '.join(skills_to_learn)}
        
        Difficulty: {difficulty}
        
        For each project, provide:
        - Name
        - Description (2-3 sentences)
        - Key skills practiced
        - Estimated hours
        
        Format as JSON array."""
        
        response = await self.llm.ainvoke(prompt)
        
        try:
            # Parse LLM response
            projects = json.loads(response.content)
            return projects
        except:
            # Fallback projects
            return [
                {
                    "name": f"Practical {skills_to_learn[0]} Project",
                    "description": f"Build a real-world application using {skills_to_learn[0]}",
                    "skills": skills_to_learn[:3],
                    "estimated_hours": 20
                }
            ]
    
    async def find_learning_resources(
        self,
        skill: str
    ) -> List[Dict[str, str]]:
        """
        Find learning resources for a skill.
        
        Args:
            skill: Skill to learn
        
        Returns:
            List of resource recommendations
        """
        # Curated resources (expandable with APIs)
        resources_db = {
            "react": [
                {"type": "docs", "name": "React Official Docs", "url": "https://react.dev"},
                {"type": "course", "name": "Frontend Masters React", "url": "https://frontendmasters.com"},
                {"type": "practice", "name": "React Challenges", "url": "https://github.com/topics/react-challenges"}
            ],
            "python": [
                {"type": "docs", "name": "Python.org Tutorial", "url": "https://docs.python.org/3/tutorial/"},
                {"type": "practice", "name": "LeetCode Python", "url": "https://leetcode.com"},
                {"type": "book", "name": "Fluent Python", "url": "https://www.oreilly.com"}
            ],
            "system design": [
                {"type": "course", "name": "System Design Primer", "url": "https://github.com/donnemartin/system-design-primer"},
                {"type": "book", "name": "Designing Data-Intensive Applications", "url": "https://dataintensive.net"},
                {"type": "practice", "name": "System Design Interview", "url": "https://www.designgurus.io"}
            ]
        }
        
        return resources_db.get(skill.lower(), [
            {"type": "search", "name": f"Search '{skill} tutorial'", "url": f"https://www.google.com/search?q={skill}+tutorial"}
        ])
    
    async def get_recent_applications(
        self,
        user_id: str,
        limit: int = 5
    ) -> List[Dict[str, Any]]:
        """Get recent job applications."""
        apps = self.db.query(Application).filter(
            Application.user_id == user_id
        ).order_by(Application.applied_date.desc()).limit(limit).all()
        
        return [
            {
                "company": app.company,
                "position": app.position,
                "status": app.status,
                "applied_date": app.applied_date.isoformat(),
                "feedback": app.feedback
            }
            for app in apps
        ]


def get_tools(db: Session) -> CareerMentorTools:
    """Factory function to create tools instance."""
    return CareerMentorTools(db)
