import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

interface ButtonTextProps {
  children: React.ReactNode;
}

interface ButtonIconProps {
  children: React.ReactNode;
}

function Button({ children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      className="h-12 rounded-md items-center justify-center flex-row bg-lime-400"
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children }: ButtonTextProps) {
  return (
    <Text className="text-black font-heading text-base mx-2">{children}</Text>
  );
}

function ButtonIcon({ children }: ButtonIconProps) {
  return <>{children}</>;
}

Button.Text = ButtonText;

Button.Icon = ButtonIcon;

export default Button;
