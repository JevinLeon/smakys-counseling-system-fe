import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import columns from "./columns";
import { DataTable } from "@/components/DataTable";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const CounselingsPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const getCounselings = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/counselings`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { data } = res.data;
      setData(data);
    } catch (error) {
      toast.error(error?.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getCounselings();
  }, [getCounselings]);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Counselings" />
        <Button asChild>
          <Link to="/counselings/new">Add Counseling</Link>
        </Button>
      </div>
      <div className="my-4 space-y-4">
        {isLoading ? (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        ) : (
          <DataTable columns={columns} data={data} mainSearchTerm="title" />
        )}
      </div>
    </div>
  );
};

export default CounselingsPage;
