import { get } from "lodash";
import { Button } from "components";
import { toast } from "react-toastify";
import { useDelete, useGet } from "hooks";
import { useNavigate } from "react-router-dom";
import { Container, Box, Switch } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

const Message = () => {
  const navigate = useNavigate();

  const { data } = useGet({
    queryKey: "Message",
    path: "/Message/GetAll",
  });

  console.log(data);

  const client = useQueryClient();

  const { mutate } = useDelete({
    queryKey: "Message",
    path: "/Message/Delete",
    onSuccess: () => {
      toast.success("1 item deleted", { pauseOnHover: false });

      setTimeout(() => {
        client.invalidateQueries({ queryKey: ["Message"] });
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
    {
      flex: 1,
      editable: false,
      field: "senderFirstName",
      headerName: "First name",
    },
    {
      flex: 1,
      editable: false,
      field: "senderLastName",
      headerName: "Last Name",
    },
    {
      flex: 1,
      editable: false,
      field: "senderEmail",
      headerName: "Sender Email",
    },
    {
      flex: 1,
      editable: false,
      field: "phoneNumber",
      headerName: "Phone number",
    },
    {
      flex: 1,
      editable: false,
      field: "messageText",
      headerName: "Message",
    },
    {
      flex: 1,
      field: "isRead",
      editable: false,
      headerName: "Read",
      renderCell: (row) => <Switch checked={get(row, "row.isRead")} />,
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
          onClick={() => navigate(`/pages/message/edit/${get(row, "id")}`)}
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
            onClick={() => navigate("/pages/message/create")}
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
            checkboxSelection
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Container>
      </Box>
    </Box>
  );
};

export default Message;
