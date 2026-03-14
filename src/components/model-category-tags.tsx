import { FiMoreHorizontal } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface CategoryTag {
  nameKey: string;
  count: number;
  color: string;
}

interface ModelCategoryTagsProps {
  categories?: CategoryTag[];
}

const defaultCategories: CategoryTag[] = [
  { nameKey: "academia", count: 25, color: "bg-blue-500" },
  { nameKey: "finance", count: 16, color: "bg-green-500" },
  { nameKey: "health", count: 26, color: "bg-red-500" },
  { nameKey: "legal", count: 37, color: "bg-purple-500" },
  { nameKey: "marketing", count: 27, color: "bg-orange-500" },
];

export default function ModelCategoryTags({
  categories = defaultCategories,
}: ModelCategoryTagsProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <div
          key={category.nameKey}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border text-xs text-muted-foreground hover:bg-muted hover:border-muted-foreground transition-colors cursor-pointer"
        >
          <span className={`w-2 h-2 rounded-full ${category.color}`} />
          <span>{t(`hardcodedStrings.categories.${category.nameKey}`, category.nameKey)}</span>
          <span className="text-muted-foreground">#{category.count}</span>
        </div>
      ))}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border text-xs text-muted-foreground hover:bg-muted hover:border-muted-foreground transition-colors cursor-pointer">
        <FiMoreHorizontal className="w-3 h-3" />
        <span>+6 categories</span>
      </div>
    </div>
  );
}
