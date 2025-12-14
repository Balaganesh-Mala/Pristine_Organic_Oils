import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import image1 from "../../assets/images/hero1.png";
import image2 from "../../assets/images/hero2.png";
import image3 from "../../assets/images/hero3.png";

import heroCard1 from "../../assets/images/heroCard1.png";
import heroCard2 from "../../assets/images/heroCard2.png";
import heroCard3 from "../../assets/images/heroCard3.png";
import heroCard4 from "../../assets/images/heroCard4.png";
import heroCard5 from "../../assets/images/heroCard5.png";
import heroCard6 from "../../assets/images/heroCard6.png";
import heroCard7 from "../../assets/images/heroCard7.png";

export default function Hero() {
  /* ================= HERO BACKGROUND SLIDES ================= */
  const slides = [
    {
      title: "Swift Logistics for Modern Businesses",
      subtitle:
        "Fast, reliable and powerful transport solutions for every industry.",
      image: image1,
    },
    {
      title: "Heavy Equipment Rental Made Easy",
      subtitle: "Top-quality machines with expert support when you need them.",
      image: image2,
    },
    {
      title: "Move Smarter with SLT Transport",
      subtitle: "Smart mobility, safe delivery and world-class operations.",
      image: image3,
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  /* ================= BOTTOM CARD CAROUSEL ================= */
  const cards = [
    { title: "Excavators", image: heroCard1 },
    { title: "JCB 3DX", image: heroCard2 },
    { title: "Wheel Loaders", image: heroCard3 },
    { title: "Cranes", image: heroCard4 },
    { title: "Forklifts", image: heroCard5 },
    { title: "Cranes", image: heroCard6 },
    { title: "Forklifts", image: heroCard7 },
  ];

  const [cardIndex, setCardIndex] = useState(0);

  // Auto rotate bottom cards
  useEffect(() => {
    const timer = setInterval(() => {
      setCardIndex((prev) => (prev + 1) % cards.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [cards.length]);

  const visibleCards = Array.from({ length: 7 }, (_, i) =>
    cards[(cardIndex + i) % cards.length]
  );

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/20" />

      {/* ================= CENTER TEXT ================= */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl">
          {/*slides[current].title*/}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl">
          {/*slides[current].subtitle*/}
        </p>
      </div>

      {/* ================= HERO DOTS ================= */}
      <div className="absolute bottom-36 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === i ? "bg-[#4DB7FF]" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* ================= BOTTOM U-SHAPED MOTION CARDS ================= */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center pointer-events-none">
        <div className="flex gap-6 items-end">
          <MotionCard img={visibleCards[6].image} size="sm" rotate={-6} />
          <MotionCard img={visibleCards[0].image} size="md" rotate={-6} />
          <MotionCard img={visibleCards[1].image} size="lg" rotate={-3} />
          <MotionCard img={visibleCards[2].image} size="xl" center />
          <MotionCard img={visibleCards[3].image} size="lg" rotate={3} />
          <MotionCard img={visibleCards[4].image} size="md" rotate={6} />
          <MotionCard img={visibleCards[5].image} size="sm" rotate={6} />
        </div>
      </div>
    </section>
  );
}


function MotionCard({ img, size, rotate = 0, center = false }) {
  const sizes = {
    sm: "w-[100px] h-[160px]",
    md: "w-[120px] h-[180px]",
    lg: "w-[140px] h-[200px]",
    xl: "w-[170px] h-[240px]",
  };

  return (
    <motion.div
      className={`pointer-events-auto ${sizes[size]}
        rounded-2xl overflow-hidden shadow-xl
        bg-white/10 backdrop-blur-lg border border-white/20`}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: center ? -10 : 0,
        scale: center ? 1.1 : 1,
        rotate,
      }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
      }}
      whileHover={{
        scale: 1.15,
        rotate: 0,
      }}
    >
      <motion.img
        src={img}
        className="w-full h-full object-cover"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
