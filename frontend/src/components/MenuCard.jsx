import { Link } from "react-router-dom";

export default function MenuCard({ title, icon, color, link }) {
  return (
    <Link
      to={link}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 hover:-translate-y-2"
    >
      <div
        className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center text-white text-3xl mb-5 group-hover:scale-110 transition`}
      >
        {icon}
      </div>

      <h2 className="text-xl font-bold text-gray-800">{title}</h2>

      <p className="text-gray-500 mt-2">
        Clique para acessar
      </p>
    </Link>
  );
}