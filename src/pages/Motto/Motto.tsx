import { get } from "lodash";
import { useState } from "react";
import { Button } from "components";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useDelete, useGet } from "hooks";
import { Container, Tab, Tabs } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";

const Motto = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "uz";

  const { data } = useGet({
    queryKey: "Motto",
    path: "/Motto/GetAll",
  });

  const renderStabNumber = () => {
    switch (lang) {
      case "uz":
        return 0;
      case "ru":
        return 1;
      case "en":
        return 2;
      default:
        return 0;
    }
  };

  const client = useQueryClient();

  const [stab, setStab] = useState<number>(renderStabNumber() || 0);

  const { mutate } = useDelete({
    queryKey: "Motto",
    path: `/Motto/Delete`,
    onSuccess: () => {
      toast.success("1 item deleted", { pauseOnHover: false });

      setTimeout(() => {
        client.invalidateQueries({ queryKey: ["Motto"] });
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
    { field: "author", headerName: "Author", flex: 1 },
    {
      flex: 1,
      field: "text",
      editable: false,
      headerName: "Text",
      valueGetter: (row: any) => row[lang],
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
          onClick={() => navigate(`/pages/motto/edit/${get(row, "id")}`)}
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

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setStab(newValue);

    if (newValue === 0) {
      setSearchParams({ lang: "uz" });
    }
    if (newValue === 1) {
      setSearchParams({ lang: "ru" });
    }
    if (newValue === 2) {
      setSearchParams({ lang: "en" });
    }
  };

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
            justifyContent: "space-between",
          }}
        >
          <Tabs value={stab} onChange={handleChangeTab}>
            <Tab label="uz" />
            <Tab label="ru" />
            <Tab label="en" />
          </Tabs>
          <Button
            type="button"
            variant="contained"
            onClick={() => navigate("/pages/motto/create")}
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

export default Motto;
