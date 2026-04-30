import { STEPS } from "@/lib/constants/uploadNextSteps";

const WhatHappensNext = () => {

  return (
    <div className="border border-border rounded-lg bg-muted/40 p-6 flex flex-col gap-3">
      <h3 className="text-sm font-medium text-foreground m-0">
        What happens next?
      </h3>

      <ul className="flex flex-col gap-2 m-0 p-0 list-none">
        {STEPS.map((step, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span
              className="text-foreground mt-px select-none"
              aria-hidden="true"
            >
              •
            </span>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatHappensNext;
