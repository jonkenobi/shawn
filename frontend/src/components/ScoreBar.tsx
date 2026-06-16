interface Props {
  label: string;
  value: number; // 1–5
  color: string;
}

export function ScoreBar({ label, value, color }: Props) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-16 text-gray-500 shrink-0">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className={`h-2 w-5 rounded-full ${i <= value ? color : 'bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
}
