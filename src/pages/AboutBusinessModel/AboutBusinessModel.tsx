import { get, truncate } from "lodash";
import { Button } from "components";
import { toast } from "react-toastify";
import { useDelete, useGet } from "hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Box, Switch, Tabs, Tab } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { useState } from "react";

const Message = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "uz";

  const { data } = useGet({
    queryKey: "AboutBusinessModel",
    path: "/AboutBusinessModel/Get?id=1",
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

  console.log(data);

  const client = useQueryClient();
  const [stab, setStab] = useState<number>(renderStabNumber() || 0);

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

  const datas = [get(data, "content", {})] || [];

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
            onClick={() => navigate("/pages/business-about-model/create")}
          >
            Create
          </Button>
        </Box>
      </Container>

      <Box sx={{ height: 400, width: "100%" }}>
        <Container>
          <table
            border={1}
            cellPadding={20}
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>About</th>
                <th>Mini Title</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {datas.length > 0 &&
                datas.map((el: any) => {
                  console.log(
                    el.title && `${lang && "uz"}` in el.title && el.title[lang]
                  );

                  return (
                    <tr>
                      <th>{el?.id}</th>
                      <th>
                        {el.title &&
                          `${lang && "uz"}` in el.title &&
                          el.title[lang]}
                      </th>
                      <th>
                        {truncate(
                          el.about &&
                            `${lang && "uz"}` in el.about &&
                            el.about[lang],
                          {
                            length: 22,
                          }
                        )}
                      </th>
                      <th>
                        {truncate(
                          el.miniTitle &&
                            `${lang && "uz"}` in el.miniTitle &&
                            el.miniTitle[lang],
                          {
                            length: 22,
                          }
                        )}
                      </th>
                      <th>
                        <EditOutlined
                          onClick={() => navigate("/pages/")}
                          style={{ color: "green", cursor: "pointer" }}
                        />
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Container>
      </Box>
    </Box>
  );
};

export default Message;
