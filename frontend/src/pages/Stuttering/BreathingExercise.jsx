import React, { useState, useEffect, useRef } from "react";
import videoFile from "../../assets/1.mp4";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Pause,
    Clock,
    Info,
    ArrowRight,
    MoveRight,
    Wind,
} from "lucide-react";

const BreathingExercise = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [breathPhase, setBreathPhase] = useState(0);
    const [loopsCompleted, setLoopsCompleted] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5-minute timer
    const [showInstructions, setShowInstructions] = useState(false);
    const audioRef = useRef(null);
    const videoRef = useRef(null);
    const animationRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const totalCircles = 6;
    const baseRadius = 120;
    const breathingRate = 7; // Breathing rate in seconds

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const drawBreathingAnimation = (phase) => {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const normalizedPhase = phase < 0.5 ? phase * 2 : 2 - phase * 2;

            const maxAmplitude = 50;
            const amplitude = maxAmplitude * normalizedPhase;

            // Draw multiple circles arranged in a flower pattern
            for (let i = 0; i < totalCircles; i++) {
                const angle = (i / totalCircles) * Math.PI * 2;
                const offsetX = Math.cos(angle) * amplitude;
                const offsetY = Math.sin(angle) * amplitude;

                // Create radial gradient for each circle
                const gradient = ctx.createRadialGradient(
                    centerX + offsetX,
                    centerY + offsetY,
                    0,
                    centerX + offsetX,
                    centerY + offsetY,
                    baseRadius
                );

                // Enhanced teal-teal gradient
                gradient.addColorStop(0, "rgba(100, 210, 255, 0.9)");
                gradient.addColorStop(0.6, "rgba(65, 175, 220, 0.7)");
                gradient.addColorStop(1, "rgba(45, 150, 190, 0)");

                ctx.beginPath();
                ctx.arc(
                    centerX + offsetX,
                    centerY + offsetY,
                    baseRadius * (0.4 + 0.6 * normalizedPhase), // Circles also grow and shrink
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            // Add text in the center with darker color for white background
            ctx.fillStyle = "#1a365d"; // Dark teal text for better contrast on white
            ctx.font = "bold 28px 'Segoe UI', Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(phase < 0.5 ? "Inhale..." : "Exhale...", centerX, centerY);
        };

        if (isPlaying) {
            // Reset canvas size for proper scaling
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            let startTime = null;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;

                // Calculate breath phase (0 to 1)
                const newPhase = (elapsed / (breathingRate * 1000)) % 1;
                setBreathPhase(newPhase);

                // Synchronize video with animation
                if (videoRef.current) {
                    const video = videoRef.current;

                    // Set the video time based on the breath phase
                    const videoTime = newPhase * breathingRate;
                    if (Math.abs(video.currentTime - videoTime) > 0.1) {
                        video.currentTime = videoTime;
                    }
                }

                drawBreathingAnimation(newPhase);

                animationRef.current = requestAnimationFrame(animate);
            };

            animationRef.current = requestAnimationFrame(animate);
        } else {
            // Draw static state
            drawBreathingAnimation(0);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying]);

    // Handle video time update to sync with breathing animation
    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || !isPlaying) return;

        // Sync video time with animation phase
        const videoTime = video.currentTime;
        const phase = videoTime / breathingRate;
        setBreathPhase(phase % 1);
    };

    const handleNext = async () => {
        await axios({
            method: 'post',
            url: `http://localhost:8000/api/users/update-score`,
            data: { score: 35 },
        })
        navigate("/reading-exercise");
    };

    const toggleAnimation = () => {
        if (!isPlaying) {
            // Start animation, audio, and video
            setIsPlaying(true);

            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }

            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
            }
        } else {
            // Stop animation, audio, and video
            setIsPlaying(false);

            if (audioRef.current) {
                audioRef.current.pause();
            }

            if (videoRef.current) {
                videoRef.current.pause();
            }

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            // Check for completed loop and award points
            if (breathPhase === 1) {
                setLoopsCompleted((prevLoops) => {
                    const newLoops = prevLoops + 1;
                    return newLoops;
                });
            }

            // Display the final score after 5 loops
            if (loopsCompleted >= 5) {
                alert(`Exercise complete!`);
            }
        }
    };

    useEffect(() => {
        if (isPlaying && timeLeft > 0) {
            const timerInterval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerInterval);
        }
    }, [isPlaying, timeLeft]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-teal-50 to-white p-4"
        >
            <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-3xl font-bold text-teal-800 mb-6 flex items-center"
            >
                <Wind className="mr-2 text-teal-600" size={32} />
                Breathing Exercise
            </motion.h1>

            <audio ref={audioRef} loop>
                <source src="/api/placeholder/400/320" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>

            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-center justify-center">
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full lg:w-1/2"
                >
                    <div className="relative pt-[56.25%] bg-gray-100 rounded-2xl shadow-lg overflow-hidden">
                        <video
                            ref={videoRef}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            onTimeUpdate={handleTimeUpdate}
                            muted
                            playsInline
                        >
                            <source src={videoFile} type="video/mp4" />
                            Your browser does not support the video element.
                        </video>

                        <AnimatePresence>
                            {!isPlaying && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40"
                                >
                                    <div className="text-white text-xl font-medium px-6 py-3 rounded-full bg-teal-800 bg-opacity-70 backdrop-blur-sm">
                                        Press Begin to start video
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full lg:w-1/2"
                >
                    <div className="bg-white rounded-2xl shadow-lg p-4">
                        <canvas
                            ref={canvasRef}
                            className="w-full aspect-square rounded-xl"
                            width={500}
                            height={500}
                        />
                    </div>
                </motion.div>
            </div>

            <div className="flex flex-col items-center mt-8 w-full max-w-xl">
                <div className="flex justify-between items-center w-full mb-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full"
                    >
                        <Clock size={20} className="mr-2" />
                        {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(
                            2,
                            "0"
                        )}`}
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowInstructions(!showInstructions)}
                        className="flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full"
                    >
                        <Info size={20} className="mr-2" />
                        Instructions
                    </motion.button>
                </div>

                <AnimatePresence>
                    {showInstructions && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-teal-50 p-4 rounded-xl mb-6 overflow-hidden"
                        >
                            <h3 className="font-bold text-teal-800 mb-2">
                                How to Perform the Exercise:
                            </h3>
                            <ol className="text-teal-900 space-y-2">
                                <li className="flex items-start">
                                    <span className="bg-teal-200 text-teal-800 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                                        1
                                    </span>
                                    <span>Sit or stand in a comfortable position.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-teal-200 text-teal-800 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                                        2
                                    </span>
                                    <span>
                                        Press <strong>Begin</strong> to start the exercise.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-teal-200 text-teal-800 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                                        3
                                    </span>
                                    <span>
                                        Inhale deeply through your nose as the circles expand.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-teal-200 text-teal-800 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                                        4
                                    </span>
                                    <span>
                                        Exhale slowly through your mouth as the circles contract.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-teal-200 text-teal-800 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                                        5
                                    </span>
                                    <span>Repeat for 5 cycles to complete the exercise.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-teal-200 text-teal-800 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                                        6
                                    </span>
                                    <span>Focus on your breath and try to stay relaxed.</span>
                                </li>
                            </ol>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleAnimation}
                    className="px-8 py-4 bg-teal-600 text-white rounded-full text-lg font-medium shadow-lg hover:bg-teal-700 focus:outline-none transition-colors flex items-center"
                >
                    {isPlaying ? (
                        <Pause className="mr-2" size={24} />
                    ) : (
                        <Play className="mr-2" size={24} />
                    )}
                    {isPlaying ? "Pause" : "Begin"}
                </motion.button>

                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-4 text-teal-800 text-lg font-medium bg-teal-50 px-6 py-2 rounded-full"
                        >
                            {breathPhase < 0.5
                                ? `Inhale (${Math.round(breathPhase * 2 * 100)}%)`
                                : `Exhale (${Math.round(
                                    (1 - (breathPhase - 0.5) * 2) * 100
                                )}%)`}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full flex justify-between items-center mt-8"
                >
                    <div className="text-teal-800 font-medium">
                        Cycles: {loopsCompleted}/5
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        className="px-6 py-3 bg-teal-600 text-white rounded-full text-lg shadow-lg hover:bg-teal-700 focus:outline-none transition-colors flex items-center"
                    >
                        Next Exercise
                        <MoveRight className="ml-2" size={20} />
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default BreathingExercise;

// import React, { useState, useEffect, useRef } from 'react';
// import videoFile from '../../assets/1.mp4';
// import { useNavigate } from 'react-router-dom';

// const BreathingExercise = () => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [breathPhase, setBreathPhase] = useState(0);
//     const [loopsCompleted, setLoopsCompleted] = useState(0);
//     const [timeLeft, setTimeLeft] = useState(5 * 60); // 5-minute timer
//     const audioRef = useRef(null);
//     const videoRef = useRef(null);
//     const animationRef = useRef(null);
//     const canvasRef = useRef(null);
//     const navigate = useNavigate()

//     const totalCircles = 6;
//     const baseRadius = 120;
//     const breathingRate = 7; // Breathing rate in seconds

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         const centerX = canvas.width / 2;
//         const centerY = canvas.height / 2;

//         const drawBreathingAnimation = (phase) => {
//             ctx.fillStyle = 'white';
//             ctx.fillRect(0, 0, canvas.width, canvas.height);

//             const normalizedPhase = phase < 0.5
//                 ? phase * 2
//                 : 2 - phase * 2;

//             const maxAmplitude = 50;
//             const amplitude = maxAmplitude * normalizedPhase;

//             // Draw multiple circles arranged in a flower pattern
//             for (let i = 0; i < totalCircles; i++) {
//                 const angle = (i / totalCircles) * Math.PI * 2;
//                 const offsetX = Math.cos(angle) * amplitude;
//                 const offsetY = Math.sin(angle) * amplitude;

//                 // Create radial gradient for each circle
//                 const gradient = ctx.createRadialGradient(
//                     centerX + offsetX, centerY + offsetY, 0,
//                     centerX + offsetX, centerY + offsetY, baseRadius
//                 );

//                 // Blue-teal gradient (adjusted for white background)
//                 gradient.addColorStop(0, 'rgba(100, 210, 255, 0.9)');
//                 gradient.addColorStop(0.6, 'rgba(65, 175, 220, 0.7)');
//                 gradient.addColorStop(1, 'rgba(45, 150, 190, 0)');

//                 ctx.beginPath();
//                 ctx.arc(
//                     centerX + offsetX,
//                     centerY + offsetY,
//                     baseRadius * (0.4 + 0.6 * normalizedPhase), // Circles also grow and shrink
//                     0,
//                     Math.PI * 2
//                 );
//                 ctx.fillStyle = gradient;
//                 ctx.fill();
//             }

//             // Add text in the center with darker color for white background
//             ctx.fillStyle = '#1a365d'; // Dark teal text for better contrast on white
//             ctx.font = '24px Arial';
//             ctx.textAlign = 'center';
//             ctx.textBaseline = 'middle';
//             ctx.fillText(phase < 0.5 ? "Inhale..." : "Exhale...", centerX, centerY);
//         };

//         if (isPlaying) {
//             // Reset canvas size for proper scaling
//             canvas.width = canvas.offsetWidth;
//             canvas.height = canvas.offsetHeight;

//             let startTime = null;

//             const animate = (timestamp) => {
//                 if (!startTime) startTime = timestamp;
//                 const elapsed = timestamp - startTime;

//                 // Calculate breath phase (0 to 1)
//                 const newPhase = (elapsed / (breathingRate * 1000)) % 1;
//                 setBreathPhase(newPhase);

//                 // Synchronize video with animation
//                 if (videoRef.current) {
//                     const video = videoRef.current;

//                     // Set the video time based on the breath phase
//                     const videoTime = newPhase * breathingRate;
//                     if (Math.abs(video.currentTime - videoTime) > 0.1) {
//                         video.currentTime = videoTime;
//                     }
//                 }

//                 drawBreathingAnimation(newPhase);

//                 animationRef.current = requestAnimationFrame(animate);
//             };

//             animationRef.current = requestAnimationFrame(animate);
//         } else {
//             // Draw static state
//             drawBreathingAnimation(0);
//         }

//         return () => {
//             if (animationRef.current) {
//                 cancelAnimationFrame(animationRef.current);
//             }
//         };
//     }, [isPlaying]);

//     // Handle video time update to sync with breathing animation
//     const handleTimeUpdate = () => {
//         const video = videoRef.current;
//         if (!video || !isPlaying) return;

//         // Sync video time with animation phase
//         const videoTime = video.currentTime;
//         const phase = videoTime / breathingRate;
//         setBreathPhase(phase % 1);
//     };

//     const handleNext = () => {
//         navigate('/reading-exercise');
//     };

//     const toggleAnimation = () => {
//         if (!isPlaying) {
//             // Start animation, audio, and video
//             setIsPlaying(true);

//             if (audioRef.current) {
//                 audioRef.current.currentTime = 0;
//                 audioRef.current.play();
//             }

//             if (videoRef.current) {
//                 videoRef.current.currentTime = 0;
//                 videoRef.current.play();
//             }
//         } else {
//             // Stop animation, audio, and video
//             setIsPlaying(false);

//             if (audioRef.current) {
//                 audioRef.current.pause();
//             }

//             if (videoRef.current) {
//                 videoRef.current.pause();
//             }

//             if (animationRef.current) {
//                 cancelAnimationFrame(animationRef.current);
//             }

//             // Check for completed loop and award points
//             if (breathPhase === 1) {
//                 setLoopsCompleted((prevLoops) => {
//                     const newLoops = prevLoops + 1;
//                     return newLoops;
//                 });
//             }

//             // Display the final score after 5 loops
//             if (loopsCompleted >= 5) {
//                 alert(`Exercise complete!`);
//             }
//         }
//     };

//     useEffect(() => {
//         if (isPlaying && timeLeft > 0) {
//             const timerInterval = setInterval(() => {
//                 setTimeLeft((prevTime) => prevTime - 1);
//             }, 1000);

//             return () => clearInterval(timerInterval);
//         }
//     }, [isPlaying, timeLeft]);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
//             <h1 className="text-2xl font-medium text-teal-800 mb-6">Breathing Exercise</h1>

//             <audio
//                 ref={audioRef}
//                 loop
//             >
//                 <source src="/api/placeholder/400/320" type="audio/mp3" />
//                 Your browser does not support the audio element.
//             </audio>

//             <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-center justify-center">
//                 <div className="w-full md:w-1/2">
//                     <div className="relative pt-[56.25%] bg-gray-100 rounded-lg shadow overflow-hidden">
//                         <video
//                             ref={videoRef}
//                             className="absolute top-0 left-0 w-full h-full object-cover"
//                             onTimeUpdate={handleTimeUpdate}
//                             muted
//                             playsInline
//                         >
//                             <source src={videoFile} type="video/mp4" />
//                             Your browser does not support the video element.
//                         </video>

//                         {!isPlaying && (
//                             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
//                                 <div className="text-white text-lg">Press Begin to start video</div>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <div className="w-full md:w-1/2">
//                     <canvas
//                         ref={canvasRef}
//                         className="w-full aspect-square rounded-lg shadow-md"
//                         width={500}
//                         height={500}
//                     />
//                 </div>
//             </div>

//             <div className="flex flex-col items-center mt-8">
//                 <button
//                     onClick={toggleAnimation}
//                     className="px-8 py-3 bg-teal-600 text-white rounded-full text-lg shadow-lg hover:bg-teal-700 focus:outline-none transition-colors"
//                 >
//                     {isPlaying ? "Pause" : "Begin"}
//                 </button>

//                 {isPlaying && (
//                     <div className="mt-4 text-teal-800 text-lg">
//                         {breathPhase < 0.5 ?
//                             `Inhale (${Math.round(breathPhase * 2 * 100)}%)` :
//                             `Exhale (${Math.round((1 - (breathPhase - 0.5) * 2) * 100)}%)`
//                         }
//                     </div>
//                 )}

//                 <div className="mt-4 text-lg text-teal-800">
//                     {`Time Left: ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}
//                 </div>
//             </div>

