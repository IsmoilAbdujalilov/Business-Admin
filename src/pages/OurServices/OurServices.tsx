import { get } from "lodash";
import { useState } from "react";
import { Button } from "components";
import { toast } from "react-toastify";
import { useDelete, useGet } from "hooks";
import { useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Container, Tab, Tabs, Box } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

const FaqQuestion = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "uz";

  const { data } = useGet({
    queryKey: "OurServices",
    path: "/OurServices/GetAll",
  });

  const renderStabNumber = () => {
    if (lang === "uz") {
      return 0;
    }

    if (lang === "ru") {
      return 1;
    }

    if (lang === "en") {
      return 2;
    }
  };

  const client = useQueryClient();

  const [stab, setStab] = useState<number>(renderStabNumber() || 0);

  const { mutate } = useDelete({
    queryKey: "OurServices",
    path: "/OurServices/Delete",
    onSuccess: () => {
      toast.success("1 item deleted", { pauseOnHover: false });

      setTimeout(() => {
        client.invalidateQueries({ queryKey: ["OurServices"] });
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
      field: "serviceName",
      headerName: "Service Name",
      valueGetter: (row: any) => row[lang],
    },
    {
      flex: 1,
      editable: false,
      field: "aboutService",
      headerName: "About service",
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
          onClick={() => navigate(`/pages/ourservices/edit/${get(row, "id")}`)}
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

    if (stab === 0) {
      setSearchParams({ lang: "ru" });
    }
    if (stab === 1) {
      setSearchParams({ lang: "en" });
    }
    if (stab === 2) {
      setSearchParams({ lang: "uz" });
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
            onClick={() => navigate("/pages/ourservices/create")}
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

export default FaqQuestion;
