const MetricCard = ({ title, value, growth }) => {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">
      <h3 className="text-zinc-400">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

      <span className="text-green-400">
        {growth}
      </span>
    </div>
  );
};

export default MetricCard;