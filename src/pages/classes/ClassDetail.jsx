import DeleteClassDialog from "@/components/classes/DeleteClassDialog";
import EditClassDialog from "@/components/classes/EditClassDialog";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editClass, getClass } from "@/redux/actions/class";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ClassDetail = () => {
  const { _class, isLoading } = useSelector((state) => state._class);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getClass(id));
  }, [dispatch, id]);

  return (
    <div>
      <PageTitle title="Class Detail" />

      <div className="my-8 max-w-[50%]">
        {isLoading && (
          <LoaderCircle className="h-10 w-full my-4 animate-spin" />
        )}
        {!isLoading && !_class && (
          <div className="space-y-6">
            <p className="text-muted-foreground">Data Not Found.</p>
            <Button asChild>
              <Link to="/classes">Go back</Link>
            </Button>
          </div>
        )}
        {!isLoading && _class && (
          <div className="mt-4 space-y-8">
            <div className="space-x-4">
              <EditClassDialog id={id} _class={_class} />
              <DeleteClassDialog id={id} />
            </div>
            <form className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Name</Label>
                <Input type="text" value={_class.name} disabled />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDetail;
