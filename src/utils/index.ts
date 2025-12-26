import { TOKEN_KEY } from "../app/config";

export const saveToken = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};
