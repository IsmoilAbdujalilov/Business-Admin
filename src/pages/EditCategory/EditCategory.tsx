import { get } from "lodash";
import { useGet, usePut } from "hooks";
import { toast } from "react-toastify";
import { Button, Input } from "components";
import { FormEvent, useEffect, useState } from "react";
import { Box, Tabs, Typography, Tab } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

interface TabPanelProps {
  value: number;
  index: number;
  children?: React.ReactNode;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingY: "20px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uz, setUz] = useState<string>("");
  const [ru, setRu] = useState<string>("");
  const [en, setEn] = useState<string>("");
  const [stab, setStab] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const lang = searchParams.get("lang");

  const { data } = useGet({
    queryKey: "Category",
    path: `/Category/Get?id=${id}`,
  });

  useEffect(() => {
    setUz(get(data, "content.categoryName.uz"));
    setRu(get(data, "content.categoryName.ru"));
    setEn(get(data, "content.categoryName.en"));
  }, [data]);

  const { mutate } = usePut({
    queryKey: "Category",
    path: "/Category/Update",
    onSuccess: () => {
      toast.success("1 information has been changed", { pauseOnHover: false });

      setTimeout(() => {
        navigate("/pages/category");
      }, 2000);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(get(error, "message"), { pauseOnHover: false });
      }
    },
  });

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      id,
      categoryName: {
        uz,
        ru,
        en,
      },
    };

    mutate(data);
  };

  return (
    <section className="create-category">
      <Box>
        <Tabs
          value={lang === "uz" ? 0 : lang === "ru" ? 1 : lang === "en" ? 2 : 0}
          onChange={handleChangeTab}
        >
          <Tab label="uz" />
          <Tab label="ru" />
          <Tab label="en" />
        </Tabs>
        <form onSubmit={onSubmit}>
          <TabPanel value={stab} index={0}>
            <Input
              required
              fullWidth
              value={uz}
              label="Category"
              onChange={(e) => setUz(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={1}>
            <Input
              required
              fullWidth
              value={ru}
              label="Category"
              onChange={(e) => setRu(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={2}>
            <Input
              required
              fullWidth
              value={en}
              label="Category"
              onChange={(e) => setEn(e.target.value)}
            />
          </TabPanel>
          <Button fullWidth type="submit" variant="contained">
            Send
          </Button>
        </form>
      </Box>
    </section>
  );
};

export default EditCategory;
