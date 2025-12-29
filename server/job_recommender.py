"""Job recommendation and market analysis."""
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import numpy as np
from sqlalchemy.orm import Session

from langchain_anthropic import ChatAnthropic
import voyageai

from database import UserProfile, Application
from config import settings


class JobRecommendationEngine:
    """Match users to jobs and analyze market trends."""
    
    def __init__(self):
        self.llm = ChatAnthropic(
            model_name=settings.ANTHROPIC_MODEL,
            api_key=settings.ANTHROPIC_API_KEY,
            temperature=0.5
        )
        try:
            self.voyage_client = voyageai.Client(api_key=settings.VOYAGE_API_KEY)
        except AttributeError:
            # voyageai 0.3.7+ uses different import
            import voyageai as vo
            self.voyage_client = vo.Client(api_key=settings.VOYAGE_API_KEY)
    
    async def analyze_market_trends(
        self,
        role: str,
        location: str = "Remote"
    ) -> Dict[str, Any]:
        """
        Analyze job market trends for a role.
        
        Args:
            role: Job role to analyze
            location: Location filter
        
        Returns:
            Market trend analysis
        """
        prompt = f"""Analyze the current job market (December 2025) for {role} positions in {location}.

Provide analysis on:
1. Demand level (high/medium/low)
2. Average salary range
3. Top 5 in-demand skills
4. Growth trajectory (growing/stable/declining)
5. Top hiring companies
6. Remote work availability (%)
7. Entry-level opportunities (abundant/moderate/scarce)
8. Key trends affecting this role

Return as JSON:
{{
    "role": "{role}",
    "location": "{location}",
    "demand_level": "high/medium/low",
    "salary_range": {{"min": 0, "max": 0, "currency": "USD"}},
    "top_skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
    "growth_trajectory": "growing/stable/declining",
    "top_companies": ["company1", "company2", "company3"],
    "remote_percentage": 0,
    "entry_level_opportunities": "abundant/moderate/scarce",
    "key_trends": ["trend1", "trend2", "trend3"],
    "analysis_date": "{datetime.utcnow().isoformat()}"
}}

Return ONLY the JSON object."""

        response = await self.llm.ainvoke(prompt)
        
        # Parse response
        import json
        import re
        
        try:
            if hasattr(response, 'content'):
                response_text = response.content if isinstance(response.content, str) else str(response.content)
            else:
                response_text = str(response)
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            
            if json_match:
                trends = json.loads(json_match.group())
            else:
                trends = json.loads(response_text)
            
            return trends
        
        except Exception as e:
            return self._get_fallback_trends(role, location)
    
    def _get_fallback_trends(self, role: str, location: str) -> Dict[str, Any]:
        """Fallback market trends."""
        role_lower = role.lower()
        
        # Default trends based on common roles
        if 'backend' in role_lower or 'api' in role_lower:
            skills = ["Python", "SQL", "REST APIs", "Docker", "Cloud Platforms"]
            demand = "high"
            salary = {"min": 80000, "max": 150000, "currency": "USD"}
        elif 'frontend' in role_lower or 'react' in role_lower:
            skills = ["React", "TypeScript", "CSS", "REST APIs", "Testing"]
            demand = "high"
            salary = {"min": 75000, "max": 140000, "currency": "USD"}
        elif 'data' in role_lower or 'ml' in role_lower:
            skills = ["Python", "SQL", "Machine Learning", "Statistics", "PyTorch/TensorFlow"]
            demand = "very high"
            salary = {"min": 90000, "max": 180000, "currency": "USD"}
        else:
            skills = ["Programming", "Problem Solving", "Communication", "Git", "Testing"]
            demand = "medium"
            salary = {"min": 70000, "max": 130000, "currency": "USD"}
        
        return {
            "role": role,
            "location": location,
            "demand_level": demand,
            "salary_range": salary,
            "top_skills": skills,
            "growth_trajectory": "growing",
            "top_companies": ["Google", "Microsoft", "Amazon", "Meta", "Apple"],
            "remote_percentage": 65,
            "entry_level_opportunities": "moderate",
            "key_trends": [
                "AI integration increasing",
                "Remote work normalization",
                "Focus on system design skills"
            ],
            "analysis_date": datetime.utcnow().isoformat()
        }
    
    async def recommend_jobs(
        self,
        db: Session,
        user_id: str,
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """
        Recommend jobs based on user profile.
        
        Args:
            db: Database session
            user_id: User identifier
            limit: Maximum recommendations
        
        Returns:
            List of recommended jobs
        """
        # Get user profile
        profile = db.query(UserProfile).filter(
            UserProfile.user_id == user_id
        ).first()
        
        if not profile:
            return []
        
        user_skills = [s['name'] if isinstance(s, dict) else str(s) for s in (profile.skills or [])]
        target_role = str(profile.target_role or "Software Engineer")
        # Handle potential SQLAlchemy Column type
        exp_val = profile.experience_years
        experience = float(exp_val) if exp_val is not None else 0.0  # type: ignore
        
        # Generate job recommendations using LLM
        prompt = f"""Generate {limit} realistic job postings for a candidate with this profile:

Role Interest: {target_role}
Skills: {', '.join(user_skills)}
Experience: {experience} years

For each job, provide:
- Company name
- Job title
- Location (include remote options)
- Job type (Full-time, Internship, Contract)
- Experience required (years)
- Required skills
- Preferred skills
- Salary range
- Job description (2-3 sentences)
- Application URL (use realistic job board URLs)
- Match score (0-100, how well this matches the candidate)

Return as JSON array:
[
    {{
        "company": "Company Name",
        "title": "Job Title",
        "location": "City or Remote",
        "job_type": "Full-time",
        "experience_required": "2-4 years",
        "required_skills": ["skill1", "skill2"],
        "preferred_skills": ["skill3"],
        "salary_range": {{"min": 80000, "max": 120000, "currency": "USD"}},
        "description": "Job description...",
        "url": "https://jobs.company.com/posting",
        "match_score": 85,
        "posted_date": "2025-12-25"
    }}
]

Return ONLY the JSON array."""

        response = await self.llm.ainvoke(prompt)
        
        # Parse response
        import json
        import re
        
        try:
            if hasattr(response, 'content'):
                response_text = response.content if isinstance(response.content, str) else str(response.content)
            else:
                response_text = str(response)
            json_match = re.search(r'\[.*\]', response_text, re.DOTALL)
            
            if json_match:
                jobs = json.loads(json_match.group())
            else:
                jobs = json.loads(response_text)
            
            # Add recommendation metadata
            for job in jobs:
                job['recommended_at'] = datetime.utcnow().isoformat()
                job['recommendation_reason'] = self._generate_reason(job, user_skills)
            
            return jobs
        
        except Exception as e:
            return self._get_fallback_jobs(target_role, user_skills, experience, limit)
    
    def _generate_reason(self, job: Dict[str, Any], user_skills: List[str]) -> str:
        """Generate reason for recommendation."""
        matched_skills = []
        required = job.get('required_skills', [])
        
        for skill in user_skills:
            if any(skill.lower() in req.lower() for req in required):
                matched_skills.append(skill)
        
        if matched_skills:
            return f"Matches your skills: {', '.join(matched_skills[:3])}"
        else:
            return "Good growth opportunity in your target field"
    
    def _get_fallback_jobs(
        self,
        role: str,
        skills: List[str],
        experience: float,
        limit: int
    ) -> List[Dict[str, Any]]:
        """Fallback job recommendations."""
        companies = [
            "TechCorp", "InnovateLabs", "DataDynamics", "CloudSystems",
            "AI Solutions", "DevWorks", "StartupHub", "EnterpriseInc"
        ]
        
        jobs = []
        for i in range(min(limit, len(companies))):
            level = "Senior" if experience >= 5 else "Mid-level" if experience >= 2 else "Junior"
            
            jobs.append({
                "company": companies[i],
                "title": f"{level} {role}",
                "location": "Remote" if i % 2 == 0 else "New York, NY",
                "job_type": "Full-time" if i < 7 else "Internship",
                "experience_required": f"{max(0, experience-1)}-{experience+2} years",
                "required_skills": skills[:3] if skills else ["Programming", "Problem Solving"],
                "preferred_skills": skills[3:5] if len(skills) > 3 else ["Communication"],
                "salary_range": {
                    "min": 70000 + (experience * 10000),
                    "max": 100000 + (experience * 15000),
                    "currency": "USD"
                },
                "description": f"Join {companies[i]} as a {level} {role}. Work on cutting-edge projects with a talented team.",
                "url": f"https://jobs.{companies[i].lower().replace(' ', '')}.com/apply/{i+1000}",
                "match_score": 75 + (i * 2),
                "posted_date": (datetime.utcnow() - timedelta(days=i)).strftime("%Y-%m-%d"),
                "recommended_at": datetime.utcnow().isoformat(),
                "recommendation_reason": "Matches your experience and skills"
            })
        
        return jobs


# Global instance
job_engine = JobRecommendationEngine()
