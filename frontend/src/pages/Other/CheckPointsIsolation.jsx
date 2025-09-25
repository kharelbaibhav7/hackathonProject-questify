import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Lock, Star, User, Users, Home, Calendar, BookOpen, Mail, MapPin, Heart, Phone, Music, Globe } from 'lucide-react';

const CheckPointsIsolation = () => {
  // Define the isolation challenge steps - now with more steps
  const steps = [
    {
      id: 1,
      title: "Step 1: Venture to a Public Park",
      description: "Spend 15 minutes sitting on a bench in a local park. Just observe people around you, no need to interact yet.",
      icon: <MapPin />,
      color: "bg-green-100 border-green-400",
      textColor: "text-green-700",
    },
    {
      id: 2,
      title: "Step 2: Visit a Quiet Café",
      description: "Order a drink at a café and sit there for 30 minutes. Bring a book if you want something to do.",
      icon: <Home />,
      color: "bg-amber-100 border-amber-400",
      textColor: "text-amber-700",
    },
    {
      id: 3,
      title: "Step 3: Bookstore Browse",
      description: "Visit a bookstore and ask an employee for a recommendation. Practice a brief social interaction.",
      icon: <BookOpen />,
      color: "bg-blue-100 border-blue-400",
      textColor: "text-blue-700",
    },
    {
      id: 4,
      title: "Step 4: Small Errand Run",
      description: "Go to a store and make a small purchase. Try to engage in brief small talk with the cashier.",
      icon: <Star />,
      color: "bg-purple-100 border-purple-400",
      textColor: "text-purple-700",
    },
    {
      id: 5,
      title: "Step 5: Attend a Public Event",
      description: "Join a public event like a free gallery opening, farmers market, or community fair where you can blend in with the crowd.",
      icon: <Calendar />,
      color: "bg-pink-100 border-pink-400",
      textColor: "text-pink-700",
    },
    {
      id: 6,
      title: "Step 6: Listen to Live Music",
      description: "Attend a small live music event at a café or public space. Enjoy the shared experience without pressure to socialize.",
      icon: <Music />,
      color: "bg-indigo-100 border-indigo-400",
      textColor: "text-indigo-700",
    },
    {
      id: 7,
      title: "Step 7: Join a Walking Tour",
      description: "Join a walking tour or group activity where interaction is optional but you're around others with a shared interest.",
      icon: <MapPin />,
      color: "bg-red-100 border-red-400",
      textColor: "text-red-700",
    },
    {
      id: 8,
      title: "Step 8: Message an Old Friend",
      description: "Reach out to an old friend and suggest meeting up for coffee or a short activity. Plan a specific day and time.",
      icon: <Mail />,
      color: "bg-orange-100 border-orange-400",
      textColor: "text-orange-700",
    },
    {
      id: 9,
      title: "Step 9: Have a Phone Call",
      description: "Instead of just texting, have a 15-minute phone conversation with a friend or family member.",
      icon: <Phone />,
      color: "bg-lime-100 border-lime-400",
      textColor: "text-lime-700",
    },
    {
      id: 10,
      title: "Step 10: One-on-One Meetup",
      description: "Meet a friend or acquaintance for coffee, lunch or a walk. Focus on actively listening and engaging in the conversation.",
      icon: <User />,
      color: "bg-cyan-100 border-cyan-400",
      textColor: "text-cyan-700",
    },
    {
      id: 11,
      title: "Step 11: Join an Online Community",
      description: "Join an online forum or social media group related to your interests and introduce yourself in a discussion.",
      icon: <Globe />,
      color: "bg-teal-100 border-teal-400",
      textColor: "text-teal-700",
    },
    {
      id: 12,
      title: "Step 12: Attend a Group Event",
      description: "Attend a structured social gathering like a book club, workshop, or meet-up related to your interests.",
      icon: <Users />,
      color: "bg-yellow-100 border-yellow-400",
      textColor: "text-yellow-700",
    }
  ];

  // State for tracking progress
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isExpanded, setIsExpanded] = useState(null);

  // Handle step completion
  const completeStep = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      setCompletedSteps([...completedSteps, stepId]);
      
      if (stepId < steps.length) {
        setCurrentStep(stepId + 1);
      }
    }
  };

  // Toggle step expansion
  const toggleExpand = (stepId) => {
    if (isExpanded === stepId) {
      setIsExpanded(null);
    } else {
      setIsExpanded(stepId);
    }
  };

  // Determine if a step is locked
  const isStepLocked = (stepId) => {
    if (stepId === 1) return false;
    return !completedSteps.includes(stepId - 1);
  };

  // Determine if a step should be visible
  const isStepVisible = (stepId) => {
    return stepId <= currentStep || completedSteps.includes(stepId);
  };

  // Filter steps to show only current and completed
  const visibleSteps = steps.filter(step => isStepVisible(step.id));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Journey Beyond Isolation</h1>
        <p className="text-gray-600">
          Complete each step at your own pace. Every small victory brings you closer to comfort in social settings.
        </p>
      </motion.div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 font-medium">Your Progress</span>
          <span className="text-gray-800 font-bold">{completedSteps.length} / {steps.length} steps completed</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
          />
        </div>
      </div>

      {/* Steps roadmap */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 z-0"></div>
        
        {visibleSteps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isLocked = isStepLocked(step.id);
          const isActive = currentStep === step.id && !isCompleted;
          
          return (
            <AnimatePresence key={step.id}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: step.id === currentStep ? 0.5 : 0.1 }}
                className={`relative z-10 mb-6 ${isLocked ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start">
                  <motion.div
                    whileHover={!isLocked ? { scale: 1.1 } : {}}
                    className={`w-16 h-16 rounded-full ${isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'} flex items-center justify-center text-white shadow-md z-20`}
                  >
                    {isCompleted ? (
                      <CheckCircle size={28} />
                    ) : isLocked ? (
                      <Lock size={24} />
                    ) : (
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 1 }}>
                        {step.icon || <Star size={24} />}
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.div
                    whileHover={!isLocked ? { scale: 1.02, x: 5 } : {}}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`ml-6 p-4 rounded-lg border-2 ${step.color || 'bg-gray-50 border-gray-200'} shadow-sm flex-1 cursor-pointer`}
                    onClick={() => !isLocked && toggleExpand(step.id)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className={`font-bold ${step.textColor || 'text-gray-800'}`}>{step.title}</h3>
                      {isCompleted && <CheckCircle className="text-green-500" size={20} />}
                    </div>
                    
                    <AnimatePresence>
                      {(isExpanded === step.id || (!isLocked && !isCompleted)) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3"
                        >
                          <p className="text-gray-600 mb-3">{step.description}</p>
                          
                          {!isLocked && !isCompleted && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md shadow-md hover:shadow-lg transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                completeStep(step.id);
                              }}
                            >
                              I've completed this step
                            </motion.button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          );
        })}

        {/* Next step preview if not the last step */}
        {currentStep < steps.length && !completedSteps.includes(currentStep) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 mb-6"
          >
            <div className="flex items-start">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-white shadow-md z-20">
                <Lock size={24} />
              </div>
              <div className="ml-6 p-4 rounded-lg border-2 bg-gray-50 border-gray-200 shadow-sm flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-400">Next challenge locked</h3>
                </div>
                <p className="text-gray-400 mt-2">Complete the current step to reveal your next challenge!</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Completion celebration */}
      {completedSteps.length === steps.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border-2 border-purple-300 text-center"
        >
          <Star size={48} className="text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-purple-800 mb-2">Congratulations!</h2>
          <p className="text-purple-700">
            You've completed all steps on your journey! Remember that social comfort is an ongoing practice, but you now have the tools to keep building connections.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md shadow-md hover:shadow-lg transition-all"
            onClick={() => {
              setCompletedSteps([]);
              setCurrentStep(1);
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 3000);
            }}
          >
            Start Again
          </motion.button>
        </motion.div>
      )}

      {/* Confetti effect */}
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50"
        >
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                top: "0%", 
                left: `${Math.random() * 100}%`,
                rotate: 0,
                opacity: 1
              }}
              animate={{ 
                top: "100%", 
                left: `${Math.random() * 100}%`,
                rotate: Math.random() * 360,
                opacity: 0
              }}
              transition={{ 
                duration: Math.random() * 2 + 1,
                ease: "easeOut"
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{ 
                backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CheckPointsIsolation;


// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { CheckCircle, Lock, Star, User, Users, Home, Calendar, BookOpen, Mail, MapPin, Heart } from 'lucide-react';

// const CheckPointsIsolation = () => {
//   // Define the isolation challenge steps
//   const steps = [
//     {
//       id: 1,
//       title: "Step 1: Venture to a Public Park",
//       description: "Spend 15 minutes sitting on a bench in a local park. Just observe people around you, no need to interact yet.",
//       icon: <MapPin />,
//       color: "bg-green-100 border-green-400",
//       textColor: "text-green-700",
//     },
//     {
//       id: 2,
//       title: "Step 2: Visit a Quiet Café",
//       description: "Order a drink at a café and sit there for 30 minutes. Bring a book if you want something to do.",
//       icon: <Home />,
//       color: "bg-amber-100 border-amber-400",
//       textColor: "text-amber-700",
//     },
//     {
//       id: 3,
//       title: "Step 3: Bookstore Browse",
//       description: "Visit a bookstore and ask an employee for a recommendation. Practice a brief social interaction.",
//       icon: <BookOpen />,
//       color: "bg-blue-100 border-blue-400",
//       textColor: "text-blue-700",
//     },
//     {
//       id: 4,
//       title: "Step 4: Small Errand Run",
//       description: "Go to a store and make a small purchase. Try to engage in brief small talk with the cashier.",
//       icon: <Star />,
//       color: "bg-purple-100 border-purple-400",
//       textColor: "text-purple-700",
//     },
//     {
//       id: 5,
//       title: "Step 5: Join a Walking Tour",
//       description: "Join a walking tour or group activity where interaction is optional but you're around others.",
//       icon: <MapPin />,
//       color: "bg-pink-100 border-pink-400",
//       textColor: "text-pink-700",
//     },
//     {
//       id: 6,
//       title: "Step 6: Message an Old Friend",
//       description: "Reach out to an old friend and suggest meeting up for coffee or a short activity.",
//       icon: <Mail />,
//       color: "bg-indigo-100 border-indigo-400",
//       textColor: "text-indigo-700",
//     },
//     {
//       id: 7,
//       title: "Step 7: Attend a Group Event",
//       description: "Attend a public event like a workshop, class, or meet-up related to your interests.",
//       icon: <Users />,
//       color: "bg-orange-100 border-orange-400",
//       textColor: "text-orange-700",
//     }
//   ];

//   // State for tracking progress
//   const [currentStep, setCurrentStep] = useState(1);
//   const [completedSteps, setCompletedSteps] = useState([]);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(null);

//   // Handle step completion
//   const completeStep = (stepId) => {
//     if (!completedSteps.includes(stepId)) {
//       setShowConfetti(true);
//       setTimeout(() => setShowConfetti(false), 3000);
      
//       setCompletedSteps([...completedSteps, stepId]);
      
//       if (stepId < steps.length) {
//         setCurrentStep(stepId + 1);
//       }
//     }
//   };

//   // Toggle step expansion
//   const toggleExpand = (stepId) => {
//     if (isExpanded === stepId) {
//       setIsExpanded(null);
//     } else {
//       setIsExpanded(stepId);
//     }
//   };

//   // Determine if a step is locked
//   const isStepLocked = (stepId) => {
//     if (stepId === 1) return false;
//     return !completedSteps.includes(stepId - 1);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mb-8 text-center"
//       >
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Journey Beyond Isolation</h1>
//         <p className="text-gray-600">
//           Complete each step at your own pace. Every small victory brings you closer to comfort in social settings.
//         </p>
//       </motion.div>

//       {/* Progress indicator */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-2">
//           <span className="text-gray-600 font-medium">Your Progress</span>
//           <span className="text-gray-800 font-bold">{Math.round((completedSteps.length / steps.length) * 100)}%</span>
//         </div>
//         <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
//             transition={{ duration: 0.5 }}
//             className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
//           />
//         </div>
//       </div>

//       {/* Steps roadmap */}
//       <div className="relative">
//         <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 z-0"></div>
        
//         {steps.map((step) => {
//           const isCompleted = completedSteps.includes(step.id);
//           const isLocked = isStepLocked(step.id);
//           const isActive = currentStep === step.id && !isCompleted;
          
//           return (
//             <AnimatePresence key={step.id}>
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.3, delay: step.id * 0.1 }}
//                 className={`relative z-10 mb-6 ${isLocked ? 'opacity-50' : ''}`}
//               >
//                 <div className="flex items-start">
//                   <motion.div
//                     whileHover={!isLocked ? { scale: 1.1 } : {}}
//                     className={`w-16 h-16 rounded-full ${isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'} flex items-center justify-center text-white shadow-md z-20`}
//                   >
//                     {isCompleted ? (
//                       <CheckCircle size={28} />
//                     ) : isLocked ? (
//                       <Lock size={24} />
//                     ) : (
//                       <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 1 }}>
//                         {step.icon || <Star size={24} />}
//                       </motion.div>
//                     )}
//                   </motion.div>
                  
//                   <motion.div
//                     whileHover={!isLocked ? { scale: 1.02, x: 5 } : {}}
//                     transition={{ type: "spring", stiffness: 300 }}
//                     className={`ml-6 p-4 rounded-lg border-2 ${step.color || 'bg-gray-50 border-gray-200'} shadow-sm flex-1 cursor-pointer`}
//                     onClick={() => !isLocked && toggleExpand(step.id)}
//                   >
//                     <div className="flex justify-between items-center">
//                       <h3 className={`font-bold ${step.textColor || 'text-gray-800'}`}>{step.title}</h3>
//                       {isCompleted && <CheckCircle className="text-green-500" size={20} />}
//                     </div>
                    
//                     <AnimatePresence>
//                       {(isExpanded === step.id || (!isLocked && !isCompleted)) && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="mt-3"
//                         >
//                           <p className="text-gray-600 mb-3">{step.description}</p>
                          
//                           {!isLocked && !isCompleted && (
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md shadow-md hover:shadow-lg transition-all"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 completeStep(step.id);
//                               }}
//                             >
//                               I've completed this step
//                             </motion.button>
//                           )}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           );
//         })}
//       </div>

//       {/* Completion celebration */}
//       {completedSteps.length === steps.length && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", stiffness: 300 }}
//           className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border-2 border-purple-300 text-center"
//         >
//           <Star size={48} className="text-purple-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-purple-800 mb-2">Congratulations!</h2>
//           <p className="text-purple-700">
//             You've completed all steps on your journey! Remember that social comfort is an ongoing practice, but you now have the tools to keep building connections.
//           </p>
//         </motion.div>
//       )}

//       {/* Confetti effect */}
//       {showConfetti && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 pointer-events-none z-50"
//         >
//           {Array.from({ length: 100 }).map((_, i) => (
//             <motion.div
//               key={i}
//               initial={{ 
//                 top: "0%", 
//                 left: `${Math.random() * 100}%`,
//                 rotate: 0,
//                 opacity: 1
//               }}
//               animate={{ 
//                 top: "100%", 
//                 left: `${Math.random() * 100}%`,
//                 rotate: Math.random() * 360,
//                 opacity: 0
//               }}
//               transition={{ 
//                 duration: Math.random() * 2 + 1,
//                 ease: "easeOut"
//               }}
//               className="absolute w-3 h-3 rounded-full"
//               style={{ 
//                 backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
//                 boxShadow: "0 0 10px rgba(0,0,0,0.1)"
//               }}
//             />
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default CheckPointsIsolation;