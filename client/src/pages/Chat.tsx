import React, { useState } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const Chat: React.FC = () => {
    const { darkMode } = useThemeContext();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I\'m Educat-AI, your personal career mentor. How can I help you today?',
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'I\'m here to help you with your career path, job recommendations, and learning resources. What specific area would you like to explore?',
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className={`h-screen flex flex-col ${darkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
            {/* Glassmorphic Header */}
            <div className={`sticky top-0 z-50 border-b backdrop-blur-xl ${darkMode
                ? 'bg-zinc-950/70 border-zinc-800/50'
                : 'bg-white/70 border-zinc-200/50'
                }`}>
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/profile"
                            className={`p-2 rounded-xl transition-all duration-200 ${darkMode
                                ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-white'
                                : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                                    Educat<span className="text-indigo-500">AI</span>
                                </h1>
                                <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Your Career Mentor</p>
                            </div>
                        </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${darkMode
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        }`}>
                        ● Online
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto px-6 py-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {messages.map((message, index) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 animate-fade-in-up ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                    }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Avatar */}
                                {message.sender === 'ai' && (
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-indigo-500/20">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div className={`flex-1 max-w-[75%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                                    <div className={`group relative px-5 py-3.5 rounded-2xl transition-all duration-200 ${message.sender === 'user'
                                        ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/25'
                                        : darkMode
                                            ? 'bg-zinc-900/80 border border-zinc-800/50 text-zinc-100 backdrop-blur-sm'
                                            : 'bg-white border border-zinc-200/50 text-zinc-900 shadow-sm'
                                        }`}>
                                        <p className="text-[15px] leading-relaxed">{message.text}</p>
                                    </div>
                                    <span className={`text-xs mt-1.5 px-1 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'
                                        }`}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex gap-3 animate-fade-in-up">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-indigo-500/20">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div className={`px-5 py-3.5 rounded-2xl ${darkMode
                                    ? 'bg-zinc-900/80 border border-zinc-800/50'
                                    : 'bg-white border border-zinc-200/50 shadow-sm'
                                    }`}>
                                    <div className="flex gap-1.5">
                                        <div className={`w-2.5 h-2.5 rounded-full animate-bounce ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'
                                            }`} style={{ animationDelay: '0ms' }}></div>
                                        <div className={`w-2.5 h-2.5 rounded-full animate-bounce ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'
                                            }`} style={{ animationDelay: '150ms' }}></div>
                                        <div className={`w-2.5 h-2.5 rounded-full animate-bounce ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'
                                            }`} style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className={`border-t backdrop-blur-xl ${darkMode
                    ? 'bg-zinc-950/70 border-zinc-800/50'
                    : 'bg-white/70 border-zinc-200/50'
                    }`}>
                    <div className="max-w-4xl mx-auto px-6 py-4">
                        <div className={`flex items-end gap-3 p-3 rounded-2xl border transition-all duration-200 ${darkMode
                            ? 'bg-zinc-900/50 border-zinc-800 focus-within:border-zinc-700'
                            : 'bg-white border-zinc-200 focus-within:border-zinc-300 shadow-sm'
                            }`}>
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className={`flex-1 resize-none outline-none bg-transparent text-[15px] ${darkMode
                                    ? 'text-white placeholder-zinc-500'
                                    : 'text-zinc-900 placeholder-zinc-400'
                                    }`}
                                rows={1}
                                style={{ minHeight: '28px', maxHeight: '120px' }}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim()}
                                className={`flex-shrink-0 p-3 rounded-xl font-semibold transition-all duration-200 ${inputValue.trim()
                                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5'
                                    : darkMode
                                        ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                        : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                        <p className={`text-xs text-center mt-2 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'
                            }`}>
                            Press Enter to send • Shift + Enter for new line
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
