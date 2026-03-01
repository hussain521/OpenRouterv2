import { Card } from "@/components/ui/card";

interface AgentCardProps {
  image: string;
  logo: string;
  name: string;
  description: string;
}

export default function AgentCard({
  image,
  logo,
  name,
  description,
}: AgentCardProps) {
  return (
    <Card className="rounded-2xl overflow-hidden border dark:border-gray-700 px-0 pt-0 bg-white dark:bg-black shadow-sm hover:shadow-lg transition duration-300 group cursor-pointer">
      {/* Preview Image */}
      <div className="h-40 sm:h-48 md:h-52 bg-black dark:bg-gray-900 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* Bottom Content */}
      <div className="p-3 md:p-2 px-4 flex items-center gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
          <img
            src={logo}
            alt={name}
            className="w-6 h-6 md:w-7 md:h-7 object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base md:text-lg dark:text-white">
            {name}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5 md:mt-1 truncate">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
