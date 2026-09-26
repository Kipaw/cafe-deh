import { environtment } from "../constants/environtment";
import type { ILogin } from "../types/auth";
import { fetchAPI } from "../utils/fetch";

export const login = async (payload: ILogin) => {
  const result = await fetchAPI(`${environtment.API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return result;
};
