import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "on-dark" | "on-dark-bold";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-maroon-dark text-white hover:bg-maroon-light",
  secondary:
    "bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-50",
  "on-dark":
    "bg-transparent border border-white text-white hover:bg-white/10",
  "on-dark-bold":
    "bg-transparent border border-white text-white hover:bg-white hover:text-black",
};

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-8 py-4 text-[16px] font-medium transition-colors duration-200 cursor-pointer";
  const styles = `${base} ${variantStyles[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
