import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import columns from "./columns";

const StudentsPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const getStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/students`,
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
    getStudents();
  }, [getStudents]);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Users" />
        <Button asChild>
          <Link to="/users/new">Add Student</Link>
        </Button>
      </div>
      <div className="my-4 space-y-4">
        {isLoading ? (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        ) : (
          <DataTable columns={columns} data={data} mainSearchTerm="NISN" />
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
