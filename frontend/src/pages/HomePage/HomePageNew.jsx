import React from "react";
import { motion } from "framer-motion";
import homePic from "../../../images/homePic.jpg";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "lucide-react";
// import {Link} from "lucide-react"
// import instaLogo from "../../../images/instaLogo.png";
// import youtubeLogo from "../../images/youtubeLogo.png";
// import linkedinLogo from "../../images/linkedinLogo.png";


const HomePageNew = () => {

    let navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Circular Image and Rotating Logo */}
            <div className="relative w-full bg-gradient-to-r from-teal-700 to-teal-500 py-16">
                <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
                    {/* Left Side - Circular Cut Image */}
                    <div className="w-full md:w-1/2 mb-12 md:mb-0 relative">
                        <div className="relative h-80 md:h-96 w-full md:max-w-md">
                            {/* Main circular image container */}
                            <div className="absolute inset-0 overflow-hidden rounded-r-full border-4 border-white shadow-xl">
                                <img
                                    src={homePic}
                                    alt="Wellness Community"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -bottom-6 -left-2 h-16 w-16 rounded-full bg-teal-300 z-10"></div>
                            <div className="absolute top-1/4 -right-4 h-8 w-8 rounded-full bg-white/70 z-10"></div>
                            <div className="absolute bottom-1/3 -right-6 h-12 w-12 rounded-full border-4 border-teal-200 z-10"></div>
                            
                            {/* Gradient overlay for better text contrast */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-teal-700/50 rounded-r-full"></div>
                        </div>
                    </div>
                    
                    {/* Right Side - Text Content with Rotating Logo */}
                    <div className="w-full md:w-1/2 text-white md:pl-8 relative">
                        <div className="flex flex-col items-center md:items-start">
                            {/* Animated rotating logo */}
                            <motion.img
                                className="h-45 md:h-36 mb-6"
                                src="/images/logo.png"
                                alt="Questify Logo"
                                animate={{ rotate: 360 }}
                                transition={{ 
                                    duration: 15, 
                                    ease: "linear", 
                                    repeat: Infinity 
                                }}
                            />
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">Questify</h1>
                            <p className="text-xl md:text-2xl mb-6">Small steps, big impact</p>
                            <p className="text-gray-100 mb-8 text-lg text-center md:text-left">
                                Join our supportive community dedicated to holistic wellness, 
                                personal growth, and meaningful connections. Together, we create 
                                a circle of care that empowers everyone to thrive.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="bg-white text-teal-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105" onClick={() => {navigate("/register")}}>
                                    Join Our Community
                                </button>
                                <button className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-medium py-3 px-6 rounded-full transition duration-300" onClick={()=>{navigate("/aboutus")}}>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Motto Section */}
            <div className="w-full py-16 px-4 md:px-8 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Purpose</h2>
                    <p className="text-xl md:text-2xl text-teal-600 font-medium mb-6">
                        "Nurturing health through community, compassion, and care"
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-10">
                        At Questify, we believe that true wellness emerges when we support each other.
                        Our platform connects individuals seeking health improvement with supportive communities,
                        expert resources, and personalized guidance—creating a circle of care that empowers
                        everyone to thrive.
                    </p>
                </div>
            </div>

            {/* Value Proposition Cards */}
            <div className="w-full px-4 md:px-12 pb-20 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
                        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-600 mx-auto mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed flex-grow">
                            A world where everyone has access to supportive communities and resources
                            that empower them to achieve optimal health and wellbeing, regardless of
                            their background or circumstances.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
                        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-600 mx-auto mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed flex-grow">
                            To create meaningful connections between individuals and communities that foster
                            growth, healing, and transformation. We build bridges between those seeking help
                            and those ready to provide it.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
                        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-600 mx-auto mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Values</h3>
                        <p className="text-gray-600 leading-relaxed flex-grow">
                            Compassion guides our interactions. Integrity builds our trust. Innovation drives
                            our solutions. Inclusivity shapes our community. Together, these values create a
                            foundation for authentic wellness.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section with Curved Background */}
            <div className="w-full py-16 px-4 md:px-8 bg-teal-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-white" style={{ borderRadius: '0 0 50% 50%/0 0 100% 100%' }}></div>
                <div className="max-w-5xl mx-auto pt-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">How Questify Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex-shrink-0 bg-teal-100 text-teal-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">1</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Join Supportive Communities</h3>
                                <p className="text-gray-600">Connect with like-minded individuals who share your health goals and challenges.</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex-shrink-0 bg-teal-100 text-teal-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">2</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Access Expert Resources</h3>
                                <p className="text-gray-600">Explore our library of evidence-based articles, videos, and tools curated by health professionals.</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex-shrink-0 bg-teal-100 text-teal-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">3</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
                                <p className="text-gray-600">Use our intuitive tools to monitor your wellness journey and celebrate your achievements.</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex-shrink-0 bg-teal-100 text-teal-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">4</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Give and Receive Support</h3>
                                <p className="text-gray-600">Share your experiences and insights while benefiting from the wisdom of others.</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-16">
                        <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                            Get Started Today
                        </button>
                    </div>
                </div>
            </div>

            {/* Testimonials Section with Wave Separator */}
            <div className="w-full py-16 px-4 md:px-8 bg-white relative">
                <div className="absolute bottom-full left-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
                        <path fill="#e6fcf5" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                    </svg>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">What Our Community Says</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-lg bg-gray-50 text-left relative shadow-md">
                            <div className="absolute -top-4 -left-4 text-5xl text-teal-200">"</div>
                            <p className="text-gray-600 italic mb-6 pt-4">Questify changed my approach to health completely. The supportive community and resources helped me achieve goals I thought were impossible.</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold mr-4">SM</div>
                                <p className="font-medium text-gray-800">Sarah M.</p>
                            </div>
                        </div>

                        <div className="p-8 rounded-lg bg-gray-50 text-left relative shadow-md">
                            <div className="absolute -top-4 -left-4 text-5xl text-teal-200">"</div>
                            <p className="text-gray-600 italic mb-6 pt-4">I've tried many wellness platforms, but the genuine connections and expert guidance at Questify made all the difference in my journey.</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold mr-4">MT</div>
                                <p className="font-medium text-gray-800">Michael T.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action with Gradient Background */}
            <div className="w-full py-16 px-4 md:px-8 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
                <div className="max-w-4xl mx-auto text-center relative">
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 h-16 w-16 rounded-full bg-white opacity-10"></div>
                    <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-white opacity-10"></div>
                    <div className="absolute top-1/2 right-1/4 h-8 w-8 rounded-full bg-white opacity-10"></div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Wellness Journey Today</h2>
                    <p className="text-xl mb-8">Join thousands who have transformed their lives through connection and support.</p>
                    <button className="bg-white text-teal-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105" onClick={()=>{navigate("/register")}}>
                        Join Questify Now
                    </button>
                    
                </div>
            </div>
            {/* Footer */}
            <div className="text-black py-6 mt-12">
                <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-8">
                    <div className="flex items-center gap-3">
                        <img src="../../images/logo.png" alt="Logo" className="w-12 h-12 rounded-full" />
                        <p className="text-xl font-semibold font-akaya-kanadaka">Questify</p>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        {[
                            { link: "https://www.instagram.com/", img: "../../images/instaLogo.png" },
                            { link: "https://www.youtube.com/", img: "../../images/youtubeLogo.png" },
                            { link: "https://www.linkedin.com/", img: "../../images/linkedinLogo.png" },
                        ].map((social, index) => (
                            <Link key={index} to={social.link} target="_blank">
                                <img src={social.img} alt="Social" className="w-8 h-8" />
                            </Link>
                        ))}
                    </div>
                </div>
                <p className="text-center text-md mt-4 text-blue-600 font-inter">Copyright &copy; 2025 Questify. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default HomePageNew;


