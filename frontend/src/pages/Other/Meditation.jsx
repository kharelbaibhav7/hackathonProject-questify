import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Pause, Clock, ChevronRight, Volume2, VolumeX, X } from 'lucide-react';

const Meditation = () => {
    const navigate = useNavigate();
    const [duration, setDuration] = useState(5); // Default 5 minutes
    const [timeLeft, setTimeLeft] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    // Track actual meditation duration
    const [meditationDuration, setMeditationDuration] = useState(0);
    const [startTime, setStartTime] = useState(null);

    const audioRef = useRef(null);
    const timerRef = useRef(null);

    const meditationSteps = [
        "Find a comfortable seated position. Sit upright with your back straight.",
        "Close your eyes gently and relax your shoulders.",
        "Begin to notice your breath. Don't try to change it, just observe.",
        "Feel the sensation of breath entering and leaving your body.",
        "When your mind wanders, gently bring your attention back to your breath.",
        "Scan your body for any tension and allow it to melt away.",
        "Continue breathing deeply and staying present in this moment."
    ];

    const durationOptions = [
        { value: 1, label: "1 minute" },
        { value: 3, label: "3 minutes" },
        { value: 5, label: "5 minutes" },
        { value: 10, label: "10 minutes" },
        { value: 15, label: "15 minutes" },
        { value: 20, label: "20 minutes" },
    ];

    useEffect(() => {
        // Setup audio
        audioRef.current = new Audio('/meditation.mp3');
        audioRef.current.loop = true;

        // Cleanup on component unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // Handle mute/unmute
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const calculateMeditationDuration = () => {
        if (startTime) {
            const endTime = new Date();
            const durationInSeconds = Math.floor((endTime - startTime) / 1000);
            setMeditationDuration(durationInSeconds);
            return durationInSeconds;
        }
        return 0;
    };

    const startMeditation = () => {
        // Set time left in seconds
        const timeInSeconds = duration * 60;
        setTimeLeft(timeInSeconds);
        setIsActive(true);

        // Record start time
        setStartTime(new Date());

        // Start audio
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(error => {
                console.log("Audio playback failed:", error);
            });
        }

        // Step cycling
        setCurrentStep(0);

        // Start timer
        timerRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                // Cycle through meditation steps
                if (prevTime % 30 === 0 && prevTime > 0) {
                    setCurrentStep(prev => (prev + 1) % meditationSteps.length);
                }

                // End meditation when time is up
                if (prevTime <= 1) {
                    endMeditation();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const endMeditation = () => {
        clearInterval(timerRef.current);
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setIsActive(false);
        setIsComplete(true);
        calculateMeditationDuration();
    };

    const pauseMeditation = () => {
        setIsActive(false);
        clearInterval(timerRef.current);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const resumeMeditation = () => {
        setIsActive(true);
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.log("Audio playback failed:", error);
            });
        }

        timerRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime % 30 === 0 && prevTime > 0) {
                    setCurrentStep(prev => (prev + 1) % meditationSteps.length);
                }
                if (prevTime <= 1) {
                    endMeditation();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const handleNext = async () => {
        await axios({
            method: 'post',
            url: `http://localhost:8000/api/users/update-score`,
            data: { score: 40 },
        })
        navigate('/daily-quest');
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8"
            >
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-teal-700 mb-2">Mindful Meditation</h1>
                    <p className="text-teal-600">Take a moment to center yourself</p>
                </div>

                {!isActive && !isComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-8"
                    >
                        <h2 className="text-lg font-medium text-teal-800 mb-3 flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-teal-600" />
                            Choose Duration
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                            {durationOptions.map(option => (
                                <motion.button
                                    key={option.value}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setDuration(option.value)}
                                    className={`py-3 px-4 rounded-lg text-center transition-all ${duration === option.value
                                        ? 'bg-teal-600 text-white shadow-md'
                                        : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                                        }`}
                                >
                                    {option.label}
                                </motion.button>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={startMeditation}
                            className="w-full py-4 px-6 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md flex items-center justify-center"
                        >
                            <Play className="w-5 h-5 mr-2" />
                            Begin Meditation
                        </motion.button>
                    </motion.div>
                )}

                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <div className="flex justify-center items-center mb-6">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.7, 1, 0.7]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut"
                                }}
                                className="w-40 h-40 rounded-full bg-teal-100 flex items-center justify-center"
                            >
                                <span className="text-4xl font-bold text-teal-800">
                                    {formatTime(timeLeft)}
                                </span>
                            </motion.div>
                        </div>

                        <div className="mb-8">
                            <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 mb-4">
                                <p className="text-teal-800 text-lg">{meditationSteps[currentStep]}</p>
                            </div>

                            <div className="w-full bg-teal-100 rounded-full h-2 mb-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(currentStep + 1) / meditationSteps.length * 100}%` }}
                                    className="h-2 rounded-full bg-teal-600"
                                ></motion.div>
                            </div>
                        </div>

                        <div className="flex space-x-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={isMuted ? () => setIsMuted(false) : () => setIsMuted(true)}
                                className="p-3 rounded-full bg-teal-100"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-6 h-6 text-teal-700" />
                                ) : (
                                    <Volume2 className="w-6 h-6 text-teal-700" />
                                )}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={isActive ? pauseMeditation : resumeMeditation}
                                className="p-3 rounded-full bg-teal-600 text-white"
                            >
                                {isActive ? (
                                    <Pause className="w-6 h-6" />
                                ) : (
                                    <Play className="w-6 h-6" />
                                )}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={endMeditation}
                                className="p-3 rounded-full bg-red-500 text-white"
                                title="End meditation"
                            >
                                <X className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <div className="mb-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="w-20 h-20 rounded-full bg-teal-100 mx-auto flex items-center justify-center mb-4"
                            >
                                <div className="w-12 h-12 text-teal-600 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </motion.div>

                            <h2 className="text-2xl font-bold text-teal-800 mb-2">Well Done!</h2>
                            <p className="text-teal-600 mb-2">You've completed your meditation session.</p>

                            <div className="flex justify-center space-x-4 mb-6">
                                <div className="bg-teal-50 px-4 py-3 rounded-lg">
                                    <p className="text-teal-800 text-sm">Planned Time</p>
                                    <p className="font-bold text-teal-700">{duration} minutes</p>
                                </div>

                                <div className="bg-teal-50 px-4 py-3 rounded-lg">
                                    <p className="text-teal-800 text-sm">Actual Time</p>
                                    <p className="font-bold text-teal-700">{Math.floor(meditationDuration / 60)} min {meditationDuration % 60} sec</p>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleNext}
                                className="w-full py-4 px-6 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md flex items-center justify-center"
                            >
                                Complete
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}

            </motion.div>
        </div>
    );
};

