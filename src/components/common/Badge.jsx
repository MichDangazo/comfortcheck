const variantStyles = {
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  danger: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
  default: "bg-gray-100 text-gray-800 border-gray-200",
};

const Badge = ({ 
  children, 
  variant = "default", 
  size = "md", 
  rounded = "full",
  className = "",
  ...props 
}) => {
  const sizeMap = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  const roundedMap = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium border
        ${variantStyles[variant]}
        ${sizeMap[size]}
        ${roundedMap[rounded]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;