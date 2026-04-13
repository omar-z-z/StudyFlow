import { STEPS } from "@/lib/constants/courseModal";
import { Step } from "@/types/modal";

const StepIndicator = ({ current }: { current: Step }) => (
  <div className="flex items-center gap-0 mb-7">
    {STEPS.map((label, index) => {
      const done   = index < current;
      const active = index === current;

      return (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-200 ${
                done
                  ? "bg-primary text-primary-foreground"
                  : active
                  ? "bg-primary/15 text-primary border-2 border-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span
              className={`text-[0.6rem] font-medium whitespace-nowrap ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>

          {index < STEPS.length - 1 && (
            <div
              className={`h-px w-10 mx-1 mb-4 transition-colors duration-300 ${
                done ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default StepIndicator;