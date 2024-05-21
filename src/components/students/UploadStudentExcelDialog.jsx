import { LoaderCircle, Sheet } from "lucide-react";
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
import { FileUploader } from "react-drag-drop-files";
import { addStudentsWithExcel } from "@/redux/actions/student";

const UploadStudentExcelDialog = () => {
  const [file, setFile] = useState(null);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const { isLoading } = useSelector((state) => state._class);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("File is required");
      return;
    }

    dispatch(addStudentsWithExcel(setOpen, file));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="success">
          <Sheet className="h-4 w-4 mr-2" /> Upload Excel to Add Students
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload excel file to add students</DialogTitle>
          <DialogDescription>
            Upload excel file to add students.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2 my-2">
            <FileUploader
              multiple={false}
              handleChange={(e) => {
                setFile(e);
              }}
              name="file"
              types={["xlsx"]}
            />
            <p>{file ? `File name: ${file.name}` : "No files uploaded yet"}</p>
            {error && !file && <p className="text-sm text-red-400">{error}</p>}
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

export default UploadStudentExcelDialog;
