import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField/TextField";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function StateTextFields() {
  const [name, setName] = React.useState("Cat in the Hat");

  const [stab, setStab] = React.useState<number>(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setStab(newValue);
  };

  // possible issue when using this (TabPanel) custom component

  return (
    <Box>
      <Tabs value={stab} onChange={handleChangeTab}>
        <Tab label="First Tab" />
        <Tab label="Tab With Texfield" />
      </Tabs>
      <TabPanel value={stab} index={0}>
        First Tab Content
      </TabPanel>
      <TabPanel value={stab} index={1}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </TabPanel>
    </Box>
  );
}
