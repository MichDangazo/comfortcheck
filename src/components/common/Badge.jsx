const Badge = ({ 
  children, 
  variant = "default", 
  size = "md", 
  rounded = "full",
  className = "",
  ...props 
}) => {
  const sizeMap = {
    sm: "badge-sm",
    md: "",
    lg: "badge-lg",
  };

  const roundedMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-md",
    full: "rounded-full",
  };

  return (
    <span
      className={`badge badge-${variant} ${sizeMap[size]} ${roundedMap[rounded]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
