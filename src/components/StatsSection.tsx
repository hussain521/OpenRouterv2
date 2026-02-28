export default function StatsSection() {
  const stats = [
    { value: "30T", label: "Monthly Tokens" },
    { value: "5M+", label: "Global Users" },
    { value: "60+", label: "Active Providers" },
    { value: "300+", label: "Models", highlight: true },
  ];

  return (
    <section className="py-8 md:py-16 lg:pb-24">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-1 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="py-2">
              <h3
                className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
                  stat.highlight ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"
                }`}
              >
                {stat.value}
              </h3>
              <p className="mt-1 md:mt-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