// import React from "react";
// import homePic from "../../../images/homePic.jpg";

// const HomePageNew = () => {
//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Hero Section with Image and Text Side by Side */}
//             <div className="relative w-full bg-teal-600 py-16">
//                 <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
//                     {/* Left Text Content */}
//                     <div className="w-full md:w-1/2 text-white mb-12 md:mb-0 md:pr-8">
//                         <img
//                             className="h-20 md:h-24 mb-6"
//                             src="/images/logo.png"
//                             alt="Questify Logo"
//                         />
//                         <h1 className="text-3xl md:text-5xl font-bold mb-4">Questify</h1>
//                         <p className="text-xl md:text-2xl mb-6">Where wellbeing begins, together</p>
//                         <p className="text-gray-100 mb-8 text-lg">
//                             Join our supportive community dedicated to holistic wellness, 
//                             personal growth, and meaningful connections. Together, we create 
//                             a circle of care that empowers everyone to thrive.
//                         </p>
//                         <div className="flex flex-wrap gap-4">
//                             <button className="bg-white text-teal-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-full shadow-lg transition duration-300">
//                                 Join Our Community
//                             </button>
//                             <button className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-medium py-3 px-6 rounded-full transition duration-300">
//                                 Learn More
//                             </button>
//                         </div>
//                     </div>
                    
