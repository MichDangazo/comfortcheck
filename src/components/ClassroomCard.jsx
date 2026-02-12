const comfortStyles = {
  comfortable: "bg-green-100 border-green-500 text-green-800",
  warm: "bg-yellow-100 border-yellow-500 text-yellow-800",
  hot: "bg-red-100 border-red-500 text-red-800",
};

const ComfortBadge = ({ level }) => {
  const styles = comfortStyles[level] || comfortStyles.comfortable;
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
};

const ClassroomCard = ({ classroom }) => {
  const { name, temperature, humidity, comfort } = classroom;

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold">{name}</h3>
        <ComfortBadge level={comfort} />
      </div>
      <div className="mt-2 space-y-1 text-gray-700">
        <p>🌡️ Temperature: <span className="font-medium">{temperature}°C</span></p>
        <p>💧 Humidity: <span className="font-medium">{humidity}%</span></p>
      </div>
    </div>
  );
};

export default ClassroomCard;