import { type ReactNode } from "react";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  children?: ReactNode;
}

export default function StepCard({
  step,
  title,
  description,
  children,
}: StepCardProps) {
  return (
    <div className="flex flex-col gap-3 md:gap-4 cursor-pointer">
      {/* Step Header */}
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs md:text-sm font-semibold">
          {step}
        </div>
        <h3 className="font-semibold text-base md:text-lg dark:text-white">{title}</h3>
      </div>

      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 max-w-sm">{description}</p>

      {/* Custom Content */}
      <div>{children}</div>
    </div>
  );
}
