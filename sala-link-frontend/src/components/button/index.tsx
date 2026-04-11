import { cn } from "@/services/utils/cn"

type ButtonVariant = "default" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "text-white bg-brand-primary hover:bg-brand-primary/90",
  outline: "text-brand-primary bg-white border border-brand-primary hover:bg-brand-primary hover:text-white",
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className,
  variant = "default",
  // disabled, TODO: add css for disabled state 
  // loading, TODO: add loading state with spinner
  ...props 
}) => {
  
  return (
    <button
      className={cn(
        "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full gap-2",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}