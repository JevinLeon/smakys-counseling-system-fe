import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { CalendarIcon, LoaderCircle } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { addStudent } from "@/redux/actions/student";

const NewStudentDialog = ({ classes }) => {
  const [NISN, setNISN] = useState("");
  const [NIS, setNIS] = useState("");
  const [name, setName] = useState("");
  const [classId, setClassId] = useState(null);
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [healthHistory, setHealthHistory] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("2006-01-01");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [universityTarget, setUniversityTarget] = useState("");
  const [status, setStatus] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianJob, setGuardianJob] = useState("");
  const [guardianPhoneNo, setGuardianPhoneNo] = useState("");

  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});

  const { isLoading } = useSelector((state) => state._class);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      NISN == "" ||
      NIS == "" ||
      name == "" ||
      classId == null ||
      phoneNo == "" ||
      address == "" ||
      email == "" ||
      dateOfBirth == null ||
      placeOfBirth == "" ||
      universityTarget == "" ||
      status == "" ||
      guardianName == "" ||
      guardianJob == "" ||
      guardianPhoneNo == ""
    ) {
      if (NISN == "") {
        setError((prev) => ({ ...prev, NISN: "NISN is required" }));
      }

      if (NIS == "") {
        setError((prev) => ({ ...prev, NIS: "NIS is required" }));
      }

      if (name == "") {
        setError((prev) => ({ ...prev, name: "Name is required" }));
      }
      if (classId == null) {
        setError((prev) => ({ ...prev, classId: "Class is required" }));
      }
      if (phoneNo == "") {
        setError((prev) => ({ ...prev, phoneNo: "Phone number is required" }));
      }
      if (address == "") {
        setError((prev) => ({ ...prev, address: "Address is required" }));
      }
      if (email == "") {
        setError((prev) => ({ ...prev, email: "Email is required" }));
      }
      if (dateOfBirth == null) {
        setError((prev) => ({
          ...prev,
          dateOfBirth: "Date of birth is required",
        }));
      }

      if (placeOfBirth == "") {
        setError((prev) => ({
          ...prev,
          placeOfBirth: "Place of birth is required",
        }));
      }
      if (universityTarget == "") {
        setError((prev) => ({
          ...prev,
          universityTarget: "University Target is required",
        }));
      }
      if (status == "") {
        setError((prev) => ({ ...prev, status: "Status is required" }));
      }
      if (guardianName == "") {
        setError((prev) => ({
          ...prev,
          guardianName: "Guardian name is required",
        }));
      }
      if (guardianJob == "") {
        setError((prev) => ({
          ...prev,
          guardianJob: "Guardian job is required",
        }));
      }
      if (guardianPhoneNo == "") {
        setError((prev) => ({
          ...prev,
          guardianPhoneNo: "Guardian phone number is required",
        }));
      }

      return;
    }

    const data = {
      NISN,
      NIS,
      name,
      classId,
      phoneNo,
      address,
      healthHistory,
      email,
      dateOfBirth,
      placeOfBirth,
      universityTarget,
      status,
      guardianName,
      guardianJob,
      guardianPhoneNo,
    };

    dispatch(addStudent(setOpen, data));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add student</DialogTitle>
          <DialogDescription>Create a new student.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="h-[420px] overflow-auto pl-2 pr-5">
            <div className="space-y-2 my-2">
              <Label htmlFor="NISN" className="text-right">
                NISN
              </Label>
              <Input
                id="NISN"
                placeholder="NISN"
                value={NISN}
                onChange={(e) => setNISN(e.target.value)}
                disabled={isLoading}
              />
              {error?.NISN && NISN == "" && (
                <p className="text-sm text-red-400">{error?.NISN}</p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="NIS" className="text-right">
                NIS
              </Label>
              <Input
                id="NIS"
                placeholder="NIS"
                value={NIS}
                onChange={(e) => setNIS(e.target.value)}
                disabled={isLoading}
              />
              {error?.NIS && NIS == "" && (
                <p className="text-sm text-red-400">{error?.NIS}</p>
              )}
            </div>
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
              <Label htmlFor="classId" className="text-right">
                Class
              </Label>
              <Select
                onValueChange={(e) => {
                  setClassId(parseInt(e));
                }}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((_class) => (
                    <SelectItem
                      key={_class.id}
                      value={_class.id.toString()}
                      className="cursor-pointer"
                    >
                      {_class.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error?.classId && classId == null && (
                <p className="text-sm text-red-400">{error?.classId}</p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="phoneNo" className="text-right">
                Phone number
              </Label>
              <Input
                id="phoneNo"
                placeholder="Phone number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                disabled={isLoading}
              />
              {error?.phoneNo && phoneNo == "" && (
                <p className="text-sm text-red-400">{error?.phoneNo}</p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isLoading}
              />
              {error?.address && address == "" && (
                <p className="text-sm text-red-400">{error?.address}</p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="healthHistory" className="text-right">
                Health History
              </Label>
              <Input
                id="healthHistory"
                placeholder="Health History"
                value={healthHistory}
                onChange={(e) => setHealthHistory(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                type="email"
              />
              {error?.email && email == "" && (
                <p className="text-sm text-red-400">{error?.email}</p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="dateOfBirth" className="text-right">
                Date of Birth
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth ? (
                      format(dateOfBirth, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    initialFocus
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="placeOfBirth" className="text-right">
                Place of Birth
              </Label>
              <Input
                id="placeOfBirth"
                placeholder="Place of Birth"
                value={placeOfBirth}
                onChange={(e) => setPlaceOfBirth(e.target.value)}
                disabled={isLoading}
              />
              {error?.placeOfBirth && placeOfBirth == "" && (
                <p className="text-sm text-red-400">{error?.placeOfBirth}</p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="universityTarget" className="text-right">
                University Target
              </Label>
              <Input
                id="universityTarget"
                placeholder="University Target"
                value={universityTarget}
                onChange={(e) => setUniversityTarget(e.target.value)}
                disabled={isLoading}
              />
              {error?.universityTarget && universityTarget == "" && (
                <p className="text-sm text-red-400">
                  {error?.universityTarget}
                </p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                onValueChange={(e) => {
                  setStatus(e);
                }}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active" className="cursor-pointer">
                    Active
                  </SelectItem>
                  <SelectItem value="graduated" className="cursor-pointer">
                    Graduated
                  </SelectItem>
                  <SelectItem value="dropped" className="cursor-pointer">
                    Dropped
                  </SelectItem>
                </SelectContent>
              </Select>
              {error?.status && status == "" && (
                <p className="text-sm text-red-400">{error?.status}</p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="guardianName" className="text-right">
                Guardian Name
              </Label>
              <Input
                id="guardianName"
                placeholder="Guardian Name"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                disabled={isLoading}
              />
              {error?.guardianName && guardianName == "" && (
                <p className="text-sm text-red-400">{error?.guardianName}</p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="guardianJob" className="text-right">
                Guardian Job
              </Label>
              <Input
                id="guardianJob"
                placeholder="Guardian Job"
                value={guardianJob}
                onChange={(e) => setGuardianJob(e.target.value)}
                disabled={isLoading}
              />
              {error?.guardianJob && guardianJob == "" && (
                <p className="text-sm text-red-400">{error?.guardianJob}</p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="guardianPhoneNo" className="text-right">
                Guardian Phone no
              </Label>
              <Input
                id="guardianPhoneNo"
                placeholder="Guardian Phone number"
                value={guardianPhoneNo}
                onChange={(e) => setGuardianPhoneNo(e.target.value)}
                disabled={isLoading}
              />
              {error?.guardianPhoneNo && guardianPhoneNo == "" && (
                <p className="text-sm text-red-400">{error?.guardianPhoneNo}</p>
              )}
            </div>
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

export default NewStudentDialog;