//                     {/* Right Image with Border */}
//                     <div className="w-full md:w-1/2 flex justify-center md:justify-end">
//                         <div className="relative">
//                             {/* Decorative elements */}
//                             <div className="absolute -top-4 -left-4 w-full h-full border-2 border-teal-300 rounded-lg"></div>
//                             <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-white/50 rounded-lg"></div>
                            
//                             {/* Main image */}
//                             <img
//                                 src={homePic}
//                                 alt="Wellness Community"
//                                 className="relative z-10 rounded-lg shadow-xl object-cover h-80 w-full md:h-96 md:w-auto"
//                             />
                            
//                             {/* Accent dots */}
//                             <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-teal-300"></div>
//                             <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-white/70"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Motto Section */}
//             <div className="w-full py-16 px-4 md:px-8 bg-white">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Purpose</h2>
//                     <p className="text-xl md:text-2xl text-teal-600 font-medium mb-6">
//                         "Nurturing health through community, compassion, and care"
//                     </p>
//                     <p className="text-gray-700 text-lg leading-relaxed mb-10">
//                         At Questify, we believe that true wellness emerges when we support each other.
//                         Our platform connects individuals seeking health improvement with supportive communities,
//                         expert resources, and personalized guidance—creating a circle of care that empowers
//                         everyone to thrive.
//                     </p>
//                 </div>
//             </div>

//             {/* Value Proposition Cards */}
//             <div className="w-full px-4 md:px-12 pb-20 bg-gray-50">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//                     <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
//                         <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-600 mx-auto mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Vision</h3>
//                         <p className="text-gray-600 leading-relaxed flex-grow">
//                             A world where everyone has access to supportive communities and resources
//                             that empower them to achieve optimal health and wellbeing, regardless of
//                             their background or circumstances.
//                         </p>
//                     </div>

//                     <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
//                         <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-600 mx-auto mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Mission</h3>
//                         <p className="text-gray-600 leading-relaxed flex-grow">
//                             To create meaningful connections between individuals and communities that foster
//                             growth, healing, and transformation. We build bridges between those seeking help
//                             and those ready to provide it.
//                         </p>
//                     </div>

