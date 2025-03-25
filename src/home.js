import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./lib/firebase";
import OffersCarousel from "./OffersCarousel";

import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Home,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CgSpinner } from "react-icons/cg";

const InterestForm = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    model: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitted(false);

    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile))
      newErrors.mobile = "Valid 10-digit mobile number is required";
    if (!form.model) newErrors.model = "Please select a car model";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email address";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Add a new document in collection "leads(table name)"
        await addDoc(collection(db, "leads"), {
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          model: form.model,
          timestamp: Timestamp.now(),
        });

        navigate("/thank-you");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 lg:px-16 py-3 bg-white/30 backdrop-blur-lg shadow-md">
        <Link to={"/"}>
          <img
            src={require("./images/logo.png")}
            className="h-12"
            alt="Hyundai Logo"
          />
        </Link>
        <a
          className="text-gray-900 text-lg font-semibold"
          href="tel:+917733888999"
        >
          📞 7733888999
        </a>
      </nav>

      <div className="relative w-full min-h-screen mt-14 md:mt-10 hidden md:block">
        <img
          src="https://bharath-hyundai-2-0-git-main-bharath-hyundais-projects.vercel.app/Banner.webp"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative w-full min-h-[50vh] mt-14 md:mt-10 md:hidden">
        <img
          src="https://bharath-hyundai-2-0-git-main-bharath-hyundais-projects.vercel.app/mobile-banner.webp"
          alt="Mobile Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full bg-white flex justify-center border md:top-2/3 lg:absolute lg:top-1/2 lg:left-72 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bg-white lg:p-6 lg:rounded-2xl lg:shadow-lg lg:w-[90%] lg:max-w-lg">
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md lg:max-w-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-black text-center pb-4">
            REGISTER YOUR INTEREST
          </h3>
          {!submitted && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2 border-b-2 border-black bg-transparent text-black text-center text-sm sm:text-base focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                disabled={loading}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-2 border-black bg-transparent text-black text-center text-sm sm:text-base focus:outline-none"
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs">{errors.mobile}</p>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email (optional)"
                value={form.email}
                disabled={loading}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-2 border-black bg-transparent text-black text-center text-sm sm:text-base focus:outline-none"
              />
              <select
                name="model"
                value={form.model}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2 border-b-2 border-black bg-transparent text-black text-center text-sm sm:text-base focus:outline-none"
              >
                <option value="">Select Model</option>
                <option value="I20">I20</option>
                <option value="GRAND I10 NIOS">GRAND I10 NIOS</option>
                <option value="AURA">AURA</option>
                <option value="VERNA">VERNA</option>
                <option value="ALCAZAR">ALCAZAR</option>
                <option value="TUCSON">TUCSON</option>
                <option value="CRETA N LINE">CRETA N LINE</option>
                <option value="EXTER">EXTER</option>
                <option value="VENUE N LINE">VENUE N LINE</option>
                <option value="CRETA">CRETA</option>
                <option value="CRETA ELECTRIC">CRETA ELECTRIC</option>
                <option value="IONIQ 5">IONIQ 5</option>
              </select>
              {errors.model && (
                <p className="text-red-500 text-xs">{errors.model}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm sm:text-base hover:bg-blue-700 transition duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <CgSpinner className="animate-spin h-5 mr-2 text-white w-5" />
                    Submitting...
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          )}
          <p className="text-xs text-gray-600 mt-3 text-center">
            *By clicking 'Submit', you agree to our Terms & Conditions.
          </p>
        </div>
      </div>
      <OffersCarousel />
      <CarShowcase />
      <FeaturesSection />
      <Footer />
    </>
  );
};

export default InterestForm;

const colors = [
  {
    name: "White",
    code: "#FFFFFF",
    img: "https://imgd.aeplcdn.com/600x337/n/g8ajt9b_1804861.jpg?q=80",
  },
  {
    name: "Black",
    code: "#000000",
    img: "https://imgd.aeplcdn.com/600x337/n/xacjt9b_1804863.jpg?q=80",
  },
  {
    name: "Gray",
    code: "#808080",
    img: "https://imgd.aeplcdn.com/600x337/n/xfq8t9b_1804851.jpg?q=80",
  },
  {
    name: "Blue",
    code: "#0033CC",
    img: "https://imgd.aeplcdn.com/600x337/n/08u8t9b_1804857.jpg?q=80",
  },
  {
    name: "Red",
    code: "#CC0000",
    img: "https://imgd.aeplcdn.com/600x337/n/28v8t9b_1804859.jpg?q=80",
  },
];

