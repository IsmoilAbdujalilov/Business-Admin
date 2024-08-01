// import { usePost } from "hooks";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { Button, Input } from "components";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<null | File>(null);

  //   const { mutate } = usePost({
  //     queryKey: "File",
  //     path: "/File/UploadFile",
  //     onSuccess: () => {
  //       toast.success("One file has been created", { pauseOnHover: false });

  //       setTimeout(() => {
  //         navigate("/pages/file");
  //       }, 2000);
  //     },
  //     onError: (error) => {
  //       if (error instanceof Error) {
  //         toast.error(error.message, { pauseOnHover: false });
  //       }
  //     },
  //   });

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch(`${import.meta.env.VITE_REACT_API_URL}/File/UploadFile`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            toast.success("One file has been created", {
              pauseOnHover: false,
            });

            setTimeout(() => {
              navigate("/pages/file");
            }, 2000);
          }
        });
    }
  };

  return (
    <section className="create-category">
      <Box>
        <form onSubmit={onSubmit}>
          <Input
            required
            type="file"
            sx={{ py: "25px" }}
            onChange={uploadFile}
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