//                     <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
//                         <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-600 mx-auto mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Values</h3>
//                         <p className="text-gray-600 leading-relaxed flex-grow">
//                             Compassion guides our interactions. Integrity builds our trust. Innovation drives
//                             our solutions. Inclusivity shapes our community. Together, these values create a
//                             foundation for authentic wellness.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Features Section with Curved Background */}
//             <div className="w-full py-16 px-4 md:px-8 bg-teal-50 relative overflow-hidden">
//                 <div className="absolute top-0 left-0 w-full h-24 bg-white" style={{ borderRadius: '0 0 50% 50%/0 0 100% 100%' }}></div>
//                 <div className="max-w-5xl mx-auto pt-12">
//                     <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">How Questify Works</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                         <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
//                             <div className="flex-shrink-0 bg-teal-100 text-teal-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">1</div>
//                             <div>
//                                 <h3 className="text-xl font-semibold mb-2">Join Supportive Communities</h3>
//                                 <p className="text-gray-600">Connect with like-minded individuals who share your health goals and challenges.</p>
//                             </div>
//                         </div>

//                         <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
//                             <div className="flex-shrink-0 bg-teal-100 text-teal-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">2</div>
//                             <div>
//                                 <h3 className="text-xl font-semibold mb-2">Access Expert Resources</h3>
//                                 <p className="text-gray-600">Explore our library of evidence-based articles, videos, and tools curated by health professionals.</p>
//                             </div>
//                         </div>

//                         <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
//                             <div className="flex-shrink-0 bg-teal-100 text-teal-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">3</div>
//                             <div>
//                                 <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
//                                 <p className="text-gray-600">Use our intuitive tools to monitor your wellness journey and celebrate your achievements.</p>
//                             </div>
//                         </div>

//                         <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
//                             <div className="flex-shrink-0 bg-teal-100 text-teal-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">4</div>
//                             <div>
//                                 <h3 className="text-xl font-semibold mb-2">Give and Receive Support</h3>
//                                 <p className="text-gray-600">Share your experiences and insights while benefiting from the wisdom of others.</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="text-center mt-16">
//                         <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
//                             Get Started Today
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Testimonials Section with Wave Separator */}
//             <div className="w-full py-16 px-4 md:px-8 bg-white relative">
//                 <div className="absolute bottom-full left-0 right-0">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
//                         <path fill="#e6fcf5" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
//                     </svg>
//                 </div>
                
//                 <div className="max-w-4xl mx-auto">
//                     <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">What Our Community Says</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <div className="p-8 rounded-lg bg-gray-50 text-left relative shadow-md">
//                             <div className="absolute -top-4 -left-4 text-5xl text-teal-200">"</div>
//                             <p className="text-gray-600 italic mb-6 pt-4">Questify changed my approach to health completely. The supportive community and resources helped me achieve goals I thought were impossible.</p>
//                             <div className="flex items-center">
//                                 <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold mr-4">SM</div>
//                                 <p className="font-medium text-gray-800">Sarah M.</p>
//                             </div>
//                         </div>

//                         <div className="p-8 rounded-lg bg-gray-50 text-left relative shadow-md">
//                             <div className="absolute -top-4 -left-4 text-5xl text-teal-200">"</div>
//                             <p className="text-gray-600 italic mb-6 pt-4">I've tried many wellness platforms, but the genuine connections and expert guidance at Questify made all the difference in my journey.</p>
//                             <div className="flex items-center">
//                                 <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold mr-4">MT</div>
//                                 <p className="font-medium text-gray-800">Michael T.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Call to Action with Gradient Background */}
//             <div className="w-full py-16 px-4 md:px-8 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
//                 <div className="max-w-4xl mx-auto text-center relative">
//                     {/* Decorative circles */}
//                     <div className="absolute top-0 left-0 h-16 w-16 rounded-full bg-white opacity-10"></div>
//                     <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-white opacity-10"></div>
//                     <div className="absolute top-1/2 right-1/4 h-8 w-8 rounded-full bg-white opacity-10"></div>
                    
//                     <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Wellness Journey Today</h2>
//                     <p className="text-xl mb-8">Join thousands who have transformed their lives through connection and support.</p>
//                     <button className="bg-white text-teal-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
//                         Join Questify Now
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePageNew;

