
const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="my-3 mb-5">
      {/* Label Row */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-muted-foreground tracking-wide">
          Overall Progress
        </span>
        <span className="text-xs font-semibold text-foreground">{value}%</span>
      </div>

      {/* Track */}
      <div className="w-full h-[7px] bg-muted rounded-full overflow-hidden">
        {/* Fill */}
        <div
          className="h-full bg-primary rounded-full transition-[width] duration-500 ease-in-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;