import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import columns from "./columns";
import { getUsers } from "@/redux/actions/user";
import NewUserDialog from "@/components/users/NewUserDialog";

const UsersPage = () => {
  const { users } = useSelector((state) => state.user);
  const { user, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.role !== "superadmin") return navigate("/");
  }, [navigate, user?.role]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Users" />
        <NewUserDialog />
      </div>
      <div className="my-4 space-y-4">
        {!isLoading && users && (
          <DataTable columns={columns} data={users} mainSearchTerm="name" />
        )}
        {isLoading && !users && (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
