import PageTitle from "@/components/PageTitle";
import columns from "./columns";
import { DataTable } from "@/components/DataTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle } from "lucide-react";
import { getCounselings } from "@/redux/actions/counseling";
import NewCounselingDialog from "@/components/counselings/NewCounselingDialog";
import { getStudents } from "@/redux/actions/student";

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
      <div className="flex justify-between">
        <PageTitle title="Counselings" />
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
    </div>
  );
};

export default CounselingsPage;
