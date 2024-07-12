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

const CreateCategory = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lang = searchParams.get("lang");

  const { mutate } = usePost({
    queryKey: "Contact",
    path: "/Contact/Create",
    onSuccess: () => {
      toast.success("One contact has been created", { pauseOnHover: false });

      setTimeout(() => {
        navigate("/pages/contact");
      }, 2000);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message, { pauseOnHover: false });
      }
    },
  });

  const [web, setWeb] = useState<string>("");
  const [stab, setStab] = useState<number>(0);
  const [home, setHome] = useState<string>("");
  const [uzName, setUzName] = useState<string>("");
  const [ruName, setRuName] = useState<string>("");
  const [enName, setEnName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [emailUz, setEmailUz] = useState<string>("");
  const [emailRu, setEmailRu] = useState<string>("");
  const [emailEn, setEmailEn] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [number, setNumber] = useState<number | string>(0);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [locationNameUz, setLocationNameUz] = useState<string>("");
  const [locationNameRu, setLocationNameRu] = useState<string>("");
  const [locationNameEn, setLocationNameEn] = useState<string>("");
  const [workingDayStop, setWorkingDayStop] = useState<string>("");
  const [workingDayStart, setWorkingDayStart] = useState<string>("");
  const [workingTimeStop, setWorkingTimeStop] = useState<string>("");
  const [workingTimeStart, setWorkingTimeStart] = useState<string>("");
  const [phoneNumberNameUz, setPhoneNumberNameUz] = useState<string>("");
  const [phoneNumberNameRu, setPhoneNumberNameRu] = useState<string>("");
  const [phoneNumberNameEn, setPhoneNumberNameEn] = useState<string>("");

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
      name: {
        uz: uzName,
        ru: ruName,
        en: enName,
      },
      emailDto: {
        name: {
          uz: emailUz,
          ru: emailRu,
          en: emailEn,
        },
        emailAddress,
        web,
      },
      phoneNumberDto: {
        name: {
          uz: phoneNumberNameUz,
          ru: phoneNumberNameRu,
          en: phoneNumberNameEn,
        },
        number,
        workingDayStop,
        workingTimeStop,
        workingDayStart,
        workingTimeStart,
      },
      locationDto: {
        name: {
          uz: locationNameUz,
          ru: locationNameRu,
          en: locationNameEn,
        },
        country,
        region,
        district,
        street,
        home,
      },
    };

    mutate(data);
  };

  return (
    <section className="create-category">
      <Box>
        <Tabs
          onChange={handleChangeTab}
          value={lang === "uz" ? 0 : lang === "ru" ? 1 : lang === "en" ? 2 : 0}
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
              label="Name"
              value={uzName}
              onChange={(e) => setUzName(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={1}>
            <Input
              required
              fullWidth
              label="Name"
              value={ruName}
              onChange={(e) => setRuName(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={2}>
            <Input
              required
              fullWidth
              label="Name"
              value={enName}
              onChange={(e) => setEnName(e.target.value)}
            />
          </TabPanel>
          {/* name end */}
          <TabPanel value={stab} index={0}>
            <Input
              required
              fullWidth
              value={emailUz}
              label="Email Name"
              onChange={(e) => setEmailUz(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={1}>
            <Input
              required
              fullWidth
              value={emailRu}
              label="Email Name"
              onChange={(e) => setEmailRu(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={2}>
            <Input
              required
              fullWidth
              value={emailEn}
              label="Email Name"
              onChange={(e) => setEmailEn(e.target.value)}
            />
          </TabPanel>
          {/* email dto name */}
          <Input
            required
            fullWidth
            sx={{ mb: "15px" }}
            value={emailAddress}
            label="Email Address"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <Input
            required
            fullWidth
            label="Web"
            value={web}
            sx={{ mb: "15px" }}
            onChange={(e) => setWeb(e.target.value)}
          />
          {/* email dto component end */}
          <TabPanel value={stab} index={0}>
            <Input
              required
              fullWidth
              value={phoneNumberNameUz}
              label="Phone Number Name"
              onChange={(e) => setPhoneNumberNameUz(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={1}>
            <Input
              required
              fullWidth
              value={phoneNumberNameRu}
              label="Phone Number Name"
              onChange={(e) => setPhoneNumberNameRu(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={2}>
            <Input
              required
              fullWidth
              value={phoneNumberNameEn}
              label="Phone Number Name"
              onChange={(e) => setPhoneNumberNameEn(e.target.value)}
            />
          </TabPanel>
          {/* phone number name end */}
          <TabPanel value={stab} index={0}>
            <Input
              required
              fullWidth
              value={locationNameUz}
              label="Location Name"
              onChange={(e) => setLocationNameUz(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={1}>
            <Input
              required
              fullWidth
              value={locationNameRu}
              label="Location Name"
              onChange={(e) => setLocationNameRu(e.target.value)}
            />
          </TabPanel>
          <TabPanel value={stab} index={2}>
            <Input
              required
              fullWidth
              value={locationNameEn}
              label="Location Name"
              onChange={(e) => setLocationNameEn(e.target.value)}
            />
          </TabPanel>
          <Input
            required
            fullWidth
            type="number"
            value={number}
            label="Number"
            sx={{ mb: "15px" }}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Input
            required
            fullWidth
            type="number"
            sx={{ mb: "15px" }}
            value={workingTimeStart}
            label="Working Time Start"
            onChange={(e) => setWorkingTimeStart(e.target.value)}
          />
          <Input
            required
            fullWidth
            type="number"
            sx={{ mb: "15px" }}
            value={workingTimeStop}
            label="Working Time Stop"
            onChange={(e) => setWorkingTimeStop(e.target.value)}
          />
          <Input
            required
            fullWidth
            type="number"
            sx={{ mb: "15px" }}
            value={workingDayStart}
            label="Working Day Start"
            onChange={(e) => setWorkingDayStart(e.target.value)}
          />
          <Input
            required
            fullWidth
            type="number"
            sx={{ mb: "15px" }}
            value={workingDayStop}
            label="Working Day Stop"
            onChange={(e) => setWorkingDayStop(e.target.value)}
          />
          <Input
            required
            fullWidth
            label="Country"
            value={country}
            sx={{ mb: "15px" }}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            required
            fullWidth
            label="Region"
            value={region}
            sx={{ mb: "15px" }}
            onChange={(e) => setRegion(e.target.value)}
          />
          <Input
            required
            fullWidth
            label="District"
            value={district}
            sx={{ mb: "15px" }}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <Input
            required
            fullWidth
            label="Street"
            value={street}
            sx={{ mb: "15px" }}
            onChange={(e) => setStreet(e.target.value)}
          />
          <Input
            required
            fullWidth
            label="Home"
            value={home}
            sx={{ mb: "15px" }}
            onChange={(e) => setHome(e.target.value)}
          />
          <Button fullWidth type="submit" variant="contained">
            Send
          </Button>
        </form>
      </Box>
    </section>
  );
};

export default CreateCategory;