// import React from "react";
// import homePic from "../../../images/homePic.jpg";

// const HomePageNew = () => {
//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Hero Section with Overlay */}
//             <div className="relative w-full h-[70vh]">
//                 <div
//                     className="absolute inset-0 bg-cover bg-center"
//                     style={{ backgroundImage: "url('/images/wellness-background.jpg')" }}
//                 ></div>
//                 <div className="absolute inset-0 bg-black/40"></div>
//                 <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
//                     <img
//                         className="h-28 md:h-32 mb-4"
//                         src="/images/logo.png"
//                         alt="Questify Logo"
//                     />
//                     <h1 className="text-3xl md:text-5xl font-bold mb-2">Questify</h1>
//                     <p className="text-xl md:text-2xl mb-6">Where wellbeing begins, together</p>
//                     <div className="mt-8">
//                         <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-full shadow-lg transition duration-300 mr-4">
//                             Join Our Community
//                         </button>
//                         <button className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-medium py-3 px-6 rounded-full transition duration-300">
//                             Learn More
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Motto Section */}
//             <div className="w-full py-16 px-4 md:px-8 bg-white">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Purpose</h2>
//                     <p className="text-xl md:text-2xl text-teal-600 font-medium mb-6">
//                         "Nurturing health through community, compassion, and care"
//                     </p>
//                     <p className="text-gray-700 text-lg leading-relaxed mb-10">
//                         At Questify, we believe that true wellness emerges when we support each other.
//                         Our platform connects individuals seeking health improvement with supportive communities,
//                         expert resources, and personalized guidance—creating a circle of care that empowers
//                         everyone to thrive.
//                     </p>
//                 </div>
//             </div>

//             {/* Value Proposition Cards */}
//             <div className="w-full px-4 md:px-12 pb-20 bg-gray-50">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//                     <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
//                         <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-600 mx-auto mb-6">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Vision</h3>
//                         <p className="text-gray-600 leading-relaxed flex-grow">
//                             A world where everyone has access to supportive communities and resources
//                             that empower them to achieve optimal health and wellbeing, regardless of
//                             their background or circumstances.
//                         </p>
//                     </div>

//                     <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
//                         <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-600 mx-auto mb-6">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Mission</h3>
//                         <p className="text-gray-600 leading-relaxed flex-grow">
//                             To create meaningful connections between individuals and communities that foster
//                             growth, healing, and transformation. We build bridges between those seeking help
//                             and those ready to provide it.
//                         </p>
//                     </div>

//                     <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
//                         <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-600 mx-auto mb-6">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Values</h3>
//                         <p className="text-gray-600 leading-relaxed flex-grow">
//                             Compassion guides our interactions. Integrity builds our trust. Innovation drives
//                             our solutions. Inclusivity shapes our community. Together, these values create a
//                             foundation for authentic wellness.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Features Section */}
//             <div className="w-full py-16 px-4 md:px-8 bg-teal-50">
//                 <div className="max-w-5xl mx-auto">
//                     <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">How Questify Works</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                         <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//                             <div className="flex-shrink-0 bg-teal-100 text-teal-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">1</div>
//                             <div>
//                                 <h3 className="text-xl font-semibold mb-2">Join Supportive Communities</h3>
//                                 <p className="text-gray-600">Connect with like-minded individuals who share your health goals and challenges.</p>
//                             </div>
//                         </div>

//                         <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//                             <div className="flex-shrink-0 bg-teal-100 text-teal-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">2</div>
//                             <div>
//                                 <h3 className="text-xl font-semibold mb-2">Access Expert Resources</h3>
//                                 <p className="text-gray-600">Explore our library of evidence-based articles, videos, and tools curated by health professionals.</p>
//                             </div>
//                         </div>

//                         <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//                             <div className="flex-shrink-0 bg-teal-100 text-teal-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">3</div>
//                             <div>
//                                 <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
//                                 <p className="text-gray-600">Use our intuitive tools to monitor your wellness journey and celebrate your achievements.</p>
//                             </div>
//                         </div>

