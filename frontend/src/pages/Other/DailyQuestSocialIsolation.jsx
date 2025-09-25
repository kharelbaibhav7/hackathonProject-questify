import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, NotebookPen, Heart, Moon, Sun, Trophy, Star } from 'lucide-react';

// Quest Card Component with progress and points
export function QuestCard({ children, onClick, completed, points }) {
    return (
        <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 128, 128, 0.4)" }}
            whileTap={{ scale: 0.97 }}
            className={`relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transition border-2 ${completed ? 'bg-teal-50 border-teal-500' : 'bg-white border-teal-200'
                }`}
            onClick={onClick}
        >
            {completed && (
                <div className="absolute top-0 right-0">
                    <div className="bg-teal-500 text-white p-2 rounded-bl-lg">
                        <Trophy size={16} />
                    </div>
                </div>
            )}
            <div className="p-5">
                {children}
                <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <Star className="text-yellow-400 mr-1" size={16} />
                        <span className="text-sm font-medium text-teal-700">{points} points</span>
                    </div>
                    {!completed && (
                        <span className="text-xs text-teal-600 font-medium px-2 py-1 bg-teal-100 rounded-full">
                            In Progress
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// CardContent Component
export function QuestContent({ title, icon: Icon, description }) {
    return (
        <div>
            <div className="flex items-center space-x-3 mb-2">
                <div className="bg-teal-100 p-3 rounded-full">
                    <Icon size={24} className="text-teal-600" />
                </div>
                <h2 className="text-xl font-bold text-teal-800">{title}</h2>
            </div>
            <p className="text-teal-600 text-sm ml-12">{description}</p>
        </div>
    );
}

// Progress Bar Component
function ProgressBar({ value }) {
    return (
        <div className="w-full bg-teal-100 rounded-full h-4 mb-6">
            <div
                className="bg-gradient-to-r from-teal-400 to-teal-600 h-4 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${value}%` }}
            >
                <span className="text-white text-xs font-bold">{value}%</span>
            </div>
        </div>
    );
}



// DailyQuestSocialIsolation Component
export default function DailyQuestSocialIsolation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userLevel, setUserLevel] = useState(1);
    const [userExp, setUserExp] = useState(0); // Start at 0%

    // Check if returning from exercises with completion flag
    const [completion, setCompletion] = useState(false);


    let handleCheckpoints = () => {
        navigate("/checkpoints");
    }
    // Check for any state passed during navigation
    useEffect(() => {
        // If we have state with a completion flag set to true
        if (location.state && location.state.questsCompleted) {
            setCompletion(true);
            setUserExp(100); // Set progress to 100%
        }
    }, [location]);

    const quests = [

        {
            id: 'journal',
            title: 'Journal Adventure',
            icon: NotebookPen,
            path: '/add-journal',
            points: 30,
            description: 'Write your thoughts for the day'
        },
        {
            id: 'gratitude',
            title: 'Gratitude Mission',
            icon: Heart,
            path: '/add-gratitude',
            points: 25,
            description: 'List 3 things you are grateful for'
        },
        {
            id: 'meditation',
            title: 'Meditation Journey',
            icon: Moon,
            path: '/meditation',
            points: 40,
            description: 'Meditate for 10 minutes'
        },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    // Handle the begin quests button click
    const handleBeginQuests = () => {
        navigate('/add-journal');
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
            >
                <div className="flex justify-between items-center border-b border-teal-100 pb-4">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-600 to-teal-400 text-transparent bg-clip-text">
                        Daily Quest Journal
                    </h1>
                    <div className="flex items-center space-x-2">
                        <div className="bg-teal-600 text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center">
                            {userLevel}
                        </div>
                        <div className="text-sm text-teal-700 font-medium">Level</div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm text-teal-700 font-medium">Experience</div>
                    <div className="text-sm text-teal-700 font-medium">{userExp}/100 XP</div>
                </div>
                <ProgressBar value={userExp} />

                {/* Only show the button if quests are not completed */}
                {!completion && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleBeginQuests}
                            className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition"
                        >
                            Complete daily quests
                        </button>
                    </div>
                )}

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {quests.map((quest) => (
                        <motion.div key={quest.id} variants={itemVariants}>
                            <QuestCard
                                onClick={() => completion ? null : navigate(quest.path)}
                                completed={completion} // Using the single completion state
                                points={quest.points}
                            >
                                <QuestContent
                                    title={quest.title}
                                    icon={quest.icon}
                                    description={quest.description}
                                />
                            </QuestCard>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-8 p-4 bg-teal-50 rounded-xl border border-teal-200">
                    <div className="flex items-center space-x-2">
                        <Trophy className="text-teal-600" />
                        <h3 className="font-semibold text-teal-800">Daily Bonus</h3>
                    </div>
                    <p className="text-teal-600 text-sm mt-2">
                        Complete all quests today to earn 100 bonus points and unlock a special achievement!
                    </p>
                    {completion && (
                        <div className="mt-2 text-teal-700 font-medium text-center">
                            🎉 Congratulations! You've completed all quests today! 🎉
                        </div>
                    )}



                    <div className="flex justify-center">
                        <button
                            onClick={handleCheckpoints}
                            className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition"
                        >
                            View my checkpoints
                        </button>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}

