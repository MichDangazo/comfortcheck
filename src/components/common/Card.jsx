const Card = ({ children, className = "", padding = "p-4", shadow = "md", border = true }) => {
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
        bg-white rounded-lg 
        ${border ? "border border-gray-200" : ""} 
        ${shadowMap[shadow]} 
        ${padding} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;