import { Card, CardContent } from "@/components/ui/card";

interface ModelCardProps {
  logo: string;
  name: string;
  provider: string;
  badge?: string;
  tokens: string;
  trend: string;
}

export default function ModelCard({
  logo,
  name,
  provider,
  badge,
  tokens,
  trend,
}: ModelCardProps) {
  const isPositive = trend.startsWith("+");

  return (
    <Card className="group rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition p-0">
      <CardContent className="p-4 md:p-6">
        {/* Top Info */}
        <div className="flex items-start gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
            <img src={logo} alt={name} className="w-6 h-6 md:w-8 md:h-8 object-contain transition-transform duration-300 group-hover:rotate-45" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base md:text-lg truncate dark:text-white">{name}</h3>
              {badge && (
                <span className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-gray-200 px-2 py-0.5 rounded-md whitespace-nowrap">
                  {badge}
                </span>
              )}
            </div>

            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5 md:mt-1">by {provider}</p>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 my-4 md:my-6" />

        {/* Stats */}
        <div className="flex justify-between text-xs md:text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Tokens</p>
            <p className="font-semibold mt-1 dark:text-white">{tokens}</p>
          </div>

          <div className="text-right">
            <p className="text-gray-500 dark:text-gray-400">Weekly Trend</p>
            <p
              className={`font-semibold mt-1 ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
