import Button, { ButtonProps } from "@mui/material/Button";

const ButtonComponent = ({ children, ...res }: ButtonProps) => {
  return <Button {...res}>{children}</Button>;
};

export default ButtonComponent;
