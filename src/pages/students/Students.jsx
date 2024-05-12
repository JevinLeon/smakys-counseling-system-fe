import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import columns from "./columns";
import { getStudents } from "@/redux/actions/student";
import NewStudentDialog from "@/components/students/NewStudentDialog";
import { getClasses } from "@/redux/actions/class";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const { students, isLoading } = useSelector((state) => state.student);
  const { classes } = useSelector((state) => state._class);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getClasses());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Users" />
        <NewStudentDialog classes={classes} />
      </div>
      <div className="my-4 space-y-4">
        {isLoading ? (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        ) : (
          <DataTable columns={columns} data={students} mainSearchTerm="NISN" />
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
