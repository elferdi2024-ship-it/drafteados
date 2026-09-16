interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="font-title text-xl text-[#F5F5F5] tracking-wide">
          {current}/{total} PICKS
        </span>
        <span className="text-xs text-[#8B8B8B] font-medium">
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="h-2 w-full bg-[#181818] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#FF5A1F] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
