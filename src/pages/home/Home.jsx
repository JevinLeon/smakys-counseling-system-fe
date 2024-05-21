import { GraduationCap, Shapes, Speech, Users } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "@/redux/actions/user";
import { getClasses } from "@/redux/actions/class";
import { getCounselings } from "@/redux/actions/counseling";
import { getStudents } from "@/redux/actions/student";

const HomePage = () => {
  const { users } = useSelector((state) => state.user);
  const { classes } = useSelector((state) => state._class);
  const { counselings } = useSelector((state) => state.counseling);
  const { students } = useSelector((state) => state.student);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getClasses());
    dispatch(getCounselings());
    dispatch(getStudents());
  }, [dispatch]);

  const cardData = [
    {
      label: "Total Students",
      amount: students ? students.length : "Loading..",
      icon: GraduationCap,
    },
    {
      label: "Total Classes",
      amount: classes ? classes.length : "Loading..",
      icon: Shapes,
    },
    {
      label: "Total Counselings",
      amount: counselings ? counselings.length : "Loading..",
      icon: Speech,
    },
    {
      label: "Total Users",
      amount: users ? users.length : "Loading..",
      icon: Users,
    },
  ];

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
