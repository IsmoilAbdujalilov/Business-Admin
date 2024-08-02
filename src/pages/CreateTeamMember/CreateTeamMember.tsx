import { usePost } from "hooks";
import { toast } from "react-toastify";
import { Button, Input } from "components";
import { ChangeEvent, FormEvent, useState } from "react";
import { Box, Tabs, Typography, Tab } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

interface TabPanelProps {
  value: number;
  index: number;
  children?: React.ReactNode;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
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

const CreateFaqQuestion = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [imageId, setImageId] = useState<File | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "uz";

  const { mutate } = usePost({
    queryKey: "TeamMember",
    path: "/TeamMember/Create",
    onSuccess: () => {
      toast.success("One value has been created", { pauseOnHover: false });
      setTimeout(() => navigate("/pages/team-member"), 2000);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message, { pauseOnHover: false });
      }
    },
  });

  const [fullName, setFullName] = useState<string>("");
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [data, setData] = useState<{ [key: string]: any }>({
    uz: [],
    ru: [],
    en: [],
  });
  const [textInputs, setTextInputs] = useState<{ [key: string]: string }>({
    uz: "",
    ru: "",
    en: "",
  });
  const [roleInputs, setRoleInputs] = useState<{ [key: string]: string }>({
    uz: "",
    ru: "",
    en: "",
  });

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    const langs = ["uz", "ru", "en"];
    setSearchParams({ lang: langs[newValue] });
  };

  const handleTextChange = (lang: string, text: string) => {
    setTextInputs((prev) => ({ ...prev, [lang]: text }));
  };

  const handleRoleChange = (lang: string, text: string) => {
    setRoleInputs((prev) => ({ ...prev, [lang]: text }));
  };

  const handleCreateText = (lang: string) => {
    setData((prev) => ({
      ...prev,
      [lang]: [
        ...prev[lang],
        { text: textInputs[lang], id: new Date().getTime() },
      ],
    }));
    handleTextChange(lang, "");
  };

  const handleDeleteText = (lang: string, id: number) => {
    setData((prev) => ({
      ...prev,
      [lang]: prev[lang].filter((item: { id: number }) => item.id !== id),
    }));
  };

  const handleEditText = (lang: string, id: number) => {
    const item = data[lang].find((item: { id: number }) => item.id === id);
    handleDeleteText(lang, id);
    handleTextChange(lang, item.text);
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageId(e.target.files[0]);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      fullName,
      role: {
        uz: roleInputs.uz,
        ru: roleInputs.ru,
        en: roleInputs.en,
      },
      skills: [
        {
          text: {
            uz: textInputs.uz,
            ru: textInputs.ru,
            en: textInputs.en,
          },
        },
      ],
      imageId: id,
    });
  };

  const postData = () => {
    if (imageId) {
      const formData = new FormData();
      formData.append("file", imageId);

      fetch(`${import.meta.env.VITE_REACT_API_URL}/File/UploadFile`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            setId(data.content.id);
            toast.success("One file has been created", {
              pauseOnHover: false,
            });
          }
        });
    }
  };

  return (
    <section className="create-category">
      <Box>
        <Tabs value={tabIndex} onChange={handleChangeTab}>
          <Tab label="uz" />
          <Tab label="ru" />
          <Tab label="en" />
        </Tabs>
        <form onSubmit={onSubmit}>
          <Input
            required
            fullWidth
            value={fullName}
            label="Full Name"
            sx={{ mt: "20px", mb: "-10px" }}
            onChange={(e) => setFullName(e.target.value)}
          />
          {["uz", "ru", "en"].map((lang, index) => (
            <TabPanel value={tabIndex} index={index} key={lang}>
              <Input
                required
                fullWidth
                label="Role"
                sx={{ mb: "10px" }}
                value={roleInputs[lang]}
                onChange={(e) => handleRoleChange(lang, e.target.value)}
              />
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Input
                  fullWidth
                  label="Text"
                  value={textInputs[lang]}
                  onChange={(e) => handleTextChange(lang, e.target.value)}
                />
                <Button
                  fullWidth
                  type="button"
                  variant="contained"
                  onClick={() => handleCreateText(lang)}
                >
                  Create Text
                </Button>
              </Box>
            </TabPanel>
          ))}
          <table
            style={{
              width: "100%",
              textAlign: "center",
              marginBottom: "25px",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>Text</th>
                <th style={{ border: "1px solid black" }}>Edit</th>
                <th style={{ border: "1px solid black" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data[lang].map(({ text, id }: { text: string; id: number }) => (
                <tr key={id}>
                  <td style={{ border: "1px solid black" }}>{text}</td>
                  <td style={{ border: "1px solid black" }}>
                    <EditOutlined
                      color="primary"
                      onClick={() => handleEditText(lang, id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <DeleteOutline
                      color="error"
                      onClick={() => handleDeleteText(lang, id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Box
            component="div"
            sx={{
              mb: "15px",
              gap: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              required
              fullWidth
              type="file"
              onChange={handleUploadImage}
            />
            <Button
              fullWidth
              type="button"
              onClick={postData}
              variant="contained"
              sx={{ paddingY: "15px" }}
            >
              Send
            </Button>
          </Box>

          <Button fullWidth type="submit" variant="contained">
            Send
          </Button>
        </form>
      </Box>
    </section>
  );
};

export default CreateFaqQuestion;
