import { GraduationCap, Shapes, Speech, Users } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cardData = [
  {
    label: "Total Students",
    amount: "210",
    description: "",
    icon: GraduationCap,
  },
  {
    label: "Total Classes",
    amount: "36",
    icon: Shapes,
  },
  {
    label: "Total Counselings",
    amount: "121",
    icon: Speech,
  },
  {
    label: "Total Users",
    amount: "4",
    icon: Users,
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" />
      <div className="grid w-full grid-cols-1 py-10 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total {item.label}
              </CardTitle>
              {<item.icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.amount}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
