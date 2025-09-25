import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const HomePageLogin = () => {
    const wellnessTips = [
        "Start your day with a 5-minute meditation session to set a positive tone.",
        "Take short breaks during work to stretch and breathe.",
        "Stay hydrated by drinking water throughout the day.",
        "Practice gratitude by writing down three things you're thankful for.",
        "A short walk can clear your mind and boost creativity.",
    ];

    // Calculate tip index based on the current day
    const calculateTipIndex = () => {
        const now = new Date();
        return now.getDate() % wellnessTips.length;
    };

    const [tipIndex, setTipIndex] = useState(calculateTipIndex());

    useEffect(() => {
        // Set an interval to update the tip every 24 hours
        const interval = setInterval(() => {
            setTipIndex(calculateTipIndex());
        }, 86400000);

        return () => clearInterval(interval);
    }, []);

    // Feedback data
    const feedbacks = [
        {
            text: "Questify has truly changed my perspective on wellness. The community is so supportive!",
            author: "Emily R.",
        },
        {
            text: "The expert resources helped me improve my mental health. Highly recommend!",
            author: "David L.",
        },
        {
            text: "A one-stop platform for all my wellness needs. Amazing experience!",
            author: "Sarah K.",
        },
        {
            text: "A fantastic place to find motivation and track progress!",
            author: "Michael T.",
        },
        {
            text: "I've never felt more connected to a wellness community!",
            author: "Jessica B.",
        },
    ];

    // Slider functionality
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Scroll animation hooks
    const { scrollYProgress } = useScroll();
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const aboutRef = useRef(null);
    const testimonialsRef = useRef(null);

    // Check if elements are in view
    const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
    const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });
    const aboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
    const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });

    // Transform values for parallax effects
    const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    // Add CSS for no-select and scrollbar styling
    useEffect(() => {
        const style = document.createElement("style");
        style.textContent = `
      .no-select {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
      .testimonial-card {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const handleMouseDown = (e) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
        document.body.classList.add("no-select");
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        document.body.classList.remove("no-select");
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.body.classList.remove("no-select");
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    // Touch support for mobile
    const handleTouchStart = (e) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
        document.body.classList.add("no-select");
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !sliderRef.current) return;
        const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        document.body.classList.remove("no-select");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Wellness Tip - Full Screen */}
            <motion.div
                ref={heroRef}
                style={{ y: heroY, opacity: heroOpacity }}
                className="w-full h-screen bg-gradient-to-br from-teal-50 to-teal-100 relative overflow-hidden flex items-center justify-center"
            >
                {/* Decorative background elements with animation */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-0 right-0 w-64 h-64 bg-teal-200 rounded-full opacity-10 transform translate-x-32 -translate-y-32"
                ></motion.div>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [360, 180, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-0 left-0 w-48 h-48 bg-teal-300 rounded-full opacity-10 transform -translate-x-24 translate-y-24"
                ></motion.div>

                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center relative z-10 px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12"
                    >
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            >
                                <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                                    Welcome to <span className="text-teal-600">Questify</span>
                                </h1>
                                <p className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
                                    A holistic wellness platform dedicated to nurturing your mind,
                                    body, and spirit through community support and expert resources.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/daily-quest"
                                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                                >
                                    Get Started
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/doctors"
                                    className="bg-white hover:bg-gray-50 text-teal-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl border-2 border-teal-600 transition-all duration-300 text-center"
                                >
                                    Contact Specialist
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="lg:w-1/2"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02, rotateY: 5 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-8 rounded-2xl shadow-xl border border-teal-100 max-w-md mx-auto lg:mx-0"
                        >
                            <div className="text-center mb-6">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                    </svg>
                                </motion.div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Today's Wellness Tip
                                </h2>
                            </div>
                            <motion.p
                                key={tipIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-gray-700 italic text-lg mb-4 text-center leading-relaxed"
                            >
                                "{wellnessTips[tipIndex]}"
                            </motion.p>
                            <p className="text-sm text-gray-500 text-center">
                                Let this tip inspire your wellness journey today.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
                ref={featuresRef}
                className="w-full py-20 px-4 md:px-8 bg-white"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                            How Questify Helps You
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Discover the comprehensive tools and supportive community that will transform your wellness journey
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300"
                            >
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Community Engagement
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                                Connect with like-minded individuals in supportive discussion
                                groups and build meaningful relationships on your wellness journey.
                            </p>
                            <motion.a
                                whileHover={{ x: 5 }}
                                href="/forum"
                                className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-300"
                            >
                                Join Discussions
                                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </motion.a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300"
                            >
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Expert Resources
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                                Access curated content tailored to your personal wellness goals
                                with evidence-based articles and professional guidance.
                            </p>
                            <motion.a
                                whileHover={{ x: 5 }}
                                href="/daily-quest"
                                className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-300"
                            >
                                Explore Resources
                                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </motion.a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300"
                            >
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Progress Tracking
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                                Monitor your wellness journey and celebrate meaningful
                                milestones with our intuitive tracking tools.
                            </p>
                            <motion.a
                                whileHover={{ x: 5 }}
                                href="/progress"
                                className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-300"
                            >
                                Track Progress
                                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* About Section */}
            <motion.div
                ref={aboutRef}
                className="w-full py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
            >
                {/* Decorative elements */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-teal-200 rounded-full opacity-20"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-teal-300 rounded-full opacity-20"></div>

                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12"
                    >
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            >
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                                    About <span className="text-teal-600">Questify</span>
                                </h2>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={aboutInView ? { width: "80px" } : { width: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                    className="h-1 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mb-8"
                                ></motion.div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                                className="space-y-6"
                            >
                                <p className="text-gray-700 text-xl leading-relaxed">
                                    Questify is a holistic wellness platform dedicated to nurturing
                                    your mind, body, and spirit. Our community-driven approach
                                    connects you with personalized resources, expert guidance, and
                                    inspiring content to help you lead a healthier, more balanced
                                    life.
                                </p>
                                <p className="text-gray-700 text-xl leading-relaxed">
                                    Whether you're seeking community support or expert advice,
                                    Questify is here to empower your wellness journey every step of
                                    the way.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                                className="flex flex-wrap gap-4 pt-4"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm"
                                >
                                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                    <span className="text-gray-700 font-medium">Community Support</span>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm"
                                >
                                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                    <span className="text-gray-700 font-medium">Expert Guidance</span>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm"
                                >
                                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                    <span className="text-gray-700 font-medium">Personalized Resources</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="lg:w-1/2 flex justify-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-80 h-80 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center shadow-2xl"
                            >
                                <img
                                    src="../../images/logo.png"
                                    alt="Questify Logo"
                                    className="w-64 h-64 object-contain"
                                />
                            </motion.div>
                            {/* Decorative circles around the logo */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.6, 0.8, 0.6]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute -top-4 -right-4 w-8 h-8 bg-teal-400 rounded-full"
                            ></motion.div>
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.6, 0.9, 0.6]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1
                                }}
                                className="absolute -bottom-4 -left-4 w-12 h-12 bg-teal-300 rounded-full"
                            ></motion.div>
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.4, 0.7, 0.4]
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                                className="absolute top-1/2 -left-8 w-6 h-6 bg-teal-500 rounded-full"
                            ></motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Feedback Section with Slider */}
            <motion.div
                ref={testimonialsRef}
                className="w-full py-20 px-4 md:px-8 bg-gradient-to-br from-teal-50 to-white relative overflow-hidden"
            >
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-white" style={{ borderRadius: '0 0 50% 50%/0 0 100% 100%' }}></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-100 rounded-full opacity-30 transform translate-x-32 translate-y-32"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                            What People Say
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Hear from our community members who have transformed their wellness journey with Questify
                        </p>
                    </motion.div>
                    <div
                        ref={sliderRef}
                        className={`flex space-x-8 overflow-x-auto pb-6 scrollbar-hide ${isDragging ? "cursor-grabbing" : "cursor-grab"
                            }`}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
                    >
                        {feedbacks.map((feedback, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="testimonial-card p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl min-w-[350px] flex-shrink-0 border border-gray-100 transition-all duration-300"
                            >
                                <div className="text-center mb-6">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4"
                                    >
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                        </svg>
                                    </motion.div>
                                </div>
                                <p className="text-gray-700 italic text-lg leading-relaxed mb-6">"{feedback.text}"</p>
                                <div className="flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4"
                                    >
                                        <span className="text-teal-600 font-bold text-lg">
                                            {feedback.author.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </motion.div>
                                    <p className="text-gray-800 font-semibold text-lg">
                                        {feedback.author}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={testimonialsInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                        className="mt-8 text-gray-500 italic text-lg"
                    >
                        ← Drag to see more testimonials →
                    </motion.p>
                </div>
            </motion.div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full py-16 px-4 md:px-8 bg-gradient-to-r from-teal-800 to-teal-900 text-white relative overflow-hidden"
            >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-24 bg-white" style={{ borderRadius: '0 0 50% 50%/0 0 100% 100%' }}></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-teal-700 rounded-full opacity-20"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-teal-600 rounded-full opacity-20"></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-center">
                        <div className="mb-8 lg:mb-0 text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start mb-4">
                                <img
                                    src="../../images/logo.png"
                                    alt="Questify Logo"
                                    className="w-12 h-12 mr-4"
                                />
                                <h3 className="text-3xl font-bold">Questify</h3>
                            </div>
                            <p className="text-lg text-teal-100 mb-4 max-w-md">
                                Nurturing your mind, body, and spirit through community support and expert resources.
                            </p>
                            <div className="flex justify-center lg:justify-start space-x-4">
                                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors duration-300 cursor-pointer">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors duration-300 cursor-pointer">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                    </svg>
                                </div>
                                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors duration-300 cursor-pointer">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center lg:justify-end gap-8">
                            <div className="text-center lg:text-right">
                                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                                <div className="space-y-2">
                                    <a href="/about" className="block text-teal-100 hover:text-white transition-colors duration-300">
                                        About Us
                                    </a>
                                    <a href="/contact" className="block text-teal-100 hover:text-white transition-colors duration-300">
                                        Contact
                                    </a>
                                    <a href="/forum" className="block text-teal-100 hover:text-white transition-colors duration-300">
                                        Community
                                    </a>
                                </div>
                            </div>
                            <div className="text-center lg:text-right">
                                <h4 className="text-lg font-semibold mb-4">Support</h4>
                                <div className="space-y-2">
                                    <a href="/privacy" className="block text-teal-100 hover:text-white transition-colors duration-300">
                                        Privacy Policy
                                    </a>
                                    <a href="/terms" className="block text-teal-100 hover:text-white transition-colors duration-300">
                                        Terms of Service
                                    </a>
                                    <a href="/help" className="block text-teal-100 hover:text-white transition-colors duration-300">
                                        Help Center
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-teal-700 mt-12 pt-8 text-center">
                        <p className="text-teal-200">
                            © 2024 Questify. All rights reserved. Made with ❤️ for your wellness journey.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HomePageLogin;
