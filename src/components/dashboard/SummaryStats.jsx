import StatCard from "../common/StatCard";

const SummaryStats = ({ counts, onStatClick }) => {
  const stats = [
    {
      title: "Comfortable Classrooms",
      value: counts.comfortable,
      icon: "😊",
      color: "green",
      trend: "12% from yesterday",
      trendDirection: "up",
      filter: "comfortable"
    },
    {
      title: "Warm Classrooms",
      value: counts.warm,
      icon: "😐",
      color: "yellow",
      trend: "5% from yesterday",
      trendDirection: "up",
      filter: "warm"
    },
    {
      title: "Hot Classrooms",
      value: counts.hot,
      icon: "🔥",
      color: "red",
      trend: "3% from yesterday",
      trendDirection: "down",
      filter: "hot"
    },
  ];

  return (
    <section className="summary-stats" aria-label="Summary Statistics">
      {stats.map((stat) => (
        <StatCard
          key={stat.filter}
          {...stat}
          onClick={() => onStatClick?.(stat.filter)}
        />
      ))}
    </section>
  );
};

export default SummaryStats;