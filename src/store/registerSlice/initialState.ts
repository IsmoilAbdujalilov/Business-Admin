import { storage } from "services";

export type registerType = {
  token: string | null | undefined;
  username: string | null | undefined;
};

const initialState: registerType = {
  username: "",
  token: storage.get("token") || "",
};

export { initialState };
