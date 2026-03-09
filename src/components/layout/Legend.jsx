import Badge from "../common/Badge";

const Legend = ({ items = [] }) => {
  const defaultItems = [
    { label: "Comfortable (≤25°C)", badge: "success", icon: "🟢" },
    { label: "Warm (26–29°C)", badge: "warning", icon: "🟡" },
    { label: "Hot (≥30°C)", badge: "danger", icon: "🔴" },
  ];

  const legendItems = items.length ? items : defaultItems;

  return (
    <div className="legend">
      {legendItems.map((item, index) => (
        <div key={index} className="legend-item">
          <span>{item.icon}</span>
          <Badge variant={item.badge} size="sm">
            {item.label}
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default Legend;