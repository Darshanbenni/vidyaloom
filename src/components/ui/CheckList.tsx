import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckListProps {
  items: string[];
  color?: "blue" | "mint" | "violet" | "teal";
  className?: string;
  itemClassName?: string;
}

export function CheckList({
  items,
  color = "blue",
  className,
  itemClassName,
}: CheckListProps) {
  const checkColors = {
    blue: "bg-[#0787FF] text-white",
    mint: "bg-[#00B990] text-white",
    violet: "bg-[#8745FF] text-white",
    teal: "bg-[#00B990] text-white",
  };

  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item, idx) => (
        <li
          key={idx}
          className={cn(
            "flex items-start text-[14px] sm:text-[15px] font-medium text-[#081F44]/90",
            itemClassName
          )}
        >
          <span
            className={cn(
              "w-4 h-4 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0",
              checkColors[color]
            )}
            aria-hidden="true"
          >
            <Check className="w-2.5 h-2.5 stroke-[3.5]" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
