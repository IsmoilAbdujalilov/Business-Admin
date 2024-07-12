import { usePost } from "hooks";
import { storage } from "services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Button,
  Avatar,
  Container,
  TextField,
  Typography,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const defaultTheme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();

  type authDataTypes = {
    email: string;
    password: string;
  };

  type successContent = {
    id: number;
    role: string;
    email: string;
    token: string;
    password: string;
    userName: string;
    isSigned: boolean;
  };

  type successData = {
    id: string;
    code: number;
    content: successContent;
    error: null | undefined;
    total: null | undefined;
    modelStateError: null | undefined;
  };

  const toastProperties = {
    pauseOnHover: false,
  };

  const [authData, setAuthData] = useState<authDataTypes>({
    email: "",
    password: "",
  });

  const { mutate } = usePost({
    queryKey: "login",
    path: "/Auth/Login",
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message, toastProperties);
      }
    },
    onSuccess: (data: unknown) => {
      const typeData = data as successData;
      const { token, userName } = typeData.content;
      const privateData = {
        token,
        userName,
        id: typeData.id,
      };

      toast.success("You have registered", toastProperties);

      setTimeout(() => {
        storage.set("data", privateData);
        navigate("/");
      }, 2000);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAuthData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate(authData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          padding: "125px 0px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              required
              fullWidth
              autoFocus
              id="email"
              name="email"
              type="email"
              label="Email"
              margin="normal"
              value={authData.email}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              id="password"
              margin="normal"
              name="password"
              type="password"
              label="Password"
              onChange={handleChange}
              value={authData.password}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
