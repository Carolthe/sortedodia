import { useState } from "react"

export default function Carousel() {
  const [current, setCurrent] = useState(0)

  const images = [
    "https://res.cloudinary.com/do4p13i1a/image/upload/v1779991972/bannergrupo_a1knzs.png",
    "https://res.cloudinary.com/do4p13i1a/image/upload/v1779993687/bannermilhar_rdbqqm.png",
    "https://res.cloudinary.com/do4p13i1a/image/upload/v1780653713/rc_gtq4lh.png",
  ]

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  let startX = 0

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX

    if (startX - endX > 50) {
      nextSlide()
    }

    if (endX - startX > 50) {
      prevSlide()
    }
  }

  return (
    <div className="w-[98%] mx-auto mt-[10px]">
      <div
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-[200px] object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Pontinhos */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-1 h-1 rounded-full transition-all ${
              current === index
                ? "bg-[#062272] scale-125"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}