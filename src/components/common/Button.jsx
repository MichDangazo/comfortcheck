import { useState } from "react";

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
      className={`btn btn-${variant} btn-${size} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
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