//             <div className="mt-6 text-gray-600 text-center max-w-xl">
//                 <p className="text-sm md:text-base">
//                     <strong>How to Perform the Exercise:</strong>
//                     <ol className="list-decimal list-inside mt-2 space-y-2">
//                         <li>Sit or stand in a comfortable position.</li>
//                         <li>Press <strong>Begin</strong> to start the exercise.</li>
//                         <li>Inhale deeply through your nose as the circles expand.</li>
//                         <li>Exhale slowly through your mouth as the circles contract.</li>
//                         <li>Repeat for 5 cycles to complete the exercise.</li>
//                         <li>Focus on your breath and try to stay relaxed.</li>
//                     </ol>
//                 </p>
//             </div>
//             <button
//                 onClick={handleNext}
//                 className="px-8 py-3 bg-teal-600 text-white rounded-full text-lg shadow-lg hover:bg-teal-700 focus:outline-none transition-colors"
//             >
//                 Next
//             </button>
//         </div>
//     );
// };

// export default BreathingExercise;

// // import React, { useState, useEffect, useRef } from 'react';
// // import videoFile from '../../assets/1.mp4';

// // const BreathingExercise = () => {
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [breathPhase, setBreathPhase] = useState(0);
// //   const [score, setScore] = useState(0); // Track the score
// //   const [loopsCompleted, setLoopsCompleted] = useState(0); // Track the number of loops completed
// //   const audioRef = useRef(null);
// //   const videoRef = useRef(null);
// //   const animationRef = useRef(null);
// //   const canvasRef = useRef(null);

