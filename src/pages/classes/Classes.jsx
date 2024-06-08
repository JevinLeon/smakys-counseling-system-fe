import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { LoaderCircle, Sheet } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import columns from "./columns";
import { getClasses } from "@/redux/actions/class";
import NewClassDialog from "../../components/classes/NewClassDialog";
import { Button } from "@/components/ui/button";
import exportPdf from "@/utils/exportPdf";

const ClassesPage = () => {
  const dispatch = useDispatch();
  const { classes, isLoading } = useSelector((state) => state._class);

  useEffect(() => {
    console.log("TEST");
    dispatch(getClasses());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between flex-col md:flex-row gap-4 md:gap-0">
        <div className="flex gap-4 flex-col lg:flex-row">
          <PageTitle title="Classes" />
          <div className="flex gap-4 flex-wrap">
            <Button asChild variant="success">
              <Link
                to={`${
                  import.meta.env.VITE_BACKEND_API
                }/api/classes/export-excel`}
                target="_blank"
              >
                <Sheet className="h-4 w-4 mr-2" />
                Export Excel
              </Link>
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                exportPdf({ title: "Laporan Kelas", name: "classes.pdf" });
              }}
            >
              <Sheet className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
        <NewClassDialog />
      </div>
      <div className="my-4 space-y-4">
        {isLoading ? (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        ) : (
          <DataTable columns={columns} data={classes} mainSearchTerm="name" />
        )}
      </div>
      <table className="table-bordered hidden" id="my-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(classes) &&
            classes?.map((row) => (
              <tr key={row?.id}>
                <td>{row?.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassesPage;
