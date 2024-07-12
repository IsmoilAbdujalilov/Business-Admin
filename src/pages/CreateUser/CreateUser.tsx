import { usePost } from "hooks";
import { FormEvent, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import { Button, Input } from "components";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("Admin");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate } = usePost({
    queryKey: "User",
    path: "/User/Create",
    onSuccess: () => {
      toast.success("One user has been created", { pauseOnHover: false });

      setTimeout(() => {
        navigate("/pages/users");
      }, 2000);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message, { pauseOnHover: false });
      }
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      userName,
      email,
      password,
      role,
    };

    mutate(data);
  };

  return (
    <section className="create-category">
      <Box sx={{ paddingY: "25px" }}>
        <form onSubmit={onSubmit}>
          <Input
            required
            fullWidth
            label="Username"
            value={userName}
            sx={{ mb: "15px" }}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            required
            fullWidth
            type="email"
            label="Email"
            value={email}
            sx={{ mb: "15px" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            fullWidth
            type="password"
            value={password}
            label="Password"
            sx={{ mb: "15px" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl fullWidth sx={{ mb: "15px" }}>
            <InputLabel id="demo-simple-select-label">Admin</InputLabel>
            <Select
              label="Role"
              value={role}
              id="demo-simple-select"
              labelId="demo-simple-select-label"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"SuperAdmin"}>SuperAdmin</MenuItem>
            </Select>
          </FormControl>
          <Button fullWidth type="submit" variant="contained">
            Send
          </Button>
        </form>
      </Box>
    </section>
  );
};

export default CreateCategory;
