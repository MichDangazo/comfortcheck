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
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <Card 
      className={`hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trendDirection === "up" ? "text-green-600" : "text-red-600"}`}>
              {trendDirection === "up" ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;