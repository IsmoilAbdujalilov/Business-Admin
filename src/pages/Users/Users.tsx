import { get } from "lodash";
import { Button } from "components";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useDelete, useGet } from "hooks";
import { useNavigate } from "react-router-dom";
import { Container, Switch } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";

const Users = () => {
  const navigate = useNavigate();

  const { data } = useGet({
    queryKey: "User",
    path: "/User/GetAll",
  });

  const client = useQueryClient();

  const { mutate } = useDelete({
    queryKey: "User",
    path: "/User/Delete",
    onSuccess: () => {
      toast.success("1 item deleted", { pauseOnHover: false });

      setTimeout(() => {
        client.invalidateQueries({ queryKey: ["User"] });
      }, 1000);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(get(error, "message"), { pauseOnHover: false });
      }
    },
  });

  const columns: GridColDef<(typeof allData)[number]>[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "password", headerName: "Password", flex: 1 },
    { field: "userName", headerName: "Username", flex: 1 },
    {
      flex: 1,
      field: "isSigned",
      headerName: "Signed",
      renderCell: (row) => {
        return <Switch checked={get(row, "row.isSigned")} />;
      },
    },
    {
      flex: 1,
      field: "edit",
      editable: false,
      align: "left",
      headerName: "Edit",
      renderCell: (row: any) => (
        <Button
          type="button"
          onClick={() => navigate(`/pages/users/edit/${get(row, "id")}`)}
        >
          {get(row, "row.edit")}
        </Button>
      ),
    },
    {
      flex: 1,
      field: "delete",
      editable: false,
      headerName: "Delete",
      renderCell: (row: any) => (
        <Button type="button" onClick={() => mutate(get(row, "id"))}>
          {get(row, "row.delete")}
        </Button>
      ),
    },
  ];

  const allData =
    get(data, "content", []).length > 0 &&
    get(data, "content", []).map((el: any) => {
      return {
        ...el,
        edit: <EditOutlined color="primary" style={{ cursor: "pointer" }} />,
        delete: <DeleteOutline color="error" style={{ cursor: "pointer" }} />,
      };
    });

  return (
    <Box>
      <Container>
        <Box
          sx={{
            display: "flex",
            paddingY: "25px",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="button"
            variant="contained"
            onClick={() => navigate("/pages/user/create")}
          >
            Create
          </Button>
        </Box>
      </Container>

      <Box sx={{ height: 400, width: "100%" }}>
        <Container>
          <DataGrid
            rows={allData.length > 0 && allData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Container>
      </Box>
    </Box>
  );
};

export default Users;
