import { usePost } from "hooks";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { Button, Input } from "components";
import { FormEvent, useState } from "react";
import { Box, Tabs, Typography, Tab } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EditOutlined } from "@mui/icons-material";

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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lang = searchParams.get("lang") || "uz";

  const { mutate } = usePost({
    queryKey: "FaqQuestion",
    path: "/FaqQuestion/Create",
    onSuccess: () => {
      toast.success("One faq-question has been created", {
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
  const [miniUzTitle, setMiniUzTitle] = useState<string>("");
  const [miniRuTitle, setMiniRuTitle] = useState<string>("");
  const [miniEnTitle, setMiniEnTitle] = useState<string>("");
  const [reasonDtosUz, setReasonDtosUz] = useState<string>("");
  const [reasonDtosRu, setReasonDtosRu] = useState<string>("");
  const [reasonDtosEn, setReasonDtosEn] = useState<string>("");
  const [text, setText] = useState<any>([]);

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
      title: {
        uz,
        ru,
        en,
      },
      about: {
        uz: bodyUz,
        ru: bodyRu,
        en: bodyEn,
      },
    };

    mutate(data);
  };

  const createText = () => {
    if (lang === "uz") {
      setText([...text, { uz: { id: uuid(), text: reasonDtosUz } }]);
    }
    if (lang === "ru") {
      setText([...text, { ru: { id: uuid(), text: reasonDtosUz } }]);
    }
    if (lang === "en") {
      setText([...text, { en: { id: uuid(), text: reasonDtosEn } }]);
    }
  };

  const editModel = (id: string | number) => {
    const editText = text.filter((el: any) => el[lang]);
    // setText(editText);
    console.log(editText[0][lang].id);
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
              label="Title"
              sx={{ mb: "10px" }}
              onChange={(e) => setUz(e.target.value)}
            />
            <Input
              required
              fullWidth
              label="Body"
              value={bodyUz}
              sx={{ mb: "10px" }}
              onChange={(e) => setBodyUz(e.target.value)}
            />
            <Input
              required
              fullWidth
              label="Mini Title"
              value={miniUzTitle}
              sx={{ mb: "10px" }}
              onChange={(e) => setMiniUzTitle(e.target.value)}
            />
            <Box display={"flex"} gap={2}>
              <Input
                required
                fullWidth
                label="Dtos Text"
                value={reasonDtosUz}
                onChange={(e) => setReasonDtosUz(e.target.value)}
              />
              <Button
                fullWidth
                type="button"
                variant="contained"
                onClick={createText}
              >
                Create Text
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value={stab} index={1}>
            <Input
              required
              fullWidth
              value={ru}
              label="Title"
              sx={{ mb: "10px" }}
              onChange={(e) => setRu(e.target.value)}
            />
            <Input
              required
              fullWidth
              label="Body"
              value={bodyRu}
              sx={{ mb: "10px" }}
              onChange={(e) => setBodyRu(e.target.value)}
            />
            <Input
              required
              fullWidth
              label="Mini title"
              sx={{ mb: "10px" }}
              value={miniRuTitle}
              onChange={(e) => setMiniRuTitle(e.target.value)}
            />

            <Box display={"flex"} gap={2}>
              <Input
                required
                fullWidth
                label="Dtos Text"
                value={reasonDtosRu}
                onChange={(e) => setReasonDtosRu(e.target.value)}
              />
              <Button
                fullWidth
                type="button"
                variant="contained"
                onClick={createText}
              >
                Create Text
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value={stab} index={2}>
            <Input
              required
              fullWidth
              value={en}
              label="Title"
              sx={{ mb: "10px" }}
              onChange={(e) => setEn(e.target.value)}
            />
            <Input
              required
              fullWidth
              label="Body"
              value={bodyEn}
              sx={{ mb: "10px" }}
              onChange={(e) => setBodyEn(e.target.value)}
            />
            <Input
              required
              fullWidth
              label="Mini title"
              sx={{ mb: "10px" }}
              value={miniEnTitle}
              onChange={(e) => setMiniEnTitle(e.target.value)}
            />
            <Box display={"flex"} gap={2}>
              <Input
                required
                fullWidth
                label="Dtos Text"
                value={reasonDtosEn}
                onChange={(e) => setReasonDtosEn(e.target.value)}
              />
              <Button
                fullWidth
                type="button"
                variant="contained"
                onClick={createText}
              >
                Create Text
              </Button>
            </Box>
          </TabPanel>
          <table
            border={1}
            style={{
              width: "100%",
              textAlign: "center",
              marginBottom: "25px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Text</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {text.length > 0 &&
                text.map((el: any) => {
                  return (
                    <tr>
                      <td>{el && `${lang}` in el && el[lang]?.text}</td>
                      <td>
                        <EditOutlined
                          onClick={() => editModel(el[lang]?.id)}
                          style={{ color: "green", cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Button fullWidth type="submit" variant="contained">
            Send
          </Button>
        </form>
      </Box>
    </section>
  );
};

export default CreateFaqQuestion;
