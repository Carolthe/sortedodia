export default function CardSelect({
  label,
  name,
  value,
  onChange,
  options,
  className,
}) {
  return (
    <div className="w-full overflow-hidden">
      <label className="mb-1.5 block text-[16px] font-medium text-slate-700">
        {label}
      </label>

      <div className="relative w-full overflow-hidden">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={className}
        >
          <option value="">Selecione</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}