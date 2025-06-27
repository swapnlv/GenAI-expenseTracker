// components/Button.tsx
import React from "react";

interface ButtonProps {
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = "button",
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`mt-4 px-6 py-2 rounded-lg font-medium shadow transition duration-200 
        ${
          disabled
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
    >
      {children}
    </button>
  );
};

export default Button;
