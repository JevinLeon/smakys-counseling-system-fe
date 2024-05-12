import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle } from "lucide-react";
import { addUser } from "@/redux/actions/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const NewUserDialog = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("admin");
  const [password, setPassword] = useState("123123");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});

  const { isLoading } = useSelector((state) => state._class);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name == "" || username == "" || password == "") {
      if (name == "") {
        setError((prev) => ({ ...prev, name: "Name is required" }));
      }

      if (username == "") {
        setError((prev) => ({ ...prev, username: "Username is required" }));
      }

      if (password == "") {
        setError((prev) => ({ ...prev, password: "Password is required" }));
      }
      return;
    }

    dispatch(addUser(setOpen, { name, username, role, password }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription>Create a new user.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2 my-2">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
            {error?.name && name == "" && (
              <p className="text-sm text-red-400">{error?.name}</p>
            )}
          </div>
          <div className="space-y-2 my-2">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
            {error?.username && username == "" && (
              <p className="text-sm text-red-400">{error?.username}</p>
            )}
          </div>
          <div className="space-y-2 my-2">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              onValueChange={(e) => {
                setRole(e);
              }}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={role == "admin" ? "Admin" : "Superadmin"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin" className="cursor-pointer">
                  Admin
                </SelectItem>
                <SelectItem value="superadmin" className="cursor-pointer">
                  Superadmin
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 my-2">
            <Label htmlFor="password" className="text-right ">
              Password
              <span className="text-xs text-muted-foreground ml-2">
                (Default value is 123123)
              </span>
            </Label>
            <Input
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              type="password"
            />
            {error?.password && password == "" && (
              <p className="text-sm text-red-400">{error?.password}</p>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isLoading ? "Saving changes.." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewUserDialog;
