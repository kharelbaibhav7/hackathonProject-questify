import axios from "axios";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Award,
    Book,
    Calendar,
    Clock,
    MapPin
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
import img1 from "../../../images/doctors/1.jpeg";
import img2 from "../../../images/doctors/2.png";
import img3 from "../../../images/doctors/3.png";
import img4 from "../../../images/doctors/4.jpg";
import img5 from "../../../images/doctors/5.jpg";

const BookDoctor = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const index = parseInt(queryParams.get("index"), 10) || 0;

    const [doctor, setDoctor] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    // Define available times for appointments
    const availableTimes = [
        "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
    ];

    const images = [img1, img2, img3, img4, img5];
    const doctorImage = images[index % images.length];

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/doctors/${id}`);
                setDoctor(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
                setError("Error fetching doctor details");
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [id]);

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime) {
            toast.error("Please select both date and time");
            return;
        }

        try {
            await axios({
                method: "post",
                url: `http://localhost:8000/api/doctors/appoint/${id}`,
                data: {
                    date: selectedDate,
                    time: selectedTime,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            toast.success("Appointment booked successfully!");
            setSelectedDate("");
            setSelectedTime("");
        } catch (error) {
            console.error("Error booking appointment:", error);
            toast.error("Booking failed. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 font-medium">Error: {error}</div>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500 font-medium">No doctor found.</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-screen-xl">
                <Link
                    to="/doctors"
                    className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Specialists
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="lg:flex">
                        <div className="lg:w-1/2">
                            <div className="relative h-80 lg:h-full overflow-hidden bg-teal-50">
                                <motion.img
                                    src={doctorImage}
                                    alt={doctor.name || "Doctor"}
                                    className="w-full h-full object-cover object-center"
                                    initial={{ scale: 1.1, opacity: 0.8 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                    <div className="inline-block px-3 py-1 bg-teal-600 text-white text-sm font-semibold rounded-full mb-2">
                                        {doctor.speciality || "Specialist"}
                                    </div>
                                    <h1 className="text-white text-3xl font-bold">
                                        {doctor.name || "Doctor"}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 p-8">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    About {doctor.name || "Specialist"}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center">
                                        <Award className="text-teal-600 w-5 h-5 mr-2" />
                                        <div>
                                            <p className="text-sm text-gray-500">Qualification</p>
                                            <p className="font-medium">
                                                {doctor.qualification || "Medical Specialist"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <MapPin className="text-teal-600 w-5 h-5 mr-2" />
                                        <div>
                                            <p className="text-sm text-gray-500">Location</p>
                                            <p className="font-medium">
                                                {doctor.location || "Main Medical Center"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* <div className="flex items-center">
                                        <CircleDollarSign className="text-teal-600 w-5 h-5 mr-2" />
                                        <div>
                                            <p className="text-sm text-gray-500">Consultation Fee</p>
                                            <p className="font-medium">${doctor.fee || "150"}</p>
                                        </div>
                                    </div> */}

                                    {/* <div className="flex items-center">
                                        <Phone className="text-teal-600 w-5 h-5 mr-2" />
                                        <div>
                                            <p className="text-sm text-gray-500">Contact</p>
                                            <p className="font-medium">
                                                {doctor.number || "Contact Reception"}
                                            </p>
                                        </div>
                                    </div> */}
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        About
                                    </h3>
                                    <p className="text-gray-600">
                                        {doctor.bio || doctor.description ||
                                            `  ${doctor.name || "Specialist"} is a highly skilled medical professional with extensive experience in ${doctor.speciality || "their field"}. They are committed to providing exceptional patient care with a compassionate approach.`}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    Book an Appointment
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4 inline mr-1" /> Select Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            min={new Date().toISOString().split("T")[0]}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Clock className="w-4 h-4 inline mr-1" /> Select Time
                                        </label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            value={selectedTime}
                                            onChange={(e) => setSelectedTime(e.target.value)}
                                        >
                                            <option value="">Select a time</option>
                                            {availableTimes.map((time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBooking}
                                    disabled={!selectedDate || !selectedTime}
                                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center transition duration-300 ${!selectedDate || !selectedTime
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-teal-600 text-white hover:bg-teal-700"
                                        }`}
                                >
                                    <Book className="w-5 h-5 mr-2" /> Book Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDoctor;



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//     Book,
//     CircleDollarSign,
//     Phone,
//     Calendar,
//     Clock,
//     Award,
//     MapPin,
//     ArrowLeft,
// } from "lucide-react";
// import { toast } from "react-hot-toast";
// import img1 from "../../../images/doctors/1.jpeg";
// import img2 from "../../../images/doctors/2.png";
// import img3 from "../../../images/doctors/3.png";
// import img4 from "../../../images/doctors/4.jpg";
// import img5 from "../../../images/doctors/5.jpg";

// const BookDoctor = () => {
//     const { id } = useParams();
//     const [doctor, setDoctor] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [selectedDate, setSelectedDate] = useState("");
//     const [selectedTime, setSelectedTime] = useState("");

//     // Array of local images to use as fallback
//     const images = [img1, img2, img3, img4, img5];

//     // Get a deterministic image based on the doctor's ID
//     const getImageForDoctor = (doctorId) => {
//         // Create a simple hash from the ID string to get a consistent index
//         const idSum = doctorId
//             .split("")
//             .reduce((sum, char) => sum + char.charCodeAt(0), 0);
//         return images[idSum % images.length];
//     };

//     useEffect(() => {
//         const fetchDoctor = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(
//                     `http://localhost:8000/api/doctors/${id}`
//                 );
//                 setDoctor(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching doctor details:", error);
//                 setError("Error fetching doctor details");
//                 setLoading(false);
//             }
//         };

//         fetchDoctor();
//     }, [id]);

//     const handleBooking = async () => {
//         try {
//             let result = await axios({
//                 method: "post",
//                 url: `http://localhost:8000/api/doctors/appoint/${id}`,
//                 data: {
//                     date: selectedDate,
//                     time: selectedTime,
//                 },
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });

//             toast.success("Appointment booked successfully!");
//             setSelectedDate("");
//             setSelectedTime("");
//         } catch (error) {
//             console.error("Error booking appointment:", error);
//             toast.error("Booking failed. Please try again.");
//         }
//     };

//     if (loading) {
//         return (
//             <div className="container mx-auto p-6 max-w-4xl">
//                 <div className="bg-white rounded-xl shadow-md p-8">
//                     <div className="animate-pulse space-y-8">
//                         <div className="h-64 bg-gray-300 rounded-xl"></div>
//                         <div className="h-8 bg-gray-300 rounded w-3/4"></div>
//                         <div className="space-y-4">
//                             <div className="h-6 bg-gray-300 rounded w-1/2"></div>
//                             <div className="h-6 bg-gray-300 rounded w-2/3"></div>
//                             <div className="h-24 bg-gray-300 rounded"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container mx-auto p-6 max-w-4xl">
//                 <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
//                     <div className="flex items-center">
//                         <div className="text-red-500 font-bold text-xl">Error</div>
//                     </div>
//                     <div className="mt-2 text-red-600">{error}</div>
//                     <div className="mt-4">
//                         <Link
//                             to="/doctors"
//                             className="text-teal-600 hover:underline flex items-center"
//                         >
//                             <ArrowLeft className="w-4 h-4 mr-1" /> Back to Doctors
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (!doctor) {
//         return null;
//     }

//     // Use a local image if the server image path is invalid or missing
//     const doctorImage =
//         doctor.image && doctor.image.startsWith("/")
//             ? `http://localhost:8000${doctor.image}`
//             : getImageForDoctor(id);

//     // Available appointment times
//     const availableTimes = [
//         "09:00 AM",
//         "10:00 AM",
//         "11:00 AM",
//         "01:00 PM",
//         "02:00 PM",
//         "03:00 PM",
//         "04:00 PM",
//     ];

//     return (
//         <div className="bg-gray-50 py-12">
//             <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-screen-xl">
//                 <Link
//                     to="/doctors"
//                     className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6 transition-colors"
//                 >
//                     <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Specialists
//                 </Link>

//                 <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//                     <div className="lg:flex">
//                         {/* Doctor's image and info section */}
//                         <div className="lg:w-1/2">
//                             <div className="relative h-80 lg:h-full overflow-hidden bg-teal-50">
//                                 <motion.img
//                                     src={doctorImage}
//                                     alt={doctor.name || doctor.title}
//                                     className="w-full h-full object-cover object-center"
//                                     initial={{ scale: 1.1, opacity: 0.8 }}
//                                     animate={{ scale: 1, opacity: 1 }}
//                                     transition={{ duration: 0.6 }}
//                                 />
//                                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
//                                     <div className="inline-block px-3 py-1 bg-teal-600 text-white text-sm font-semibold rounded-full mb-2">
//                                         {doctor.speciality || "Specialist"}
//                                     </div>
//                                     <h1 className="text-white text-3xl font-bold">
//                                         {doctor.name || doctor.title}
//                                     </h1>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Doctor's details and booking section */}
//                         <div className="lg:w-1/2 p-8">
//                             <div className="mb-8">
//                                 <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                                     About Dr. {doctor.name || doctor.title}
//                                 </h2>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                                     <div className="flex items-center">
//                                         <Award className="text-teal-600 w-5 h-5 mr-2" />
//                                         <div>
//                                             <p className="text-sm text-gray-500">Qualification</p>
//                                             <p className="font-medium">
//                                                 {doctor.qualification || "Medical Specialist"}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center">
//                                         <MapPin className="text-teal-600 w-5 h-5 mr-2" />
//                                         <div>
//                                             <p className="text-sm text-gray-500">Location</p>
//                                             <p className="font-medium">
//                                                 {doctor.location || "Main Medical Center"}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center">
//                                         <CircleDollarSign className="text-teal-600 w-5 h-5 mr-2" />
//                                         <div>
//                                             <p className="text-sm text-gray-500">Consultation Fee</p>
//                                             <p className="font-medium">${doctor.fee || "150"}</p>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center">
//                                         <Phone className="text-teal-600 w-5 h-5 mr-2" />
//                                         <div>
//                                             <p className="text-sm text-gray-500">Contact</p>
//                                             <p className="font-medium">
//                                                 {doctor.number || "Contact Reception"}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="mb-6">
//                                     <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                                         About
//                                     </h3>
//                                     <p className="text-gray-600">
//                                         {doctor.description ||
//                                             `Dr. ${doctor.name || doctor.title
//                                             } is a highly skilled medical professional with extensive experience in ${doctor.speciality || "their field"
//                                             }. They are committed to providing exceptional patient care with a compassionate approach.`}
//                                     </p>
//                                 </div>
//                             </div>

//                             {/* Booking section */}
//                             <div className="bg-gray-50 p-6 rounded-xl">
//                                 <h3 className="text-xl font-bold text-gray-800 mb-4">
//                                     Book an Appointment
//                                 </h3>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                                     {/* Date selector */}
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             <Calendar className="w-4 h-4 inline mr-1" /> Select Date
//                                         </label>
//                                         <input
//                                             type="date"
//                                             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                                             value={selectedDate}
//                                             onChange={(e) => setSelectedDate(e.target.value)}
//                                             min={new Date().toISOString().split("T")[0]}
//                                         />
//                                     </div>

//                                     {/* Time selector */}
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             <Clock className="w-4 h-4 inline mr-1" /> Select Time
//                                         </label>
//                                         <select
//                                             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                                             value={selectedTime}
//                                             onChange={(e) => setSelectedTime(e.target.value)}
//                                         >
//                                             <option value="">Select a time</option>
//                                             {availableTimes.map((time) => (
//                                                 <option key={time} value={time}>
//                                                     {time}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>

//                                 <button
//                                     onClick={handleBooking}
//                                     className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300 flex items-center justify-center"
//                                 >
//                                     <Book className="w-5 h-5 mr-2" /> Book Appointment
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BookDoctor;


