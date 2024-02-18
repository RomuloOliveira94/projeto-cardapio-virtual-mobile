import { Text, Pressable, PressableProps } from "react-native";
import { clsx } from "clsx";

interface CategoryButtonProps extends PressableProps {
  title: string;
  isSelected?: boolean;
}

export function CategoryButton({
  title,
  isSelected,
  ...props
}: CategoryButtonProps) {
  return (
    <Pressable
      className={clsx(
        "px-4 border bg-slate-800 justify-center rounded-md h-10",
        isSelected && "border-lime-300 border-2"
      )}
      {...props}
    >
      <Text
        className={`font-subtitle text-sm text-slate-100 ${
          isSelected ? "text-white" : ""
        }`}
      >
        {title}
      </Text>
    </Pressable>
  );
}
