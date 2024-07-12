import { useState } from "react";
import { usePostId } from "hooks";
import { storage } from "services";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { Button, Menu, Box } from "@mui/material";

const MenuComponent = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  type dataTypes = {
    id: any;
    token: string | null;
    userName: string | null;
  };

  const { mutate } = usePostId({
    queryKey: "Auth",
    path: `/Auth/LogOut`,
    onSuccess: () => {
      navigate("/pages/login");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message, {
          pauseOnHover: false,
        });
      }
    },
  });

  const data: dataTypes = JSON.parse(storage.get("data") as string) || {};

  return (
    <Box>
      <Button
        type="button"
        id="basic-button"
        color="inherit"
        aria-haspopup="true"
        onClick={handleClick}
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? "basic-menu" : undefined}
      >
        {data.token && data.userName}
      </Button>
      <Menu
        open={open}
        id="basic-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => mutate(data.id)}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default MenuComponent;
