// Dipakai untuk request Create Order (POST /api/orders)
interface ICart {
  menuId: string;
  quantity: number;
  notes: string;
}

// Dipakai untuk List Order (GET /api/orders)
interface IOrder {
  id: string;
  customer_name: string;
  table_number: number;
  cart: ICart[];
  status: "PENDING" | "PROCESSING" | "COMPLETED";
  total: number;
}

// Detail menu item, muncul di dalam cart pada Detail Order
interface IMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available: boolean;
  created_at: string;
}

// Bentuk cart khusus di Detail Order (GET /api/orders/[id]) — beda dari ICart,
// karena isinya object menuItem lengkap, bukan cuma menuId
interface ICartDetailItem {
  quantity: number;
  notes: string;
  menuItem: IMenuItem;
}

// Dipakai untuk Detail Order (GET /api/orders/[id])
interface IOrderDetail {
  id: string;
  customer_name: string;
  table_number: number;
  cart: ICartDetailItem[];
  status: "PENDING" | "PROCESSING" | "COMPLETED";
  total: number;
  created_at: string;
  updated_at: string;
}

// Dipakai untuk CreateOrder: item menu yang tampil di list, dari GET /api/menu
interface IMenuListItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available: boolean;
}

// Dipakai untuk CreateOrder: item yang ada di keranjang sementara sebelum submit
interface ICartItem {
  id: string;
  name: string;
  quantity: number;
}

export type {
  IOrder,
  ICart,
  IMenuItem,
  ICartDetailItem,
  IOrderDetail,
  IMenuListItem,
  ICartItem,
};
