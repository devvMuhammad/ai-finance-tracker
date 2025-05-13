import { CreditCard } from "lucide-react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function PageTitle({ title, subtitle, icon }: PageTitleProps) {
  return (
    <div className="flex items-center gap-3">
      {icon && <div className="rounded-lg bg-primary/10 p-2">{icon}</div>}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}