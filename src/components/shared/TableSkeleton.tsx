import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type TTableSkeleton = {
  columns: number;
  rows: number;
  showActions?: boolean;
};

const TableSkeleton = ({ columns, rows, showActions }: TTableSkeleton) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[...Array(columns)].map((column, index) => (
            <TableHead key={index}>
              <Skeleton className="h-4 w-full" />
            </TableHead>
          ))}
          {showActions && (
            <TableHead>
              <Skeleton className="h-4 w-8" />
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(rows)].map((row, index) => (
          <TableRow key={index}>
            {[...Array(columns)].map((col, index) => (
              <TableCell key={index}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
            {showActions && (
              <TableCell>
                <Skeleton className="h-4 w-8" />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
