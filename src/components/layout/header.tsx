import { MainNav } from "./main-nav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">Company Name</div>
            <div className="ml-2 text-sm text-muted-foreground">Admin Site</div>
            <div className="hidden md:block ml-10">
              <MainNav />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="" alt="JO" />
              <AvatarFallback className="bg-primary text-primary-foreground">JO</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 