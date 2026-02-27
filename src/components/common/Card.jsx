const Card = ({ 
  children, 
  className = "", 
  padding = "p-4", 
  shadow = "md", 
  border = true,
  onClick,  // Make sure this is included
  ...props  // Pass any other props
}) => {
  const shadowMap = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  return (
    <div
      className={`
        bg-[#f3f3f3] rounded-xl shadow-md p-10 
        ${border ? "border border-gray-200 dark:border-gray-700" : ""} 
        ${shadowMap[shadow]} 
        ${padding} 
        ${className}
        ${onClick ? 'cursor-pointer hover:shadow-lg transition-all' : ''}
      `}
      onClick={onClick}
      {...props}  // Spread remaining props
    >
      {children}
    </div>
  );
};

export default Card;