// //   const totalCircles = 6;
// //   const baseRadius = 120;
// //   const breathingRate = 7; // Breathing rate in seconds

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     const ctx = canvas.getContext('2d');
// //     const centerX = canvas.width / 2;
// //     const centerY = canvas.height / 2;

// //     const drawBreathingAnimation = (phase) => {
// //       ctx.fillStyle = 'white';
// //       ctx.fillRect(0, 0, canvas.width, canvas.height);

// //       const normalizedPhase = phase < 0.5
// //         ? phase * 2
// //         : 2 - phase * 2;

// //       const maxAmplitude = 50;
// //       const amplitude = maxAmplitude * normalizedPhase;

// //       // Draw multiple circles arranged in a flower pattern
// //       for (let i = 0; i < totalCircles; i++) {
// //         const angle = (i / totalCircles) * Math.PI * 2;
// //         const offsetX = Math.cos(angle) * amplitude;
// //         const offsetY = Math.sin(angle) * amplitude;

// //         // Create radial gradient for each circle
// //         const gradient = ctx.createRadialGradient(
// //           centerX + offsetX, centerY + offsetY, 0,
// //           centerX + offsetX, centerY + offsetY, baseRadius
// //         );

// //         // Blue-teal gradient (adjusted for white background)
// //         gradient.addColorStop(0, 'rgba(100, 210, 255, 0.9)');
// //         gradient.addColorStop(0.6, 'rgba(65, 175, 220, 0.7)');
// //         gradient.addColorStop(1, 'rgba(45, 150, 190, 0)');

