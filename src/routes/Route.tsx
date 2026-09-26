import type { RouteObject } from "react-router-dom";

import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import ListOrders from "../components/pages/ListOrder/ListOrder";
import DetailOrder from "../components/pages/DetailOrder";
import CreateOrder from "../components/pages/CreateOrder";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <ListOrders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders/:id",
    element: (
      <ProtectedRoute>
        <DetailOrder />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create",
    element: (
      <ProtectedRoute>
        <CreateOrder />
      </ProtectedRoute>
    ),
  },
];

export default routes;