//                         <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//                             <div className="flex-shrink-0 bg-teal-100 text-teal-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">4</div>
//                             <div>
//                                 <h3 className="text-xl font-semibold mb-2">Give and Receive Support</h3>
//                                 <p className="text-gray-600">Share your experiences and insights while benefiting from the wisdom of others.</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="text-center mt-16">
//                         <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-full shadow-lg transition duration-300">
//                             Get Started Today
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Testimonials Section */}
//             <div className="w-full py-16 px-4 md:px-8 bg-white">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">What Our Community Says</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <div className="p-6 rounded-lg bg-gray-50 text-left">
//                             <p className="text-gray-600 italic mb-4">"Questify changed my approach to health completely. The supportive community and resources helped me achieve goals I thought were impossible."</p>
//                             <p className="font-medium text-gray-800">- Sarah M.</p>
//                         </div>

//                         <div className="p-6 rounded-lg bg-gray-50 text-left">
//                             <p className="text-gray-600 italic mb-4">"I've tried many wellness platforms, but the genuine connections and expert guidance at Questify made all the difference in my journey."</p>
//                             <p className="font-medium text-gray-800">- Michael T.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Call to Action */}
//             <div className="w-full py-16 px-4 md:px-8 bg-teal-600 text-white">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Wellness Journey Today</h2>
//                     <p className="text-xl mb-8">Join thousands who have transformed their lives through connection and support.</p>
//                     <button className="bg-white text-teal-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
//                         Join Questify Now
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePageNew;


// import React from "react";

// const HomePageNew = () => {
//     return (
//         <div>
//             <div className="bg-[url('https://wallpapercave.com/wp/wp4286513.jpg')] bg-cover bg-center w-full h-[60vh] flex flex-col items-center brightness-75">
//                 <div className="flex flex-col items-center">
//                     <img
//                         className="h-[50%]"
//                         src="http://localhost:5173/images/logo.png"
//                         alt="logo"
//                     />
//                     <div className="w-full h-auto flex flex-col items-center justify-center translate transform translate-y-[-2rem]">
//                         <div className="text-2xl">Welcome to</div>
//                         <div className="text-4xl pb-4">Questify</div>
//                         <div>Where well being begins, together</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="w-full h-auto">
//                 <div className="pt-20 flex flex-col justify-center items-center pb-10">
//                     <div className="text-3xl pb-3 font-bold tracking-wider">
//                         Our Motto
//                     </div>
//                     <div className="text-xl pb-2">
//                         "Lorem ipsum, dolor sit amet consectetur adipisicing elit."
//                     </div>
//                     <div className="w-1/2">
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Error omnis
//                         quam ex quis? Placeat officia iusto temporibus laborum, hic ab quo
//                         minima quidem ex perferendis labore tempore laboriosam aperiam qui?
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-3 grid-rows-[400px] gap-20 text-center w-full px-10 pb-5 ">
//                     <div className="p-4 rounded-lg bg-white shadow-md tracking-wider flex-col flex justify-center">
//                         <div className="text-2xl pb-10 ">Our Vision</div>
//                         <div>
//                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
//                             accusamus impedit nihil, expedita voluptates perspiciatis.
//                         </div>
//                     </div>
//                     <div className="p-4 rounded-lg bg-white shadow-md tracking-wider flex-col flex justify-center">
//                         <div className="text-2xl pb-10">Our Mission</div>
//                         <div>
//                             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
//                             sed consequatur optio, repudiandae aspernatur veritatis.
//                         </div>
//                     </div>
//                     <div className="p-4 rounded-lg bg-white shadow-md tracking-wider flex-col flex justify-center">
//                         <div className="text-2xl pb-10">Our Values</div>
//                         <div>
//                             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
//                             accusantium, impedit neque hic quidem repudiandae.
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePageNew;