export default Meditation;




// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Play, Pause, Clock, ChevronRight, Volume2, VolumeX } from 'lucide-react';

// const Meditation = () => {
//     const navigate = useNavigate();
//     const [duration, setDuration] = useState(5); // Default 5 minutes
//     const [timeLeft, setTimeLeft] = useState(null);
//     const [isActive, setIsActive] = useState(false);
//     const [isComplete, setIsComplete] = useState(false);
//     const [currentStep, setCurrentStep] = useState(0);
//     const [isMuted, setIsMuted] = useState(false);
//     const audioRef = useRef(null);
//     const timerRef = useRef(null);

//     const meditationSteps = [
//         "Find a comfortable seated position. Sit upright with your back straight.",
//         "Close your eyes gently and relax your shoulders.",
//         "Begin to notice your breath. Don't try to change it, just observe.",
//         "Feel the sensation of breath entering and leaving your body.",
//         "When your mind wanders, gently bring your attention back to your breath.",
//         "Scan your body for any tension and allow it to melt away.",
//         "Continue breathing deeply and staying present in this moment."
//     ];

//     const durationOptions = [
//         { value: 1, label: "1 minute" },
//         { value: 3, label: "3 minutes" },
//         { value: 5, label: "5 minutes" },
//         { value: 10, label: "10 minutes" },
//         { value: 15, label: "15 minutes" },
//         { value: 20, label: "20 minutes" },
//     ];

