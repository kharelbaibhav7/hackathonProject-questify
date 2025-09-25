import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, NotebookPen, Heart, Moon, Sun, Trophy, Star, AirVent } from 'lucide-react';

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

// DailyQuest Component
export default function DailyQuest() {
    const navigate = useNavigate();
    const [userLevel, setUserLevel] = useState(1);
    const [userExp, setUserExp] = useState(68);

    let handleCheckpoints = () => {
        navigate("/checkpoints");
    }

    const handleBeginQuests = () => {
        navigate('/breathing-exercise');
    };

    // Single completion state variable that affects all quests
    const [completion, setCompletion] = useState(false);

    const quests = [
        {
            id: 'breathing',
            title: 'Breathing Practice',
            icon: AirVent,
            path: '/breathing-exercise',
            points: 35,
            description: 'Plan your day ahead'
        },
        {
            id: 'reading',
            title: 'Reading Quest',
            icon: BookOpen,
            path: '/reading',
            points: 50,
            description: 'Read for 20 minutes today'
        },
        {
            id: 'journal',
            title: 'Journal Adventure',
            icon: NotebookPen,
            path: '/journal',
            points: 30,
            description: 'Write your thoughts for the day'
        },
        {
            id: 'gratitude',
            title: 'Gratitude Mission',
            icon: Heart,
            path: '/gratitude',
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


                <div className="flex justify-center">
                    <button
                        onClick={handleCheckpoints}
                        className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition"
                    >
                        View my checkpoints
                    </button>
                </div>


                <div className="flex items-center justify-between">
                    <div className="text-sm text-teal-700 font-medium">Experience</div>
                    <div className="text-sm text-teal-700 font-medium">{userExp}/100 XP</div>
                </div>
                <ProgressBar value={userExp} />

                {/* Toggle button for demonstration purposes */}
                <div className="flex justify-center">
                    <button
                        onClick={handleBeginQuests}
                        className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition"
                    >
                        {completion ? "Reset Quests" : "Complete daily quests"}
                    </button>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {quests.map((quest) => (
                        <motion.div key={quest.id} variants={itemVariants}>
                            <QuestCard
                                onClick={() => navigate(quest.path)}
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
                </div>
            </motion.div>


        </div>
    );
}

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BookOpen, NotebookPen, Heart, Sun, Moon } from 'lucide-react';
// import { motion } from 'framer-motion';

// export default function DailyQuestPath() {
//     const navigate = useNavigate();

//     const quests = [
//         {
//             id: 'breathing',
//             title: 'Breathing',
//             icon: BookOpen,
//             path: '/ breathing',
//             color: 'from-green-400 to-green-600',
//             description: 'Just improve stuttering by breathing'
//         },
//         {
//             id: 'reading',
//             title: 'Reading',
//             icon: BookOpen,
//             path: '/reading-exercise',
//             color: 'from-blue-400 to-blue-600',
//             description: 'Feed your mind with daily reading'
//         },
//         {
//             id: 'journal',
//             title: 'Journal',
//             icon: NotebookPen,
//             path: '/journal',
//             color: 'from-purple-400 to-purple-600',
//             description: 'Document your thoughts and ideas'
//         },
//         {
//             id: 'gratitude',
//             title: 'Gratitude',
//             icon: Heart,
//             path: '/gratitude',
//             color: 'from-pink-400 to-pink-600',
//             description: `Express thanks for life's gifts`
//         },
//         {
//             id: 'meditation',
//             title: 'Meditation',
//             icon: Moon,
//             path: '/meditation',
//             color: 'from-indigo-400 to-indigo-600',
//             description: 'Find your inner peace'
//         },
//         // {
//         //     id: 'tomorrow',
//         //     title: 'My Tomorrow',
//         //     icon: Sun,
//         //     path: '/my-tomorrow',
//         //     color: 'from-amber-400 to-amber-600',
//         //     description: 'Plan for a successful tomorrow'
//         // }
//     ];

//     // QuestNode component that renders each quest point
//     const QuestNode = ({ quest, index }) => {
//         const containerVariants = {
//             hidden: { opacity: 0, y: 20 },
//             visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
//         };

//         const circleVariants = {
//             initial: { scale: 1 },
//             hover: { scale: 1.1, boxShadow: '0 0 15px rgba(255,255,255,0.3)' },
//             tap: { scale: 0.95 }
//         };

//         return (
//             <motion.div
//                 className="relative"
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 key={quest.id}
//             >
//                 {/* Connection Line to next quest */}
//                 {index < quests.length - 1 && (
//                     <div className="absolute left-1/2 top-24 w-1 h-16 bg-gradient-to-b from-gray-300 to-gray-400 transform -translate-x-1/2 z-0 opacity-60"></div>
//                 )}

//                 <div className="flex flex-col items-center mb-16 relative z-10">
//                     <motion.div
//                         className={`w-20 h-20 rounded-full bg-gradient-to-br ${quest.color} p-1 shadow-lg flex items-center justify-center cursor-pointer`}
//                         variants={circleVariants}
//                         initial="initial"
//                         whileHover="hover"
//                         whileTap="tap"
//                         onClick={() => navigate(quest.path)}
//                     >
//                         <div className="bg-white bg-opacity-20 w-full h-full rounded-full flex items-center justify-center">
//                             <quest.icon size={28} className="text-white" />
//                         </div>
//                     </motion.div>

//                     <motion.div
//                         className="mt-3 text-center"
//                         whileHover={{ y: -2 }}
//                     >
//                         <h3 className="text-xl font-bold text-white">{quest.title}</h3>
//                         <p className="text-sm text-gray-300 mt-1 max-w-xs">{quest.description}</p>
//                     </motion.div>
//                 </div>
//             </motion.div>
//         );
//     };

//     // Particle animation for background
//     const Particles = () => {
//         return (
//             <div className="absolute inset-0 overflow-hidden z-0">
//                 {[...Array(15)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute rounded-full bg-white bg-opacity-10"
//                         initial={{
//                             x: Math.random() * 100 + "%",
//                             y: Math.random() * 100 + "%",
//                             scale: Math.random() * 0.5 + 0.5
//                         }}
//                         animate={{
//                             y: [
//                                 Math.random() * 100 + "%",
//                                 Math.random() * 100 + "%",
//                                 Math.random() * 100 + "%"
//                             ]
//                         }}
//                         transition={{
//                             duration: Math.random() * 10 + 20,
//                             repeat: Infinity,
//                             repeatType: "reverse"
//                         }}
//                         style={{
//                             width: Math.random() * 6 + 4 + "px",
//                             height: Math.random() * 6 + 4 + "px",
//                             opacity: Math.random() * 0.5 + 0.3
//                         }}
//                     />
//                 ))}
//             </div>
//         );
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
//             <Particles />

//             <div className="container mx-auto px-4 py-16 relative z-10">
//                 <div className="text-center mb-12">
//                     <h1 className="text-4xl font-bold text-white mb-3">Daily Quest</h1>
//                     <p className="text-gray-300 max-w-md mx-auto">
//                         Complete these activities daily to build healthy habits and improve your wellbeing
//                     </p>
//                 </div>

//                 <div className="max-w-lg mx-auto">
//                     {quests.map((quest, index) => (
//                         <QuestNode key={quest.id} quest={quest} index={index} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }