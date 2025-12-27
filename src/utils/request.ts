import { getToken } from ".";
import config from "../app/config";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  method?: RequestMethod;
  body?: any;
  headers?: Record<string, string>;
}
let logoutHandler: () => void = () => {};

export const setLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};

const request = async <T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<T> => {
  const fullUrl = `${config.apiBaseUrl}${url}`;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken() || ""}`,
  };

  const fetchOptions: RequestInit = {
    headers: { ...defaultHeaders, ...options.headers },
    method: options.method || "GET",
    ...options,
  };

  if (
    fetchOptions.body &&
    typeof fetchOptions.body === "object" &&
    !(fetchOptions.body instanceof FormData)
  ) {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  try {
    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
      if (response.status === 401) {
        logoutHandler();
      }
      throw new Error(
        `request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    console.error(`request error [${url}]:`, error);
    throw error;
  }
};

export const get = <T = any>(
  url: string,
  params: Record<string, any> = {}
): Promise<T> => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const finalUrl = queryString ? `${url}?${queryString}` : url;
  return request<T>(finalUrl, { method: "GET" });
};

export const post = <T = any>(
  url: string,
  data: Record<string, any> = {},
  options: RequestOptions = {}
): Promise<T> => {
  return request<T>(url, {
    method: "POST",
    body: data,
    ...options,
  });
};

export const put = <T = any>(
  url: string,
  data: Record<string, any> = {},
  options: RequestOptions = {}
): Promise<T> => {
  return request<T>(url, {
    method: "PUT",
    body: data,
    ...options,
  });
};

export const del = <T = any>(
  url: string,
  params: Record<string, any> = {},
  options: RequestOptions = {}
): Promise<T> => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const finalUrl = queryString ? `${url}?${queryString}` : url;
  return request<T>(finalUrl, {
    method: "DELETE",
    ...options,
  });
};

export default request;
