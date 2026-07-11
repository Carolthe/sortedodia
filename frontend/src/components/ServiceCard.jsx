import { ArrowRight } from "lucide-react";

export default function ServiceCard({
  title,
  description,
  icon,
  iconBg,
}) {
  return (
    
    <button
      className="
        group
        w-[45%]
        rounded-2xl
        border border-gray-100
        bg-white
        px-5
        py-4
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        text-left
        mb-[15px]
        ml-[15px]
      "
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${iconBg}`}
      >
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-gray-800">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

      <div className="mt-4 flex justify-end">
        <ArrowRight className="w-5 h-5 text-blue-600 transition-transform group-hover:translate-x-1" />
      </div>
    </button>
  );
}