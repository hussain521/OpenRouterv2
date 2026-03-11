import { FiMoreHorizontal } from "react-icons/fi";

interface CategoryTag {
  name: string;
  count: number;
  color: string;
}

interface ModelCategoryTagsProps {
  categories?: CategoryTag[];
}

const defaultCategories: CategoryTag[] = [
  { name: "Academia", count: 25, color: "bg-blue-500" },
  { name: "Finance", count: 16, color: "bg-green-500" },
  { name: "Health", count: 26, color: "bg-red-500" },
  { name: "Legal", count: 37, color: "bg-purple-500" },
  { name: "Marketing", count: 27, color: "bg-orange-500" },
];

export default function ModelCategoryTags({
  categories = defaultCategories,
}: ModelCategoryTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <div
          key={category.name}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border text-xs text-muted-foreground hover:bg-muted hover:border-muted-foreground transition-colors cursor-pointer"
        >
          <span className={`w-2 h-2 rounded-full ${category.color}`} />
          <span>{category.name}</span>
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
