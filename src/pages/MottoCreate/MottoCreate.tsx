import { usePost } from "hooks";
import { toast } from "react-toastify";
import { Button, Input } from "components";
import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Tabs, Typography, Tab } from "@mui/material";

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

const MottoCreate = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lang = searchParams.get("lang");

  const { mutate } = usePost({
    queryKey: "Motto",
    path: "/Motto/Create",
    onSuccess: () => {
      toast.success("One motto has been created", { pauseOnHover: false });

      setTimeout(() => {
        navigate("/pages/motto");
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
  const [stab, setStab] = useState<number>(0);
  const [author, setAuthor] = useState<string>("");

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
      author,
      text: {
        uz,
        ru,
        en,
      },
    };

    mutate(data);
  };

  return (
    <section className="create-motto">
      <Box>
        <Tabs
          value={lang === "uz" ? 0 : lang === "ru" ? 1 : lang === "en" ? 2 : 0}
          onChange={handleChangeTab}
        >
          <Tab label="uz" />
          <Tab label="ru" />
          <Tab label="en" />
        </Tabs>
        <form onSubmit={onSubmit} style={{ padding: "15px 0px" }}>
          <Input
            required
            fullWidth
            value={author}
            label="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <TabPanel value={stab} index={0}>
            <Input
              required
              fullWidth
              value={uz}
              label="Text"
              onChange={(e) => setUz(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={1}>
            <Input
              required
              fullWidth
              value={ru}
              label="Text"
              onChange={(e) => setRu(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={2}>
            <Input
              required
              fullWidth
              value={en}
              label="Text"
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

export default MottoCreate;
