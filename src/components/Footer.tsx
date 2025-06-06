"use client";
import { ClipboardCopy } from "lucide-react";

const Footer = () => {
  const address = "0x97f3bc260d156f807b936c778c68a5c975c3a24e";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    alert("Wallet address copied to clipboard!");
  };

  return (
    <footer className="mt-12 p-4 border-t border-gray-700 text-center text-sm text-gray-400">
      <div className="flex items-center justify-center gap-2">
        <span className="truncate max-w-[220px]">{address}</span>
        <button
          onClick={handleCopy}
          className="text-blue-400 hover:text-blue-500 transition"
          aria-label="Copy wallet address"
        >
          <ClipboardCopy size={18} />
        </button>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Like the project? Tips appreciated 💸
      </p>
      <p className="mt-2 text-xs text-gray-500">
        Built with 💙 by Saber
      </p>
    </footer>
  );
};

export default Footer;
