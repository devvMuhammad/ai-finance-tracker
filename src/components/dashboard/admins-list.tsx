import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Admin {
  id: string;
  name: string;
  email: string;
  addedDate: string;
  initials: string;
}

export function AdminsList() {
  const admins: Admin[] = [
    {
      id: "1",
      name: "Olivia Martin",
      email: "olivia.martin@company.com",
      addedDate: "2023-05-12",
      initials: "OM",
    },
    {
      id: "2",
      name: "Jackson Lee",
      email: "jackson.lee@company.com",
      addedDate: "2023-03-28",
      initials: "JL",
    },
    {
      id: "3",
      name: "Isabella Nguyen",
      email: "isabella.nguyen@company.com",
      addedDate: "2023-07-14",
      initials: "IN",
    },
    {
      id: "4",
      name: "William Kim",
      email: "will@company.com",
      addedDate: "2023-09-22",
      initials: "WK",
    },
  ];

  return (
    <div className="space-y-4">
      {admins.map((admin) => (
        <div key={admin.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10 bg-secondary">
            <AvatarFallback className="text-secondary-foreground">
              {admin.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{admin.name}</p>
            <p className="text-sm text-muted-foreground">{admin.email}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {admin.addedDate}
          </div>
        </div>
      ))}
    </div>
  );
} 