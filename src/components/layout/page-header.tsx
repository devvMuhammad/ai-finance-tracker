import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PageHeaderProps {
  breadcrumbs?: { href: string; label: string }[];
}

export function PageHeader({ breadcrumbs = [] }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between py-4 px-6">
        <div>
          {breadcrumbs.length > 0 && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Link href="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span>/</span>
                  <Link href={crumb.href} className="hover:text-foreground">
                    {crumb.label}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
} 