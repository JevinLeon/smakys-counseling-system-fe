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
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  LoaderCircle,
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import MultipleSelector from "../MultipleSelector";
import { addCounseling } from "@/redux/actions/counseling";

const NewCounselingDialog = ({ students }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(null);
  const [counselingType, setCounselingType] = useState("");
  const [arrivalType, setArrivalType] = useState("");
  const [status, setStatus] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const [NISN, setNISN] = useState(isGroup ? [] : "");

  const [open, setOpen] = useState(false);
  const [studentBoxOpen, setStudentBoxOpen] = useState(false);
  const [error, setError] = useState({});

  const { isLoading } = useSelector((state) => state._class);

  const getStudentsOptions = () => {
    return students.map((student) => ({
      label: student?.name,
      value: student?.name,
      NISN: student?.NISN,
    }));
  };
  const studentsOptions = getStudentsOptions();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedNISN;

    if (isGroup) {
      if (NISN.length == 1) {
        setError((prev) => ({
          ...prev,
          NISN: "Please untick the 'Group Counseling' and choose only one student instead.",
        }));
        return;
      }
      if (NISN.length < 1) {
        setError((prev) => ({
          ...prev,
          NISN: "Students NISN are required",
        }));
      }

      updatedNISN = NISN.map((n) => n.NISN).join(", ");
    } else {
      updatedNISN = NISN;
    }

    if (
      title == "" ||
      date == null ||
      counselingType == "" ||
      arrivalType == "" ||
      status == "" ||
      updatedNISN == "" ||
      updatedNISN == null
    ) {
      if (title == "") {
        setError((prev) => ({ ...prev, title: "Title is required" }));
      }
      if (date == null) {
        setError((prev) => ({ ...prev, date: "Date is required" }));
      }
      if (counselingType == "") {
        setError((prev) => ({
          ...prev,
          counselingType:
            "Counseling Component / Komponen Konseling is required",
        }));
      }
      if (arrivalType == "") {
        setError((prev) => ({
          ...prev,
          arrivalType: "Arrival type is required",
        }));
      }
      if (status == "") {
        setError((prev) => ({ ...prev, status: "Status is required" }));
      }
      if (updatedNISN == "" || updatedNISN == null) {
        setError((prev) => ({ ...prev, NISN: "Students NISN is required" }));
      }
      return;
    }

    dispatch(
      addCounseling(setOpen, {
        title,
        description,
        notes,
        date,
        isGroup,
        NISN: updatedNISN,
        counselingType,
        arrivalType,
        status,
      })
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Service / Pelaksanaan Layanan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add service / pelaksanaan layanan</DialogTitle>
          <DialogDescription>
            Create a new service / pelaksanaan layanan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="h-[420px] overflow-auto pl-2 pr-5">
            <div className="space-y-2 my-2">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
              />
              {error.title && title == "" && (
                <p className="text-sm text-red-400">{error.title}</p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isLoading}
              />
              {error.notes && notes == "" && (
                <p className="text-sm text-red-400">{error.notes}</p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {error.date && date == null && (
                <p className="text-sm text-red-400">{error.date}</p>
              )}
            </div>
            <div className="space-y-2 mt-2 mb-8 flex items-center gap-2">
              <Checkbox
                id="isGroup"
                checked={isGroup}
                onCheckedChange={(checked) => {
                  setIsGroup(checked);
                  setNISN(null);
                }}
              />
              <Label htmlFor="isGroup">Group Counseling</Label>
            </div>
            {!isGroup ? (
              <div className="space-y-2 my-4 flex flex-col gap-2">
                <Label htmlFor="NISN">Student NISN</Label>
                <Popover open={studentBoxOpen} onOpenChange={setStudentBoxOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={studentBoxOpen}
                      className="w-full justify-between"
                    >
                      {NISN
                        ? students?.find((student) => student?.NISN == NISN)
                            ?.name
                        : "Select a student"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command
                      filter={(value, search, keywords = []) => {
                        const extendValue = value + " " + keywords.join(" ");
                        if (
                          extendValue
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return 1;
                        }
                        return 0;
                      }}
                    >
                      <CommandInput placeholder="Search students..." />
                      <CommandEmpty>No student found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {students.map((student) => (
                            <CommandItem
                              key={student?.id}
                              value={student?.name}
                              onSelect={() => {
                                setNISN(student?.NISN);
                                setStudentBoxOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  NISN === student?.NISN
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {student?.name}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {error?.NISN && (NISN == "" || NISN == null) && (
                  <p className="text-sm text-red-400">{error?.NISN}</p>
                )}
              </div>
            ) : (
              <div className="space-y-2 my-2">
                <MultipleSelector
                  value={NISN}
                  onChange={setNISN}
                  defaultOptions={studentsOptions}
                  placeholder="Select students"
                  emptyIndicator={
                    <p className="text-center leading-10 text-gray-600 dark:text-gray-400">
                      No students found.
                    </p>
                  }
                />
                {error?.NISN && (NISN?.length == 0 || NISN?.length == 1) && (
                  <p className="text-sm text-red-400">{error?.NISN}</p>
                )}
              </div>
            )}
            <div className="space-y-2 my-2">
              <Label htmlFor="counselingType" className="text-right">
                Service Component / Komponen Layanan
              </Label>
              <Select
                onValueChange={(e) => {
                  setCounselingType(e);
                }}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Service Component / Komponen Layanan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="Layanan Dasar - Seminar"
                    className="cursor-pointer"
                  >
                    Layanan Dasar - Seminar
                  </SelectItem>
                  <SelectItem
                    value="Layanan Dasar - Klasikal"
                    className="cursor-pointer"
                  >
                    Layanan Dasar - Klasikal
                  </SelectItem>
                  <SelectItem
                    value="Layanan Responsive"
                    className="cursor-pointer"
                  >
                    Layanan Responsive
                  </SelectItem>
                  <SelectItem
                    value="Layanan Penempatan dan Perencanaan Individual"
                    className="cursor-pointer"
                  >
                    Layanan Penempatan dan Perencanaan Individual
                  </SelectItem>
                </SelectContent>
              </Select>
              {error?.counselingType && counselingType == "" && (
                <p className="text-sm text-red-400">{error?.counselingType}</p>
              )}
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="arrivalType" className="text-right">
                Arrival Type / Riwayat Kedatangan
              </Label>
              <Select
                onValueChange={(e) => {
                  setArrivalType(e);
                }}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Arrival Type / Riwayat Kedatangan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="voluntary" className="cursor-pointer">
                    Voluntary
                  </SelectItem>
                  <SelectItem value="called" className="cursor-pointer">
                    Called
                  </SelectItem>
                  <SelectItem value="referral" className="cursor-pointer">
                    Referral
                  </SelectItem>
                </SelectContent>
              </Select>
              {error?.arrivalType && arrivalType == "" && (
                <p className="text-sm text-red-400">{error?.arrivalType}</p>
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
                  <SelectItem value="pending" className="cursor-pointer">
                    Continued
                  </SelectItem>
                  <SelectItem value="completed" className="cursor-pointer">
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
              {error?.status && status == "" && (
                <p className="text-sm text-red-400">{error?.status}</p>
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCounselingDialog;
