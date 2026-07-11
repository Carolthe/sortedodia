import { Zap, Clock3, Headphones } from "lucide-react";

const items = [
  {
    icon: Zap,
    title: "PIX Instantâneo",
    description: "Recebimento na hora",
  },
  {
    icon: Clock3,
    title: "Resultados ao vivo",
    description: "Acompanhe em tempo real",
  },
  {
    icon: Headphones,
    title: "Atendimento 24h",
    description: "Suporte sempre online",
  },
];

export default function Benefits() {
  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col divide-y divide-gray-200 rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:flex-row md:divide-x md:divide-y-0">
        {items.map(({ icon: Icon, title, description }, index) => (
          <div
            key={index}
            className="flex flex-1 items-center gap-4 py-4 md:px-6 md:py-0"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <Icon className="h-7 w-7 text-blue-700" strokeWidth={2.3} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}