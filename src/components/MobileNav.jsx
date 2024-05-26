import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const navLinks =
    user?.role == "superadmin"
      ? [
          { name: "Users", href: "/users" },
          { name: "Services", href: "/services" },
          { name: "Services Logs", href: "/service-logs" },
          { name: "Students", href: "/students" },
          { name: "Classes", href: "/classes" },
        ]
      : [
          { name: "Services", href: "/services" },
          { name: "Service Logs", href: "/service-logs" },
          { name: "Students", href: "/students" },
          { name: "Classes", href: "/classes" },
        ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          to="/"
          className="mr-6 flex items-center space-x-2 font-semibold text-xl"
          onOpenChange={setOpen}
          onClick={() => setOpen(false)}
        >
          SMAKYS
        </Link>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  location.pathname.includes(item.href)
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