//     useEffect(() => {
//         // Setup audio
//         audioRef.current = new Audio('/meditation.mp3');
//         audioRef.current.loop = true;

//         // Cleanup on component unmount
//         return () => {
//             if (audioRef.current) {
//                 audioRef.current.pause();
//                 audioRef.current = null;
//             }
//             if (timerRef.current) {
//                 clearInterval(timerRef.current);
//             }
//         };
//     }, []);

//     useEffect(() => {
//         // Handle mute/unmute
//         if (audioRef.current) {
//             audioRef.current.muted = isMuted;
//         }
//     }, [isMuted]);

//     const startMeditation = () => {
//         // Set time left in seconds
//         const timeInSeconds = duration * 60;
//         setTimeLeft(timeInSeconds);
//         setIsActive(true);

//         // Start audio
//         if (audioRef.current) {
//             audioRef.current.currentTime = 0;
//             audioRef.current.play().catch(error => {
//                 console.log("Audio playback failed:", error);
//             });
//         }

//         // Step cycling
//         setCurrentStep(0);

//         // Start timer
//         timerRef.current = setInterval(() => {
//             setTimeLeft(prevTime => {
//                 // Cycle through meditation steps
//                 if (prevTime % 30 === 0 && prevTime > 0) {
//                     setCurrentStep(prev => (prev + 1) % meditationSteps.length);
//                 }

//                 // End meditation when time is up
//                 if (prevTime <= 1) {
//                     clearInterval(timerRef.current);
//                     if (audioRef.current) {
//                         audioRef.current.pause();
//                     }
//                     setIsActive(false);
//                     setIsComplete(true);
//                     return 0;
//                 }
//                 return prevTime - 1;
//             });
//         }, 1000);
//     };

//     const pauseMeditation = () => {
//         setIsActive(false);
//         clearInterval(timerRef.current);
//         if (audioRef.current) {
//             audioRef.current.pause();
//         }
//     };

//     const resumeMeditation = () => {
//         setIsActive(true);
//         if (audioRef.current) {
//             audioRef.current.play().catch(error => {
//                 console.log("Audio playback failed:", error);
//             });
//         }

//         timerRef.current = setInterval(() => {
//             setTimeLeft(prevTime => {
//                 if (prevTime % 30 === 0 && prevTime > 0) {
//                     setCurrentStep(prev => (prev + 1) % meditationSteps.length);
//                 }
//                 if (prevTime <= 1) {
//                     clearInterval(timerRef.current);
//                     if (audioRef.current) {
//                         audioRef.current.pause();
//                     }
//                     setIsActive(false);
//                     setIsComplete(true);
//                     return 0;
//                 }
//                 return prevTime - 1;
//             });
//         }, 1000);
//     };

//     const handleNext = () => {
//         navigate('/plan-my-tomorrow');
//     };

//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 p-4">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8"
//             >
//                 <div className="text-center mb-6">
//                     <h1 className="text-3xl font-bold text-teal-700 mb-2">Mindful Meditation</h1>
//                     <p className="text-teal-600">Take a moment to center yourself</p>
//                 </div>

//                 {!isActive && !isComplete && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="mb-8"
//                     >
//                         <h2 className="text-lg font-medium text-teal-800 mb-3 flex items-center">
//                             <Clock className="w-5 h-5 mr-2 text-teal-600" />
//                             Choose Duration
//                         </h2>

//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
//                             {durationOptions.map(option => (
//                                 <motion.button
//                                     key={option.value}
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     onClick={() => setDuration(option.value)}
//                                     className={`py-3 px-4 rounded-lg text-center transition-all ${duration === option.value
//                                             ? 'bg-teal-600 text-white shadow-md'
//                                             : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
//                                         }`}
//                                 >
//                                     {option.label}
//                                 </motion.button>
//                             ))}
//                         </div>