// //         ctx.beginPath();
// //         ctx.arc(
// //           centerX + offsetX,
// //           centerY + offsetY,
// //           baseRadius * (0.4 + 0.6 * normalizedPhase), // Circles also grow and shrink
// //           0,
// //           Math.PI * 2
// //         );
// //         ctx.fillStyle = gradient;
// //         ctx.fill();
// //       }

// //       // Add text in the center with darker color for white background
// //       ctx.fillStyle = '#1a365d'; // Dark teal text for better contrast on white
// //       ctx.font = '24px Arial';
// //       ctx.textAlign = 'center';
// //       ctx.textBaseline = 'middle';
// //       ctx.fillText(phase < 0.5 ? "Inhale..." : "Exhale...", centerX, centerY);
// //     };

// //     if (isPlaying) {
// //       // Reset canvas size for proper scaling
// //       canvas.width = canvas.offsetWidth;
// //       canvas.height = canvas.offsetHeight;

// //       let startTime = null;

// //       const animate = (timestamp) => {
// //         if (!startTime) startTime = timestamp;
// //         const elapsed = timestamp - startTime;

// //         // Calculate breath phase (0 to 1)
// //         const newPhase = (elapsed / (breathingRate * 1000)) % 1;
// //         setBreathPhase(newPhase);

