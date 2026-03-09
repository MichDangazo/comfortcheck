import Card from "./Card";
import Badge from "./Badge";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendDirection = "up",
  color = "blue",
  onClick,
  className = ""
}) => {
  const colorClasses = {
    blue: "stat-card-blue",
    green: "stat-card-green",
    yellow: "stat-card-yellow",
    red: "stat-card-red",
  };

  return (
    <Card 
      className={`stat-card ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Filter by ${title}`}
    >
      <div className="stat-content">
        <div>
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
          {trend && (
            <p className={`stat-trend ${trendDirection === "up" ? "trend-up" : "trend-down"}`}>
              {trendDirection === "up" ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        {icon && (
          <div className={`stat-icon ${colorClasses[color]}`} aria-hidden="true">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;