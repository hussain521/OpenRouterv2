interface AnnouncementCardProps {
  title: string;
  description: string;
  date: string;
}

export default function AnnouncementCard({
  title,
  description,
  date,
}: AnnouncementCardProps) {
  return (
    <div className="rounded-2xl border dark:border-gray-700 bg-white dark:bg-black p-4 md:p-6 shadow-sm hover:shadow-md transition cursor-pointer">
      <h3 className="font-semibold text-base md:text-lg dark:text-white">
        {title}
      </h3>

      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-3 leading-relaxed">
        {description}
      </p>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 md:mt-4">
        {date}
      </p>
    </div>
  );
}
