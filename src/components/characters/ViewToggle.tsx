"use client";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
  view: ViewMode;
  onChange: (v: ViewMode) => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1 border border-gray-700">
      <button
        onClick={() => onChange("grid")}
        title="Grid view"
        className={`p-2 rounded-md transition-colors ${
          view === "grid"
            ? "bg-green-500/20 text-green-400"
            : "text-gray-400 hover:text-white"
        }`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
        </svg>
      </button>
      <button
        onClick={() => onChange("list")}
        title="List view"
        className={`p-2 rounded-md transition-colors ${
          view === "list"
            ? "bg-green-500/20 text-green-400"
            : "text-gray-400 hover:text-white"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
}
