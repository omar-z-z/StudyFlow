import { Button } from "./button";

type Props = {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog = ({
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: Props) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    />
    <div className="relative bg-card border border-border rounded-(--radius-xl) p-6 w-full max-w-sm shadow-xl">
      <h2 className="text-base font-semibold text-foreground mb-1">{title}</h2>
      <p className="text-sm text-muted-foreground mb-5">{message}</p>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button variant="destructive" onClick={onCancel}>{confirmLabel}</Button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;