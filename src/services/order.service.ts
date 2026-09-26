import { environtment } from "../constants/environtment";
import { getLocalStorage } from "../utils/storage";
import { fetchAPI } from "../utils/fetch";

export const getOrders = async () => {
  const url = `${environtment.API_URL}/orders?page=1&pageSize=10`;

  const result = await fetchAPI(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getLocalStorage("auth")}`,
    },
  });

  return result;
};

export const getOrderById = async (id: string) => {
  const url = `${environtment.API_URL}/orders/${id}`;

  const result = await fetchAPI(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getLocalStorage("auth")}`,
    },
  });

  return result;
};

export const createOrder = async (payload: {
  customerName: string;
  tableNumber: number;
  cart: { menuItemId: string; quantity: number; notes: string }[];
}) => {
  const result = await fetchAPI(`${environtment.API_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getLocalStorage("auth")}`,
    },
    body: JSON.stringify(payload),
  });

  return result;
};

export const updateOrder = async (id: string, payload: { status: string }) => {
  const result = await fetchAPI(`${environtment.API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getLocalStorage("auth")}`,
    },
    body: JSON.stringify(payload),
  });

  return result;
};

export const getMenu = async (category?: string) => {
  const params = new URLSearchParams({ page: "1", pageSize: "50" });
  if (category) params.set("category", category);

  const url = `${environtment.API_URL}/menu?${params.toString()}`;

  return fetchAPI(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getLocalStorage("auth")}`,
    },
  });
};
