import { useState } from "react";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

type CopyIconButtonProps = {
  text: string;
  children?: React.ReactNode;
};

export const CopyIconButton = ({ text, children }: CopyIconButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded group cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-slate-300 group-hover:text-violet-400 transition-colors">
          {children}
        </span>
        <div className="relative w-5 h-5">
          <ClipboardDocumentIcon
            className={`absolute inset-0 h-4 w-4 text-slate-300 group-hover:text-violet-400 transition-all duration-200 ${
              copied ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}
          />
          <ClipboardDocumentCheckIcon
            className={`absolute inset-0 h-4 w-4 text-green-600 transition-all duration-200 ${
              copied ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          />
        </div>
      </div>
    </button>
  );
};