// //         // Synchronize video with animation
// //         if (videoRef.current) {
// //           const video = videoRef.current;

// //           // Set the video time based on the breath phase
// //           const videoTime = newPhase * breathingRate;
// //           if (Math.abs(video.currentTime - videoTime) > 0.1) {
// //             video.currentTime = videoTime;
// //           }
// //         }

// //         drawBreathingAnimation(newPhase);

// //         animationRef.current = requestAnimationFrame(animate);
// //       };

// //       animationRef.current = requestAnimationFrame(animate);
// //     } else {
// //       // Draw static state
// //       drawBreathingAnimation(0);
// //     }

// //     return () => {
// //       if (animationRef.current) {
// //         cancelAnimationFrame(animationRef.current);
// //       }
// //     };
// //   }, [isPlaying]);

// //   // Handle video time update to sync with breathing animation
// //   const handleTimeUpdate = () => {
// //     const video = videoRef.current;
// //     if (!video || !isPlaying) return;

// //     // Sync video time with animation phase
// //     const videoTime = video.currentTime;
// //     const phase = videoTime / breathingRate;
// //     setBreathPhase(phase % 1);
// //   };

// //   const toggleAnimation = () => {
// //     if (!isPlaying) {
// //       // Start animation, audio, and video
// //       setIsPlaying(true);

