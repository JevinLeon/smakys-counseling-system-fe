import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/redux/actions/auth";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();

    if (!currentPassword || currentPassword == "") {
      setError((prev) => ({
        ...prev,
        currentPassword: "Current password is required",
      }));
    }

    if (!newPassword || newPassword == "") {
      setError((prev) => ({
        ...prev,
        newPassword: "New password is required",
      }));
    }

    if (!confirmNewPassword || confirmNewPassword == "") {
      setError((prev) => ({
        ...prev,
        confirmNewPassword: "Confirmed new password is required",
      }));
    }

    if (newPassword !== confirmNewPassword) {
      toast("New passwords do not match!");
      return;
    }

    dispatch(changePassword({ currentPassword, newPassword }));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between md:divide-x">
        <div className="flex-1">
          <PageTitle title="Profile" />
          <div className="my-4 min-w-[50%]">
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
        {user && (
          <div className="flex-1 my-6 md:pl-10 md:my-0">
            <PageTitle title="Change Password" />
            <div className="my-4 min-w-[50%]">
              <form className="space-y-4" onSubmit={handleSubmitChangePassword}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  {error.currentPassword && currentPassword == "" && (
                    <p className="text-sm text-red-400">
                      {error.currentPassword}
                    </p>
                  )}
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {error.newPassword && newPassword == "" && (
                    <p className="text-sm text-red-400">{error.newPassword}</p>
                  )}
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  {error.confirmNewPassword && confirmNewPassword == "" && (
                    <p className="text-sm text-red-400">
                      {error.confirmNewPassword}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Changing password.." : "Change password"}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
