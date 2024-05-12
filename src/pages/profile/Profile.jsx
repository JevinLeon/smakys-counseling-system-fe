import PageTitle from "@/components/PageTitle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <PageTitle title="Profile" />

      <div className="my-4 max-w-[50%]">
        <form className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Name</Label>
            <Input
              type="text"
              value={user ? user.name : "Loading.."}
              disabled
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Username</Label>
            <Input
              type="text"
              value={user ? user.username : "Loading.."}
              disabled
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Role</Label>
            <Input
              type="text"
              value={user ? user.role : "Loading.."}
              disabled
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
