import { LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import React from "react";
import DeleteClassDialog from "@/components/classes/DeleteClassDialog";
import EditClassDialog from "@/components/classes/EditClassDialog";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import columns from "./detailColumns";
import { getClass } from "@/redux/actions/class";

const ClassDetail = () => {
  const { _class, isLoading } = useSelector((state) => state._class);

  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
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
      {_class && _class?.Students && (
        <div className="my-4 space-y-4">
          <div>Students in {_class?.name} : </div>
          {isLoading && _class?.Students ? (
            <LoaderCircle className="h-10 w-full my-4 animate-spin" />
          ) : (
            <DataTable
              columns={columns}
              data={_class?.Students}
              mainSearchTerm="NISN"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ClassDetail;
