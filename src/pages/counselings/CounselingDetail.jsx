import DeleteCounselingDialog from "@/components/counselings/DeleteCounselingDialog";
import EditCounselingDialog from "@/components/counselings/EditCounselingDialog";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getCounseling } from "@/redux/actions/counseling";
import { format } from "date-fns";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const CounselingDetail = () => {
  const { counseling, isLoading } = useSelector((state) => state.counseling);
  const { students } = useSelector((state) => state.student);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCounseling(id));
  }, [dispatch, id]);

  return (
    <div>
      <PageTitle title="Counseling Detail" />

      <div className="my-8 max-w-[50%]">
        {isLoading && (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        )}
        {!isLoading && !counseling && (
          <div className="space-y-6">
            <p className="text-muted-foreground">Data Not Found.</p>
            <Button asChild>
              <Link to="/classes">Go back</Link>
            </Button>
          </div>
        )}
        {!isLoading && counseling && (
          <div className="mt-4 space-y-8">
            <div className="space-x-4">
              <EditCounselingDialog
                id={id}
                counseling={counseling}
                students={students}
              />
              <DeleteCounselingDialog id={id} />
            </div>
            <form className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Title</Label>
                <Input type="text" value={counseling.title} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Description</Label>
                <Textarea type="text" value={counseling.description} disabled />
              </div>
              {counseling.notes && (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Notes</Label>
                  <Input type="text" value={counseling.notes} disabled />
                </div>
              )}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !counseling.date && "text-muted-foreground"
                      )}
                      disabled
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(counseling.date, "PPP")}
                    </Button>
                  </PopoverTrigger>
                </Popover>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Counseling Type</Label>
                <Input type="text" value={counseling.counselingType} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Arrival Type</Label>
                <Input type="text" value={counseling.arrivalType} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Status</Label>
                <Input type="text" value={counseling.status} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Counselor</Label>
                <Input type="text" value={counseling.User.name} disabled />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Students NISN</Label>
                <Input type="text" value={counseling.NISN} disabled />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounselingDetail;
