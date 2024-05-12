import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DeleteUserDialog from "@/components/users/DeleteUserDialog";
import EditUserDialog from "@/components/users/EditUserDialog";
import { getUser } from "@/redux/actions/user";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserDetail = () => {
  const { user: profile } = useSelector((state) => state.auth);
  const { user, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (profile?.role !== "superadmin") return navigate("/");
  }, [navigate, profile?.role]);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <div>
      <PageTitle title="User Detail" />

      <div className="my-8 max-w-[50%]">
        {isLoading && (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        )}
        {!isLoading && !user && (
          <div className="space-y-6">
            <p className="text-muted-foreground">Data Not Found.</p>
            <Button asChild>
              <Link to="/classes">Go back</Link>
            </Button>
          </div>
        )}
        {!isLoading && user && (
          <div className="mt-4 space-y-8">
            <div className="space-x-4">
              <EditUserDialog id={id} user={user} />
              <DeleteUserDialog id={id} />
            </div>
            <form className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Name</Label>
                <Input type="text" value={user.name} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Username</Label>
                <Input type="text" value={user.username} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Role</Label>
                <Input type="text" value={user.role} disabled />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
