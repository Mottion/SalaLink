import { cn } from "@/services/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  type?: string;
  error?: boolean;

  /* ICONS */
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ onChange, value, placeholder, type, className, error, iconLeft, iconRight, ...props }) => {

  if (iconLeft) className = cn("pl-9", className);
  if (iconRight) className = cn("pr-9", className);

  return (
    <div className="relative">
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-default bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-placeholder placeholder:text-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-light focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error && "border-red-500",
          className,
        )}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        {...props}
      />
      {iconLeft && (
        <div className="text-secondary-400 absolute left-2 top-1/2 -translate-y-1/2">
          {iconLeft}
        </div>
      )}
      {iconRight && (
        <div className="text-secondary-400 absolute right-2 top-1/2 -translate-y-1/2">
          {iconRight}
        </div>
      )}
    </div>
  )
}