import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { user } = useSelector((state) => state.auth);
  const navLinks =
    user?.role == "superadmin"
      ? [
          { name: "Users", href: "/users" },
          { name: "Counselings", href: "/counselings" },
          { name: "Counseling Logs", href: "/counseling-logs" },
          { name: "Students", href: "/students" },
          { name: "Classes", href: "/classes" },
        ]
      : [
          { name: "Counselings", href: "/counselings" },
          { name: "Counseling Logs", href: "/counseling-logs" },
          { name: "Students", href: "/students" },
          { name: "Classes", href: "/classes" },
        ];

  return (
    <div className="mr-4 hidden md:flex">
      <div>
        <Link
          to="/"
          className="mr-6 flex items-center space-x-2 font-semibold text-xl"
        >
          SMAKYS
        </Link>
      </div>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
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
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MainNav;
