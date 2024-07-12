import { get } from "lodash";
import { toast } from "react-toastify";
import { useGet, usePut } from "hooks";
import { Button, Input } from "components";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CreateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { data } = useGet({
    queryKey: "User",
    path: `/User/Get?id=${id}`,
  });

  useEffect(() => {
    setRole(get(data, "content.role"));
    setEmail(get(data, "content.email"));
    setUserName(get(data, "content.userName"));
    setPassword(get(data, "content.password"));
  }, [data]);

  const { mutate } = usePut({
    queryKey: "User",
    path: "/User/Update",
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
      id,
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
