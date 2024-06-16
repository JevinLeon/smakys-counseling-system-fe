import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import columns from "./columns";
import { DataTable } from "@/components/DataTable";
import { getLogs } from "@/redux/actions/log";

const CounselingLogsPage = () => {
  const dispatch = useDispatch();
  const { logs, isLoading } = useSelector((state) => state.log);

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Services Logs" />
      </div>
      <div className="my-4 space-y-4">
        {isLoading && !logs ? (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        ) : (
          <DataTable columns={columns} data={logs} mainSearchTerm="activity" />
        )}
      </div>
    </div>
  );
};

export default CounselingLogsPage;
