import React, { useState, useRef, useEffect, memo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader, Trash2 } from 'lucide-react';

// Custom hook for auto-scrolling
const useAutoScroll = (dependency) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [dependency]);

    return scrollRef;
};

// Memoized message component to prevent unnecessary re-renders
const MessageItem = memo(({ message }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
        <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} max-w-3/4`}>
            {/* Fixed size for avatar to prevent shrinking */}
            <div className={`flex-shrink-0 flex items-center justify-center rounded-full w-8 h-8 mx-2 ${message.sender === 'user' ? 'bg-teal-500' : 'bg-teal-600'
                }`}>
                {message.sender === 'user' ? <User size={16} color="white" /> : <Bot size={16} color="white" />}
            </div>

            <div className={`py-3 px-4 rounded-2xl ${message.sender === 'user'
                ? 'bg-teal-500 text-white rounded-tr-none shadow-md'
                : message.isError
                    ? 'bg-red-100 text-red-700 rounded-tl-none border border-red-300'
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-md'
                }`}>
                <p className="whitespace-pre-wrap">{message.text}</p>
            </div>
        </div>
    </motion.div>
));

const ChatAI = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useAutoScroll(messages);
    const inputRef = useRef(null);
    const messageListRef = useRef([]);

    useEffect(() => {
        // Focus on input when component mounts
        if (inputRef.current) inputRef.current.focus();

        // Add greeting message when chat first loads
        if (messages.length === 0) {
            setMessages([
                {
                    id: Date.now(),
                    text: "Hello! I'm your AI assistant. How can I help you today?",
                    sender: 'ai'
                }
            ]);
        }
    }, []);

    // Store messages in ref to prevent flicker
    useEffect(() => {
        messageListRef.current = messages;
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:8000/api/ai-chat",
                data: {
                    prompt: input
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const aiMessage = {
                id: Date.now() + 1,
                text: response.data.response || response.data,
                sender: 'ai'
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);

            const errorMessage = {
                id: Date.now() + 1,
                text: "Sorry, I couldn't process your request. Please try again.",
                sender: 'ai',
                isError: true
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const clearChat = () => {
        setMessages([
            {
                id: Date.now(),
                text: "Chat cleared. How can I help you today?",
                sender: 'ai'
            }
        ]);
    };

    // Handle input changes with debouncing to reduce flickering
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
    };

    // Auto-resize textarea as user types
    const autoResizeTextarea = () => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
        }
    };

    useEffect(() => {
        autoResizeTextarea();
    }, [input]);

    return (
        <div className="flex flex-col h-full bg-gray-50 pt-4 pb-0">
            {/* Chat messages container with clear chat button */}
            <div className="relative flex-1 overflow-hidden mb-16"> {/* Added margin at bottom for fixed chat bar */}
                <div className="absolute top-2 right-2 z-10">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearChat}
                        className="p-2 rounded-full bg-white text-gray-500 hover:bg-gray-100 shadow-md"
                        title="Clear chat"
                    >
                        <Trash2 size={20} />
                    </motion.button>
                </div>

                <div
                    ref={scrollRef}
                    className="h-full px-6 py-2 pb-6 overflow-y-auto"
                >
                    <AnimatePresence>
                        {messages.map(message => (
                            <MessageItem key={message.id} message={message} />
                        ))}

                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start mb-4"
                            >
                                <div className="flex flex-row max-w-3/4">
                                    <div className="flex-shrink-0 flex items-center justify-center rounded-full w-8 h-8 mx-2 bg-teal-600">
                                        <Bot size={16} color="white" />
                                    </div>
                                    <div className="py-3 px-6 rounded-2xl bg-white shadow-md">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        >
                                            <Loader size={20} className="text-teal-500" />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Fixed Input area at bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-md z-10">
                <div className="max-w-4xl mx-auto flex items-end gap-2">
                    <motion.div
                        className="flex-1 bg-gray-50 rounded-full px-5 py-3 focus-within:ring-2 focus-within:ring-teal-400 focus-within:ring-opacity-50 border border-gray-100 shadow-sm"
                        whileTap={{ scale: 0.995 }}
                    >
                        <textarea
                            ref={inputRef}
                            className="w-full bg-transparent outline-none resize-none text-gray-800 min-h-8"
                            placeholder="Type your message..."
                            rows="1"
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            style={{ overflow: 'hidden' }}
                        />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading || !input.trim()}
                        onClick={handleSendMessage}
                        className={`p-4 rounded-full ${isLoading || !input.trim()
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-500 text-white shadow-lg hover:bg-teal-600'
                            }`}
                    >
                        <Send size={20} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default ChatAI;
