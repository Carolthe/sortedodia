import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Carousel() {
  const [current, setCurrent] = useState(0)
  const startX = useRef(0)
  const timeoutRef = useRef(null)

  const images = [
    "https://res.cloudinary.com/do4p13i1a/image/upload/v1779991972/bannergrupo_a1knzs.png",
    "https://res.cloudinary.com/do4p13i1a/image/upload/v1779993687/bannermilhar_rdbqqm.png",
    "https://res.cloudinary.com/do4p13i1a/image/upload/v1780653713/rc_gtq4lh.png",
  ]

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Autoplay
  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 5000)
    return () => clearTimeout(timeoutRef.current)
  }, [current])

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX
    if (startX.current - endX > 50) nextSlide()
    if (endX - startX.current > 50) prevSlide()
  }

  return (
    <div className="w-[96%] max-w-7xl mx-auto mt-4">
      <div
        className="relative overflow-hidden rounded-2xl shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-[160px] sm:h-[260px] object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Setas */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#062272] rounded-full p-2 shadow-md transition"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#062272] rounded-full p-2 shadow-md transition"
          aria-label="Próximo"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Pontinhos */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all ${
              current === index
                ? "bg-[#062272] w-6"
                : "bg-gray-300 w-1.5"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}