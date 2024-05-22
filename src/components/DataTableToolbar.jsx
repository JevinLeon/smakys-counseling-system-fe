"use client";

import { arrivalType, counselingType, role } from "../data/data";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("counselingType") && (
          <DataTableFacetedFilter
            column={table.getColumn("counselingType")}
            title="Service Component"
            options={counselingType}
          />
        )}
        {table.getColumn("arrivalType") && (
          <DataTableFacetedFilter
            column={table.getColumn("arrivalType")}
            title="Arrival Type"
            options={arrivalType}
          />
        )}
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={role}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <PlusIcon className="ml-2 h-4 w-4 rotate-45" />
          </Button>
        )}
      </div>
    </div>
  );
}
