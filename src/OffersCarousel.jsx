import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";


const carOffers = [
  {
    name: "Hyundai Verna",
    price: "₹50,000*",
    image: "https://bharathyundai.com/wp-content/uploads/2024/05/1679903528.png",
  },
  {
    name: "Hyundai Venue",
    price: "₹55,000*",
    image: "https://bharathyundai.com/wp-content/uploads/2024/05/1662110515.png",
  },
  {
    name: "Hyundai I20",
    price: "₹50,000*",
    image: "https://bharathyundai.com/wp-content/uploads/2024/05/1656409788.png",
  },
  {
    name: "Hyundai I20 N Line",
    price: "₹45,000*",
    image: "https://bharathyundai.com/wp-content/uploads/2024/05/1665133996.png",
  },
  {
    name: "Hyundai Verna",
    price: "₹50,000*",
    image: "https://bharathyundai.com/wp-content/uploads/2024/05/1679903528.png",
  },
  {
    name: "Hyundai Venue",
    price: "₹55,000*",
    image: "https://bharathyundai.com/wp-content/uploads/2024/05/1662110515.png",
  },
  {
    name: "Hyundai I20",
    price: "₹50,000*",
    image: "https://bharathyundai.com/wp-content/uploads/2024/05/1656409788.png",
  },
  {
    name: "Hyundai I20 N Line",
    price: "₹45,000*",
    image: "https://bharathyundai.com/wp-content/uploads/2024/05/1665133996.png",
  },
];

function OffersCarousel() {
  return (
    <div className="bg-[#392e2e] text-white py-8">
      <h2 className="text-center text-3xl font-bold mb-6">Our Exclusive Offers</h2>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Previous Button */}
        <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full cursor-pointer hover:bg-gray-700">
          ❮
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {carOffers.map((car, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl shadow-xl p-5 relative hover:scale-105 transition-transform">
                <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                  OFFER
                </div>
                <img
                  src={car.image}
                  alt={car.name}
                  width={350}
                  height={250}
                  className="w-full rounded-lg"
                  priority
                />
                <h3 className="text-blue-900 text-xl font-semibold mt-4">{car.name}</h3>
                <p className="text-red-600 text-lg font-bold">
                  <span className="text-black text-md">Save up to:</span> {car.price}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next Button */}
        <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white p-3 rounded-full cursor-pointer hover:bg-gray-700">
          ❯
        </button>
      </div>

      <p className="text-end text-sm text-gray-400 mt-3">*TnC apply</p>
    </div>
  );
}

export default OffersCarousel



