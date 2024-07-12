import { get } from "lodash";
import { api } from "services";
import { useMutation } from "@tanstack/react-query";

type typeUsePost = {
  path: string;
  queryKey: string;
  onError: (data: unknown) => void;
  onSuccess: (data: unknown) => void;
};

const usePostId = ({
  path = "",
  onError = () => {},
  onSuccess = () => {},
}: typeUsePost) => {
  const response = useMutation({
    mutationFn: (id: string) => {
      return api.post(`${path}?=${id}`).then((response) => {
        return get(response, "data");
      });
    },
    onError: (error) => onError(error),
    onSuccess: (successData) => onSuccess(successData),
  });
  return response;
};

export default usePostId;
