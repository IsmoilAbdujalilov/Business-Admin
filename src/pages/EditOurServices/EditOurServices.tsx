import { useGet, usePost, usePut } from "hooks";
import { toast } from "react-toastify";
import { Button, Input } from "components";
import { FormEvent, useEffect, useState } from "react";
import { Box, Tabs, Typography, Tab } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { get } from "lodash";

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

const CreateFaqQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lang = searchParams.get("lang");

  const { mutate } = usePut({
    queryKey: "OurServices",
    path: "/OurServices/Update",
    onSuccess: () => {
      toast.success("One OurServices has been update", {
        pauseOnHover: false,
      });

      setTimeout(() => {
        navigate("/pages/ourservices");
      }, 2000);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message, { pauseOnHover: false });
      }
    },
  });

  const [uz, setUz] = useState<string>("");
  const [ru, setRu] = useState<string>("");
  const [en, setEn] = useState<string>("");
  const [bodyUz, setBodyUz] = useState<string>("");
  const [bodyRu, setBodyRu] = useState<string>("");
  const [bodyEn, setBodyEn] = useState<string>("");
  const [stab, setStab] = useState<number>(0);

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

  const { data } = useGet({
    queryKey: "OurServices",
    path: `http://45.10.162.54:8080/OurServices/GetById?id=${id}`,
  });

  useEffect(() => {
    setUz(get(data, "content.serviceName.uz", ""));
    setRu(get(data, "content.serviceName.ru", ""));
    setEn(get(data, "content.serviceName.en", ""));
    setBodyUz(get(data, "content.aboutService.uz", ""));
    setBodyRu(get(data, "content.aboutService.ru", ""));
    setBodyEn(get(data, "content.aboutService.en", ""));
  }, [data]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      id,
      aboutService: {
        uz,
        ru,
        en,
      },
      serviceName: {
        uz: bodyUz,
        ru: bodyRu,
        en: bodyEn,
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
              value={bodyUz}
              label="Service"
              sx={{ mb: "10px" }}
              onChange={(e) => setBodyUz(e.target.value)}
            />
            <Input
              required
              fullWidth
              value={uz}
              label="AboutService"
              onChange={(e) => setUz(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={1}>
            <Input
              required
              fullWidth
              label="Service"
              value={bodyRu}
              sx={{ mb: "10px" }}
              onChange={(e) => setBodyRu(e.target.value)}
            />
            <Input
              required
              fullWidth
              value={ru}
              label="AboutService"
              onChange={(e) => setRu(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={2}>
            <Input
              required
              fullWidth
              value={bodyEn}
              label="Service"
              sx={{ mb: "10px" }}
              onChange={(e) => setBodyEn(e.target.value)}
            />
            <Input
              required
              fullWidth
              value={en}
              label="AboutService"
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

export default CreateFaqQuestion;
