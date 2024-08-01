import { useGet, usePost } from "hooks";
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

const CreateFaqQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lang = searchParams.get("lang");

  const { mutate } = usePost({
    queryKey: "FaqQuestion",
    path: "/FaqQuestion/Create",
    onSuccess: () => {
      toast.success("One faq-question has been edited", {
        pauseOnHover: false,
      });

      setTimeout(() => {
        navigate("/pages/faq-question");
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
    queryKey: "FaqQuestion",
    path: `/FaqQuestion/GetById?id=${id}`,
  });

  useEffect(() => {
    setUz(data.content.answer.uz);
    setRu(data.content.answer.ru);
    setEn(data.content.answer.en);
    setBodyUz(data.content.answer.uz);
    setBodyRu(data.content.answer.ru);
    setBodyEn(data.content.answer.en);
  }, [data]);

  console.log(data);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      answer: {
        uz,
        ru,
        en,
      },
      question: {
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
              label="Question"
              sx={{ mb: "10px" }}
              onChange={(e) => setBodyUz(e.target.value)}
            />
            <Input
              required
              fullWidth
              value={uz}
              label="Answer"
              onChange={(e) => setUz(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={1}>
            <Input
              required
              fullWidth
              value={bodyRu}
              label="Question"
              sx={{ mb: "10px" }}
              onChange={(e) => setBodyRu(e.target.value)}
            />
            <Input
              required
              fullWidth
              value={ru}
              label="Answer"
              onChange={(e) => setRu(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={2}>
            <Input
              required
              fullWidth
              value={bodyEn}
              label="Question"
              sx={{ mb: "10px" }}
              onChange={(e) => setBodyEn(e.target.value)}
            />
            <Input
              required
              fullWidth
              value={en}
              label="Answer"
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
