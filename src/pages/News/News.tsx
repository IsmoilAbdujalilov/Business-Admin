import { get } from "lodash";
import * as React from "react";
import { useGet } from "hooks";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "categoryId" | "postTitle" | "postBody" | "imageId";
  label: string;
  minWidth?: number;
  align?: "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "imageId",
    minWidth: 170,
    align: "left",
    label: "Image",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  { id: "categoryId", label: "Category Id", minWidth: 170 },
  { id: "postTitle", label: "Title", minWidth: 100 },
  {
    label: "Body",
    minWidth: 170,
    align: "left",
    id: "postBody",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

const rows = [{}];

interface Data {
  imageId: string;
  postBody: string;
  postTitle: string;
  categoryId: number | string;
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data } = useGet({
    queryKey: "News",
    path: "/News/GetAll",
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {get(data, "content", []).map((el) => {
              console.log(el);

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={el.code}>
                  {columns.map((column) => {
                    const value = el[column.id];

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
