import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
  linkText: string;
  href?: string;
}

export default function FeatureCard({
  image,
  title,
  description,
  linkText,
  href = "#",
}: FeatureCardProps) {
  return (
    <Card className="group rounded-2xl border bg-white dark:bg-black px-0 pt-0 hover:border-indigo-600 dark:hover:border-indigo-400 cursor-pointer transition-all duration-300 overflow-hidden">
      {/* Image Top Section */}
      <div className="h-40 sm:h-45 md:h-50 overflow-hidden border-b dark:border-gray-700">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <CardContent className="px-4 md:px-6 ">
        <h3 className="text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-gray-100">
          {title}
        </h3>

        <p className="mt-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors leading-relaxed text-xs sm:text-sm">
          {description}
        </p>

        <a
          href={href}
          className="mt-4 md:mt-6 inline-flex items-center gap-1 text-sm md:text-base text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline"
        >
          {linkText}
          <ArrowUpRight size={16} />
        </a>
      </CardContent>
    </Card>
  );
}
