import { ArrowRight } from "lucide-react";

interface ExploreCardProps {
  title: string;
  description: string;
  linkText: string;
}

export default function ExploreCard({
  title,
  description,
  linkText,
}: ExploreCardProps) {
  return (
    <div className="h-full rounded-2xl border dark:border-gray-700 bg-white dark:bg-black p-4 md:p-6 shadow-sm hover:shadow-md transition flex flex-col cursor-pointer">
      <h3 className="font-semibold text-base md:text-lg dark:text-white">
        {title}
      </h3>

      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-3 leading-relaxed flex-1">
        {description}
      </p>

      <button className="mt-auto pt-4 md:pt-6 flex items-center gap-1 text-xs md:text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
        {linkText}
        <ArrowRight size={14} className="md:w-4 md:h-4" />
      </button>
    </div>
  );
}
