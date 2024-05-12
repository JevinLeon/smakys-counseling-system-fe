import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import columns from "./columns";
import { getClasses } from "@/redux/actions/class";
import NewClassDialog from "../../components/classes/NewClassDialog";

const ClassesPage = () => {
  const dispatch = useDispatch();
  const { classes, isLoading } = useSelector((state) => state._class);

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Classes" />
        <NewClassDialog />
      </div>
      <div className="my-4 space-y-4">
        {isLoading ? (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        ) : (
          <DataTable columns={columns} data={classes} mainSearchTerm="name" />
        )}
      </div>
    </div>
  );
};

export default ClassesPage;
