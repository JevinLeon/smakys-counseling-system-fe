import PageTitle from "@/components/PageTitle";
import DeleteStudentDialog from "@/components/students/DeleteStudentDialog";
import EditStudentDialog from "@/components/students/EditStudentDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getClasses } from "@/redux/actions/class";
import { getStudent } from "@/redux/actions/student";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const StudentDetail = () => {
  const { student, isLoading } = useSelector((state) => state.student);
  const { classes } = useSelector((state) => state._class);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getStudent(id));
    dispatch(getClasses());
  }, [dispatch, id]);

  return (
    <div>
      <PageTitle title="Student Detail" />

      <div className="my-8 max-w-[50%]">
        {isLoading && (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        )}
        {!isLoading && !student && (
          <div className="space-y-6">
            <p className="text-muted-foreground">Data Not Found.</p>
            <Button asChild>
              <Link to="/classes">Go back</Link>
            </Button>
          </div>
        )}
        {!isLoading && student && (
          <div className="mt-4 space-y-8">
            <div className="space-x-4">
              <EditStudentDialog id={id} student={student} classes={classes} />
              <DeleteStudentDialog id={id} />
            </div>
            <form className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>NISN</Label>
                <Input type="text" value={student.NISN} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>NIS</Label>
                <Input type="text" value={student.NIS} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Name</Label>
                <Input type="text" value={student.name} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Class</Label>
                <Input type="text" value={student.Classes?.name} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Phone number</Label>
                <Input type="text" value={student.phoneNo} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Address</Label>
                <Input type="text" value={student.address} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Health History</Label>
                <Input type="text" value={student.healthHistory} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Email</Label>
                <Input type="text" value={student.email} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Date of Birth</Label>
                <Input type="text" value={student.dateOfBirth} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Place of Birth</Label>
                <Input type="text" value={student.placeOfBirth} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>University Target</Label>
                <Input type="text" value={student.universityTarget} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Status</Label>
                <Input type="text" value={student.status} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Guardian Name</Label>
                <Input type="text" value={student.guardianName} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Guardian Job</Label>
                <Input type="text" value={student.guardianJob} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Guardian Phone Number</Label>
                <Input type="text" value={student.guardianPhoneNo} disabled />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;
