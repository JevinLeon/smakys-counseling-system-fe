import { LoaderCircle, Sheet } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import columns from "./columns";
import { getStudents } from "@/redux/actions/student";
import NewStudentDialog from "@/components/students/NewStudentDialog";
import { getClasses } from "@/redux/actions/class";
import { Button } from "@/components/ui/button";
import UploadStudentExcelDialog from "@/components/students/UploadStudentExcelDialog";
import exportPdf from "@/utils/exportPdf";

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
      <div className="flex justify-between flex-col md:flex-row gap-4 md:gap-0">
        <div className="flex gap-4 flex-col lg:flex-row">
          <PageTitle title="Students" />
          <div className="flex gap-4 flex-wrap">
            <Button asChild variant="success">
              <Link
                to={`${
                  import.meta.env.VITE_BACKEND_API
                }/api/students/export-excel`}
                target="_blank"
              >
                <Sheet className="h-4 w-4 mr-2" />
                Export Excel
              </Link>
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                exportPdf({
                  title: "Laporan Siswa / Siswa",
                  name: "students.pdf",
                })
              }
            >
              <Sheet className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <UploadStudentExcelDialog />
          </div>
        </div>
        <NewStudentDialog classes={classes} />
      </div>
      <div className="my-4 space-y-4">
        {isLoading ? (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        ) : (
          <DataTable columns={columns} data={students} mainSearchTerm="NISN" />
        )}
      </div>
      <table className="table-bordered hidden " id="my-table">
        <thead>
          <tr>
            <th scope="col">NISN</th>
            <th scope="col">NIS</th>
            <th scope="col">Name</th>
            <th scope="col">Class Id</th>
            <th scope="col">Phone no</th>
            <th scope="col">Address</th>
            <th scope="col">Health History</th>
            <th scope="col">Email</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Place of Birth</th>
            <th scope="col">University Target</th>
            <th scope="col">Status</th>
            <th scope="col">Guardian Name</th>
            <th scope="col">Guardian Job</th>
            <th scope="col">Guardian Phone No</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(students) &&
            students?.map((row) => (
              <tr key={row?.id}>
                <td>{row?.NISN}</td>
                <td>{row?.NIS}</td>
                <td>{row?.name}</td>
                <td>{row?.Classes?.name}</td>
                <td>{row?.phoneNo}</td>
                <td>{row?.address}</td>
                <td>{row?.healthHistory}</td>
                <td>{row?.email}</td>
                <td>
                  {new Date(row?.dateOfBirth).toLocaleDateString("en-GB")}
                </td>
                <td>{row?.placeOfBirth}</td>
                <td>{row?.universityTarget}</td>
                <td>{row?.status}</td>
                <td>{row?.guardianName}</td>
                <td>{row?.guardianJob}</td>
                <td>{row?.guardianPhoneNo}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsPage;