//                         <motion.button
//                             whileHover={{ scale: 1.03 }}
//                             whileTap={{ scale: 0.97 }}
//                             onClick={startMeditation}
//                             className="w-full py-4 px-6 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md flex items-center justify-center"
//                         >
//                             <Play className="w-5 h-5 mr-2" />
//                             Begin Meditation
//                         </motion.button>
//                     </motion.div>
//                 )}

//                 {isActive && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="text-center"
//                     >
//                         <div className="flex justify-center items-center mb-6">
//                             <motion.div
//                                 animate={{
//                                     scale: [1, 1.1, 1],
//                                     opacity: [0.7, 1, 0.7]
//                                 }}
//                                 transition={{
//                                     repeat: Infinity,
//                                     duration: 4,
//                                     ease: "easeInOut"
//                                 }}
//                                 className="w-40 h-40 rounded-full bg-teal-100 flex items-center justify-center"
//                             >
//                                 <span className="text-4xl font-bold text-teal-800">
//                                     {formatTime(timeLeft)}
//                                 </span>
//                             </motion.div>
//                         </div>

//                         <div className="mb-8">
//                             <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 mb-4">
//                                 <p className="text-teal-800 text-lg">{meditationSteps[currentStep]}</p>
//                             </div>

//                             <div className="w-full bg-teal-100 rounded-full h-2 mb-2">
//                                 <motion.div
//                                     initial={{ width: 0 }}
//                                     animate={{ width: `${(currentStep + 1) / meditationSteps.length * 100}%` }}
//                                     className="h-2 rounded-full bg-teal-600"
//                                 ></motion.div>
//                             </div>
//                         </div>

//                         <div className="flex space-x-4 justify-center">
//                             <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={isMuted ? () => setIsMuted(false) : () => setIsMuted(true)}
//                                 className="p-3 rounded-full bg-teal-100"
//                             >
//                                 {isMuted ? (
//                                     <VolumeX className="w-6 h-6 text-teal-700" />
//                                 ) : (
//                                     <Volume2 className="w-6 h-6 text-teal-700" />
//                                 )}
//                             </motion.button>

//                             <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={isActive ? pauseMeditation : resumeMeditation}
//                                 className="p-3 rounded-full bg-teal-600 text-white"
//                             >
//                                 {isActive ? (
//                                     <Pause className="w-6 h-6" />
//                                 ) : (
//                                     <Play className="w-6 h-6" />
//                                 )}
//                             </motion.button>
//                         </div>
//                     </motion.div>
//                 )}

//                 {isComplete && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="text-center"
//                     >
//                         <div className="mb-6">
//                             <motion.div
//                                 initial={{ scale: 0 }}
//                                 animate={{ scale: 1 }}
//                                 transition={{ type: "spring", stiffness: 200, damping: 20 }}
//                                 className="w-20 h-20 rounded-full bg-teal-100 mx-auto flex items-center justify-center mb-4"
//                             >
//                                 <div className="w-12 h-12 text-teal-600 flex items-center justify-center">
//                                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//                                     </svg>
//                                 </div>
//                             </motion.div>

//                             <h2 className="text-2xl font-bold text-teal-800 mb-2">Well Done!</h2>
//                             <p className="text-teal-600 mb-8">You've completed your {duration} minute meditation session.</p>

//                             <motion.button
//                                 whileHover={{ scale: 1.03 }}
//                                 whileTap={{ scale: 0.97 }}
//                                 onClick={handleNext}
//                                 className="w-full py-4 px-6 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md flex items-center justify-center"
//                             >
//                                 Plan My Tomorrow
//                                 <ChevronRight className="w-5 h-5 ml-2" />
//                             </motion.button>
//                         </div>
//                     </motion.div>
//                 )}

//             </motion.div>
//         </div>
//     );
// };

// export default Meditation;
