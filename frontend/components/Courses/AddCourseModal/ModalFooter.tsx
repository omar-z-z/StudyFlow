import { Step } from "@/types/modal";

type ModalFooterProps = {
  step: Step;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

const ModalFooter = ({ step, onClose, onBack, onNext, onSubmit }: ModalFooterProps) => (
  <div className="flex justify-between gap-3 mt-8 shrink-0 pt-4 border-t border-border">
    {step === 0 ? (
      <button
        onClick={onClose}
        className="px-4 py-2 bg-transparent border border-border rounded-(--radius) text-sm font-medium text-foreground cursor-pointer transition-colors duration-150 hover:bg-accent"
      >
        Cancel
      </button>
    ) : (
      <button
        onClick={onBack}
        className="px-4 py-2 bg-transparent border border-border rounded-(--radius) text-sm font-medium text-foreground cursor-pointer transition-colors duration-150 hover:bg-accent"
      >
        ← Back
      </button>
    )}

    {step < 2 ? (
      <button
        onClick={onNext}
        className="px-4 py-2 bg-primary text-primary-foreground border-none rounded-(--radius) text-sm font-medium cursor-pointer transition-opacity duration-150 hover:opacity-90"
      >
        Next →
      </button>
    ) : (
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-primary text-primary-foreground border-none rounded-(--radius) text-sm font-medium cursor-pointer transition-opacity duration-150 hover:opacity-90"
      >
        Add Course
      </button>
    )}
  </div>
);

export default ModalFooter;