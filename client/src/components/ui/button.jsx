// src/components/ui/button.jsx
export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
