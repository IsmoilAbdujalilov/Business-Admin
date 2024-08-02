import { useGet, usePost, usePut } from "hooks";
import { toast } from "react-toastify";
import { Button, Input } from "components";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { get } from "lodash";

const EditMessage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [senderFirstName, setsenderFirstName] = useState<string>("");
  const [senderLastName, setsenderLastName] = useState<string>("");
  const [senderEmail, setSenderEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");
  const [isRead, setIsRead] = useState<boolean>(false);

  const { mutate } = usePut({
    queryKey: "Message",
    path: "/Message/Update",
    onSuccess: () => {
      toast.success("One message has been created", {
        pauseOnHover: false,
      });

      setTimeout(() => {
        navigate("/pages/message");
      }, 2000);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message, { pauseOnHover: false });
      }
    },
  });

  const { data } = useGet({
    queryKey: "Message",
    path: `/Message/GetBy?id=${id}`,
  });

  console.log(data);

  useEffect(() => {
    setsenderFirstName(get(data, "content.senderFirstName", ""));
    setsenderLastName(get(data, "content.senderLastName", ""));
    setSenderEmail(get(data, "content.senderEmail", ""));
    setPhoneNumber(get(data, "content.phoneNumber", ""));
    setMessageText(get(data, "content.messageText", ""));
    setIsRead(get(data, "content.isRead", true));
  }, [data]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      id,
      senderFirstName,
      senderLastName,
      senderEmail,
      phoneNumber,
      messageText,
      isRead,
    };

    mutate(data);
  };

  return (
    <section className="create-message">
      <Box sx={{ paddingY: "40px" }}>
        <form onSubmit={onSubmit}>
          <Input
            required
            fullWidth
            label="First Name"
            sx={{ mb: "10px" }}
            value={senderFirstName}
            onChange={(e) => setsenderFirstName(e.target.value)}
          />
          <Input
            required
            fullWidth
            label="Last Name"
            sx={{ mb: "10px" }}
            value={senderLastName}
            onChange={(e) => setsenderLastName(e.target.value)}
          />
          <Input
            required
            fullWidth
            type="email"
            label="Email"
            sx={{ mb: "10px" }}
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
          />
          <Input
            required
            fullWidth
            type="number"
            value={phoneNumber}
            sx={{ mb: "10px" }}
            label="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input
            required
            fullWidth
            label="Message"
            sx={{ mb: "10px" }}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <FormControlLabel
            label="Read"
            sx={{ mb: "10px" }}
            control={
              <Switch
                checked={isRead}
                onChange={(e) => setIsRead(e.target.checked)}
              />
            }
          />

          <Button fullWidth type="submit" variant="contained">
            Send
          </Button>
        </form>
      </Box>
    </section>
  );
};

export default EditMessage;