function CarShowcase() {
  const [selectedCar, setSelectedCar] = useState(colors[0]);

  return (
    <section className="bg-white px-6 sm:px-10 py-12 relative max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Hyundai CRETA Electric
          </h2>
          <p className="text-lg font-medium text-gray-700 mt-2">
            Undisputed. Ultimate. Now electric.
          </p>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto lg:mx-0">
            The iconic SUV, in its electric avatar, is here to take your driving
            experience to the next level. Building on the undisputed ultimate
            machine, the car seamlessly merges design, performance, technology,
            and style.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center lg:items-start">
            <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
              Brochure
            </button>
            <a href="#" className="text-blue-500 flex items-center text-lg">
              Register your Interest <span className="ml-2">→</span>
            </a>
          </div>
        </div>

        {/* Car Image Section */}
        <div className="relative lg:w-1/2 flex justify-center mt-10 lg:mt-0">
          {/* Background Color Block */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[420px] rounded-lg -z-10"
            style={{ backgroundColor: selectedCar.code }}
          ></div>

          {/* Car Image */}
          <img
            src={selectedCar.img}
            alt={`CRETA Electric - ${selectedCar.name}`}
            className="w-[85%] sm:w-[65%] lg:w-[90%] max-w-xs sm:max-w-md lg:max-w-lg relative z-10"
          />
        </div>
      </div>

      {/* Color Selection Dots */}
      <div className="mt-6 flex justify-center lg:justify-end lg:pl-4 space-x-3">
        {colors.map((car) => (
          <button
            key={car.name}
            className={`w-6 h-6 rounded-full border-2 transition-transform duration-200 focus:ring focus:ring-gray-300 ${
              selectedCar.name === car.name
                ? "border-black scale-110 ring-2 ring-black"
                : "border-gray-400"
            }`}
            style={{ backgroundColor: car.code }}
            onClick={() => setSelectedCar(car)}
            aria-label={`Select ${car.name} color`}
          ></button>
        ))}
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Address */}
        <div>
          <h2 className="text-xl font-bold">Bharat Hyundai</h2>
          <p className="mt-2 flex items-start gap-2">
            <Home className="w-5 h-5 mt-1" />
            <span>
              #3,4,5,6 Survey No 58/1, Gowliddodi, Gopanpally, Financial
              District, Gachibowli-500075
            </span>
          </p>
        </div>

        {/* Cars List */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Cars</h3>
          <ul className="space-y-2">
            {[
              "Hyundai Creta",
              "Hyundai Creta EV",
              "Hyundai i20",
              "Hyundai Verna",
              "Hyundai Venue",
            ].map((car, index) => (
              <li key={index} className="border-b pb-1">
                {car}
              </li>
            ))}
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h3 className="font-semibold text-lg mb-3">About Us</h3>
          <ul className="space-y-2">
            {[
              "About Bharat Hyundai Motors",
              "Gallery",
              "Testimonials",
              "Contact Us",
              "Career",
            ].map((item, index) => (
              <li key={index} className="border-b pb-1">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="space-y-8">
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-4 mb-3">
            <a
              href="https://www.facebook.com/BharatHyundaiTelangana"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6 cursor-pointer hover:text-gray-400" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-6 h-6 cursor-pointer hover:text-gray-400" />
            </a>
            <a
              href="https://www.linkedin.com/company/86301981/admin/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 cursor-pointer hover:text-gray-400" />
            </a>
            <a
              href="https://www.instagram.com/bharathyundai.telangana/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6 cursor-pointer hover:text-gray-400" />
            </a>
          </div>
          <p className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <a href="tel:+917733888999">7733888999</a>
          </p>
          <p className="flex items-center gap-2 mt-2">
            <Mail className="w-5 h-5" />
            <a
              className="hover:text-gray-400"
              href="mailto:info@bharathyundai.in"
            >
              info@bharathyundai.in
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
        <p>
          <a href="#" className="hover:text-gray-400">
            Terms & Conditions
          </a>{" "}
          |{" "}
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
        </p>
        <p className="mt-2">
          © 2025 All Rights Reserved by Bharat Hyundai Motors.
        </p>
        <p className="mt-1 text-gray-500">
          Powered by{" "}
          <a
            href="https://broaddcast.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="hover:text-red-500">
              BroaddCast Business Solutions LLP.
            </span>
          </a>
        </p>
      </div>
    </footer>
  );
};

const features = [
  {
    image: "https://cretaelectric.hyundai.co.in/assets/creta-DcM4ZZq5.jpg",
    title: "Driving range up to 473 km**",
    description:
      "Say goodbye to frequent charging stops! With a driving range of up to 473 km on a single full charge**, the CRETA Electric is built for those who crave uninterrupted adventures.",
  },
  {
    image: "https://cretaelectric.hyundai.co.in/assets/creta2-CtNK2RxL.jpg",
    title: "Pixelated graphic grille",
    description:
      "The Hyundai CRETA Electric sets a new benchmark in design with a pixelated graphic front-grille with integrated charging port and a pixelated graphic lower bumper.",
  },
  {
    image: "https://cretaelectric.hyundai.co.in/assets/creta7-DR7lee5y.jpg",
    title: "Active Air Flaps#",
    description:
      "The Active Air Flap (AAF) adds a flare in style and performance, optimizing airflow for cooling and enhanced aerodynamics.",
  },
  {
    image: "https://cretaelectric.hyundai.co.in/assets/creta3-DI0AVk7J.jpg",
    title: "Pixelated graphic rear bumper",
    description:
      "Complementing the front design, the pixelated graphic rear bumper, and the connected LED tail lamps offer an innovative and electrifying appearance.",
  },
  {
    image: "https://cretaelectric.hyundai.co.in/assets/creta8-CxR7ji2m.jpg",
    title: "R17 (D=436.6 mm) Aero Alloy wheels",
    description:
      "Equipped with R17 Aero Alloy Wheels with Low Rolling Resistance (LRR) tyres, the CRETA Electric enhances aerodynamic performance, contributing to improved range efficiency.",
  },
  {
    image: "https://cretaelectric.hyundai.co.in/assets/creta4-hp25Do38.jpg",
    title: "Fast home charging",
    description:
      "The Hyundai CRETA Electric can be charged from 10% to 80% in just 58 minutes*** (DC charging), while the 11kW Wall Box Home fast AC charger can achieve the same charge range in an impressive 4 hours*.",
  },
];

function FeaturesSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const swiperInstance = document.querySelector(".swiper").swiper;
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, []);

  return (
    <div className="py-10 px-5 md:px-20 bg-gray-100">
      <h2 className="text-2xl font-bold font-serif text-center mb-6 text-black">
        Features
      </h2>
      <div className="relative max-w-6xl mx-auto">
        {/* Custom Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          ref={nextRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Swiper Component */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-black">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{feature.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
