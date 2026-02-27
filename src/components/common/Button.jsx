import { useState } from "react";

const variantStyles = {
  primary: "bg-[#FF4B00] text-white hover:bg-[#e63f00] text-white",
  secondary: "bg-gray-600 hover:bg-gray-700 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
  ghost: "hover:bg-gray-100 text-gray-700",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md",
  onClick,
  disabled = false,
  className = "",
  showRipple = true,
  ...props 
}) => {
  const [ripple, setRipple] = useState(false);

  const handleClick = (e) => {
    if (showRipple) {
      setRipple(true);
      setTimeout(() => setRipple(false), 300);
    }
    onClick?.(e);
  };

  return (
    <button
      className={`
        relative overflow-hidden rounded-lg font-medium transition-all
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
      {ripple && (
        <span className="absolute inset-0 bg-white opacity-30 animate-ping" />
      )}
    </button>
  );
};

export default Button;