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
import { editClass } from "@/redux/actions/class";

const EditClassDialog = ({ id, _class }) => {
  const [name, setName] = useState(_class.name);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const { isLoading } = useSelector((state) => state._class);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name == "") {
      setError("Name is required");
      return;
    }

    dispatch(editClass(setOpen, { name }, id));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Class</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit class</DialogTitle>
          <DialogDescription>Update an existing class.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2 my-2">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Class name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
            {error && name == "" && (
              <p className="text-sm text-red-400">{error}</p>
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

export default EditClassDialog;
