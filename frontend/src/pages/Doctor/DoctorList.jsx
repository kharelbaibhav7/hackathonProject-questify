import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Users, Stethoscope } from 'lucide-react';
import img1 from "../../../images/doctors/1.jpeg";
import img2 from "../../../images/doctors/2.png";
import img3 from "../../../images/doctors/3.png";
import img4 from "../../../images/doctors/4.jpg";
import img5 from "../../../images/doctors/5.jpg";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const images = [img1, img2, img3, img4, img5];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8000/api/doctors');
                setDoctors(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                setError('Error fetching doctors');
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-screen-xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Our Specialists</h1>
                    <div className="w-24 h-1 bg-teal-600 mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Meet our team of experienced healthcare professionals dedicated to providing you with the best care.
                    </p>

                    {/* Add Specialist Button */}

                </div>

                {/* Statistics */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <Users className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">{doctors.length}</div>
                        <div className="text-gray-600">Total Specialists</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <Stethoscope className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">
                            {[...new Set(doctors.map(d => d.speciality))].length}
                        </div>
                        <div className="text-gray-600">Specialties</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-white font-bold">✓</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-800">Verified</div>
                        <div className="text-gray-600"></div>
                    </div> */}
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {doctors.map((doctor, index) => {
                        const doctorImage = images[index % images.length];
                        return (
                            <motion.div
                                key={doctor._id}
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <Link to={`/doctors/${doctor._id}?index=${index}`} className="block">
                                    <div className="h-64 bg-teal-50 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={doctor.image ? `http://localhost:8000${doctor.image}` : doctorImage}
                                            alt={doctor.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center mb-3">
                                            <span className="inline-block px-3 py-1 text-xs font-semibold text-teal-600 bg-teal-100 rounded-full">
                                                {doctor.speciality}
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h2>

                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {doctor.bio || "Experienced healthcare professional specializing in providing personalized patient care."}
                                        </p>

                                        {doctor.qualification && (
                                            <div className="text-sm text-gray-500 mb-2">
                                                <span className="font-semibold">Qualification:</span> {doctor.qualification}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                                <svg className="w-4 h-4 text-yellow-400 fill-current ml-1" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                                <svg className="w-4 h-4 text-yellow-400 fill-current ml-1" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                                <svg className="w-4 h-4 text-yellow-400 fill-current ml-1" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                                <svg className="w-4 h-4 text-gray-300 fill-current ml-1" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                                <span className="ml-2 text-sm text-gray-600">4.0</span>
                                            </div>

                                            <span className="text-sm font-medium text-teal-600 hover:text-teal-800">
                                                View Profile →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {doctors.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No specialists found. Please check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorList;





// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import img1 from "../../../images/doctors/1.jpeg";
// import img2 from "../../../images/doctors/2.png";
// import img3 from "../../../images/doctors/3.png";
// import img4 from "../../../images/doctors/4.jpg";
// import img5 from "../../../images/doctors/5.jpg";

// const DoctorList = () => {
//     const [doctors, setDoctors] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Array of local images
//     const images = [img1, img2, img3, img4, img5];

//     // Fetch doctor data from API
//     useEffect(() => {
//         const fetchDoctors = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get('http://localhost:8000/api/doctors');
//                 setDoctors(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching doctors:', error);
//                 setError('Error fetching doctors');
//                 setLoading(false);
//             }
//         };
//         fetchDoctors();
//     }, []);

//     if (loading) {
//         return (
//             <div className="container mx-auto p-4 flex justify-center items-center h-64">
//                 <div className="animate-pulse flex space-x-4">
//                     <div className="rounded-full bg-gray-300 h-12 w-12"></div>
//                     <div className="flex-1 space-y-4 py-1">
//                         <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//                         <div className="h-4 bg-gray-300 rounded"></div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container mx-auto p-4 text-center">
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                     <p className="font-bold">Error</p>
//                     <p>{error}</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-gray-50 py-12">
//             {/* Added max-w-screen-xl and extra px classes for more side spacing */}
//             <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-screen-xl">
//                 <div className="text-center mb-12">
//                     <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Our Specialists</h1>
//                     <div className="w-24 h-1 bg-teal-600 mx-auto"></div>
//                     <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//                         Meet our team of experienced healthcare professionals dedicated to providing you with the best care.
//                     </p>
//                 </div>

//                 {/* Added more gap between cards and updated grid for better spacing */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
//                     {doctors.map((doctor, index) => {
//                         // Get image based on index
//                         const doctorImage = images[index % images.length];

//                         return (
//                             <motion.div
//                                 key={doctor._id}
//                                 whileHover={{ y: -8 }}
//                                 transition={{ type: "spring", stiffness: 300 }}
//                                 className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
//                             >
//                                 <Link to={`/doctors/${doctor._id}`} className="block">
//                                     <div className="h-64 bg-teal-50 flex items-center justify-center overflow-hidden">
//                                         <img
//                                             src={doctorImage}
//                                             alt={doctor.name}
//                                             className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                                         />
//                                     </div>

//                                     <div className="p-6">
//                                         <div className="flex items-center mb-3">
//                                             <span className="inline-block px-3 py-1 text-xs font-semibold text-teal-600 bg-teal-100 rounded-full">
//                                                 {doctor.speciality}
//                                             </span>
//                                         </div>

//                                         <h2 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h2>

//                                         <p className="text-gray-600 mb-4 line-clamp-2">
//                                             {doctor.bio || "Experienced healthcare professional specializing in providing personalized patient care."}
//                                         </p>

//                                         <div className="flex items-center justify-between mt-4">
//                                             <div className="flex items-center">
//                                                 <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
//                                                     <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//                                                 </svg>
//                                                 <svg className="w-4 h-4 text-yellow-400 fill-current ml-1" viewBox="0 0 20 20">
//                                                     <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//                                                 </svg>
//                                                 <svg className="w-4 h-4 text-yellow-400 fill-current ml-1" viewBox="0 0 20 20">
//                                                     <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//                                                 </svg>
//                                                 <svg className="w-4 h-4 text-yellow-400 fill-current ml-1" viewBox="0 0 20 20">
//                                                     <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//                                                 </svg>
//                                                 <svg className="w-4 h-4 text-gray-300 fill-current ml-1" viewBox="0 0 20 20">
//                                                     <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//                                                 </svg>
//                                                 <span className="ml-2 text-sm text-gray-600">4.0</span>
//                                             </div>

//                                             <span className="text-sm font-medium text-teal-600 hover:text-teal-800">
//                                                 View Profile →
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             </motion.div>
//                         );
//                     })}
//                 </div>

//                 {doctors.length === 0 && !loading && (
//                     <div className="text-center py-12">
//                         <p className="text-gray-600">No specialists found. Please check back later.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DoctorList;
