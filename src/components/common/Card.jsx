const Card = ({ 
  children, 
  className = "", 
  padding = "md", 
  shadow = "md", 
  border = true,
  onClick,  
  ...props  
}) => {
  const shadowMap = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  const paddingMap = {
    sm: "card-sm",
    md: "card-md",
    lg: "card-lg",
    xl: "card-xl",
  };

  return (
    <div
      className={`card ${paddingMap[padding]} ${shadowMap[shadow]} ${border ? 'border' : 'border-0'} ${onClick ? 'card-hover cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...props}  
    >
      {children}
    </div>
  );
};

export default Card;