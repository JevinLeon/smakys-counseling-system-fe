import PageTitle from "@/components/PageTitle";
import columns from "./columns";
import { DataTable } from "@/components/DataTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle, Sheet } from "lucide-react";
import { getCounselings } from "@/redux/actions/counseling";
import NewCounselingDialog from "@/components/counselings/NewCounselingDialog";
import { getStudents } from "@/redux/actions/student";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import exportPdf from "@/utils/exportPdf";

const CounselingsPage = () => {
  const dispatch = useDispatch();
  const { counselings, isLoading } = useSelector((state) => state.counseling);
  const { students } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getCounselings());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between flex-col md:flex-row gap-4 md:gap-0">
        <div className="flex gap-4 flex-col lg:flex-row">
          <PageTitle title="Services / Pelaksanaan Layanan" />
          <div className="flex gap-4 flex-wrap">
            <Button asChild variant="success">
              <Link
                to={`${
                  import.meta.env.VITE_BACKEND_API
                }/api/counselings/export-excel`}
                target="_blank"
              >
                <Sheet className="h-4 w-4 mr-2" />
                Export Excel
              </Link>
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                exportPdf({
                  title: "Laporan Pelaksanaan Layanan",
                  name: "services.pdf",
                });
              }}
            >
              <Sheet className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
        <NewCounselingDialog counselings={counselings} students={students} />
      </div>
      <div className="my-4 space-y-4">
        {isLoading ? (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        ) : (
          <DataTable
            columns={columns}
            data={counselings}
            mainSearchTerm="title"
          />
        )}
      </div>
      <table className="table-bordered hidden" id="my-table">
        <h1>Laporan Pelaksanaan Layanan</h1>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Notes</th>
            <th scope="col">Service Component / Komponen Layanan</th>
            <th scope="col">Arrival Type / Riwayat Kedatangan</th>
            <th scope="col">Status</th>
            <th scope="col">Counselor</th>
            <th scope="col">Students NISN</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(counselings) &&
            counselings?.map((row) => (
              <tr key={row?.id}>
                <td>{row?.title}</td>
                <td>{new Date(row?.date).toLocaleDateString("en-GB")}</td>
                <td>{row?.description}</td>
                <td>{row?.notes}</td>
                <td>{row?.counselingType}</td>
                <td>{row?.arrivalType}</td>
                <td>{row?.status}</td>
                <td>{row?.Users?.name}</td>
                <td>{row?.NISN}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CounselingsPage;