// //       if (audioRef.current) {
// //         audioRef.current.currentTime = 0;
// //         audioRef.current.play();
// //       }

// //       if (videoRef.current) {
// //         videoRef.current.currentTime = 0;
// //         videoRef.current.play();
// //       }
// //     } else {
// //       // Stop animation, audio, and video
// //       setIsPlaying(false);

// //       if (audioRef.current) {
// //         audioRef.current.pause();
// //       }

// //       if (videoRef.current) {
// //         videoRef.current.pause();
// //       }

// //       if (animationRef.current) {
// //         cancelAnimationFrame(animationRef.current);
// //       }

// //       // Check for completed loop and award points
// //       if (breathPhase === 1) {
// //         setLoopsCompleted((prevLoops) => {
// //           const newLoops = prevLoops + 1;
// //           if (newLoops <= 5) {
// //             setScore((prevScore) => prevScore + 10); // Award points for each loop
// //           }
// //           return newLoops;
// //         });
// //       }

// //       // Display the final score after 5 loops
// //       if (loopsCompleted >= 5) {
// //         alert(`Exercise complete! Your final score is: ${score}`);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
// //       <h1 className="text-2xl font-medium text-teal-800 mb-6">Breathing Exercise</h1>

// //       <audio
// //         ref={audioRef}
// //         loop
// //       >
// //         <source src="/api/placeholder/400/320" type="audio/mp3" />
// //         Your browser does not support the audio element.
// //       </audio>

// //       <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-center justify-center">
// //         <div className="w-full md:w-1/2">
// //           <div className="relative pt-[56.25%] bg-gray-100 rounded-lg shadow overflow-hidden">
// //             <video
// //               ref={videoRef}
// //               className="absolute top-0 left-0 w-full h-full object-cover"
// //               onTimeUpdate={handleTimeUpdate}
// //               muted
// //               playsInline
// //             >
// //               <source src={videoFile} type="video/mp4" />
// //               Your browser does not support the video element.
// //             </video>

// //             {!isPlaying && (
// //               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
// //                 <div className="text-white text-lg">Press Begin to start video</div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         <div className="w-full md:w-1/2">
// //           <canvas
// //             ref={canvasRef}
// //             className="w-full aspect-square rounded-lg shadow-md"
// //             width={500}
// //             height={500}
// //           />
// //         </div>
// //       </div>

// //       <div className="flex flex-col items-center mt-8">
// //         <button
// //           onClick={toggleAnimation}
// //           className="px-8 py-3 bg-teal-600 text-white rounded-full text-lg shadow-lg hover:bg-teal-700 focus:outline-none transition-colors"
// //         >
// //           {isPlaying ? "Pause" : "Begin"}
// //         </button>

// //         {isPlaying && (
// //           <div className="mt-4 text-teal-800 text-lg">
// //             {breathPhase < 0.5 ?
// //               `Inhale (${Math.round(breathPhase * 2 * 100)}%)` :
// //               `Exhale (${Math.round((1 - (breathPhase - 0.5) * 2) * 100)}%)`
// //             }
// //           </div>
// //         )}
// //       </div>

// //       <div className="mt-6 text-gray-600 text-center max-w-xl">
// //         <p className="text-sm md:text-base">
// //           <strong>How to Perform the Exercise:</strong>
// //           <ol className="list-decimal list-inside mt-2 space-y-2">
// //             <li>Sit or stand in a comfortable position.</li>
// //             <li>Press <strong>Begin</strong> to start the exercise.</li>
// //             <li>Inhale deeply through your nose as the circles expand.</li>
// //             <li>Exhale slowly through your mouth as the circles contract.</li>
// //             <li>Repeat for 5 cycles to complete the exercise.</li>
// //             <li>Focus on your breath and try to stay relaxed.</li>
// //           </ol>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BreathingExercise;
