import React from 'react';

interface Course {
    id: number;
    title: string;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    tags: string[];
    image: string;
    progress?: number;
}

const mockCourses: Course[] = [
    {
        id: 1,
        title: "Full Stack Web Development",
        description: "Master modern web technologies including React, Node.js, and TypeScript.",
        level: "Intermediate",
        duration: "12 weeks",
        tags: ["Development", "Web"],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 2,
        title: "Data Science Fundamentals",
        description: "Learn how to analyze data, create visualizations, and build ML models.",
        level: "Beginner",
        duration: "8 weeks",
        tags: ["Data Science", "Analytics"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 3,
        title: "UI/UX Design Masterclass",
        description: "Design beautiful and functional user interfaces using Figma and design principles.",
        level: "Intermediate",
        duration: "10 weeks",
        tags: ["Design", "UI/UX"],
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 4,
        title: "Product Management 101",
        description: "Learn the lifecycle of a product from conception to launch.",
        level: "Beginner",
        duration: "6 weeks",
        tags: ["Product", "Management"],
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600"
    }
];

interface CourseExplorerProps {
    darkMode: boolean;
}

const CourseExplorer: React.FC<CourseExplorerProps> = ({ darkMode }) => {
    return (
        <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Explore Courses</h2>
                <div className="flex gap-2">
                    <select className={`px-4 py-2 rounded-lg text-sm border outline-none ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}>
                        <option>All Levels</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Reusing Course Cards with more horizontal space */}
                {[...mockCourses, ...mockCourses].map((course, i) => (
                    <div key={i} className={`flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                        <div className="h-48 overflow-hidden relative">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                                    {course.level}
                                </span>
                            </div>
                            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{course.title}</h3>
                            <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{course.description}</p>
                            <div className="mt-auto">
                                <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-lg shadow-indigo-500/20">
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseExplorer;
