import { cn } from "@/lib/utils";
const PageTitle = ({ title, className }) => {
  return <h1 className={cn("text-2xl font-semibold", className)}>{title}</h1>;
};

export default PageTitle;
