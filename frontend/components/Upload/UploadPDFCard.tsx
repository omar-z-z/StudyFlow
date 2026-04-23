"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { UploadIcon } from "../basicComponents/icons";

interface UploadPDFCardProps {
  onFileSelect: (file: File) => void;
  onClear: () => void;
}

const UploadPDFCard = ({ onFileSelect, onClear }: UploadPDFCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleClear = () => {
    setSelectedFileName(null);
    if (inputRef.current) inputRef.current.value = "";
    onClear();
  };

  return (
    <div className="flex-1 min-w-0 border border-border rounded-(--radius-lg) bg-card p-4 flex flex-col gap-5">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !selectedFileName && inputRef.current?.click()} // ← Don't open picker if file already chosen
        className={`
          flex flex-col items-center justify-center gap-3 py-5 px-4 rounded-(--radius-md)
          border-2 border-dashed transition-colors duration-150
          ${selectedFileName
            ? "border-border cursor-default"  // ← No pointer cursor when file is selected
            : isDragging
              ? "border-foreground bg-accent cursor-pointer"
              : "border-border hover:border-muted-foreground hover:bg-accent cursor-pointer"
          }
        `}
      >
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <UploadIcon />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            {selectedFileName ?? "Upload PDF"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {selectedFileName
              ? "File selected ✓"
              : "Drop your syllabus PDF here or click to browse"}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {selectedFileName ? (
        <button
          onClick={handleClear}
          className="w-full py-2 px-4 text-sm font-medium text-destructive border border-destructive/40 rounded-(--radius) bg-background hover:bg-destructive/10 transition-colors duration-150 cursor-pointer"
        >
          Remove File
        </button>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full py-2 px-4 text-sm font-medium text-foreground border border-border rounded-(--radius) bg-background hover:bg-accent transition-colors duration-150 cursor-pointer"
        >
          Choose File
        </button>
      )}
    </div>
  );
};

export default UploadPDFCard;