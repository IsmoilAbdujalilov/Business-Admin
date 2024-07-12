import { get } from "lodash";
import { useGet, usePut } from "hooks";
import { toast } from "react-toastify";
import { Button, Input } from "components";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, FormControlLabel, Switch } from "@mui/material";

const CreateMessage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<string>("");
  const [isRead, setIsRead] = useState<boolean>(false);
  const [senderName, setSenderName] = useState<string>("");
  const [senderEmail, setSenderEmail] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");

  const { mutate } = usePut({
    queryKey: "Message",
    path: "/Message/Update",
    onSuccess: () => {
      toast.success("One message has been updated", {
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

  useEffect(() => {
    setIsRead(get(data, "content.isRead"));
    setSubject(get(data, "content.subject"));
    setSenderName(get(data, "content.senderName"));
    setSenderEmail(get(data, "content.senderEmail"));
    setMessageText(get(data, "content.messageText"));
  }, [data]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      id,
      senderName,
      senderEmail,
      subject,
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
            label="Name"
            value={senderName}
            sx={{ mb: "10px" }}
            onChange={(e) => setSenderName(e.target.value)}
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
            label="Subject"
            value={subject}
            sx={{ mb: "10px" }}
            onChange={(e) => setSubject(e.target.value)}
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

export default CreateMessage;
