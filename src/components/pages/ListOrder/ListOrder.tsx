import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ListOrder.module.css";
import Button from "../../ui/Button";
import { getOrders, updateOrder } from "../../../services/order.service";
import type { IOrder } from "../../../types/order";

const ListOrder = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await getOrders();
      setOrders(result.data);
    } catch (error) {
      console.error("Gagal ambil orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleComplete = async (id: string) => {
    try {
      await updateOrder(id, { status: "COMPLETED" });
      fetchOrders();
    } catch (error) {
      console.error("Gagal update status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <main className={styles.order}>
      <section className={styles.header}>
        <h1 className={styles.title}>Order List</h1>
        <div className={styles.button}>
          <Link to="/create">
            <Button>Create Order</Button>
          </Link>
          <Button color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </section>

      <section>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table
            border={1}
            className={styles.table}
            cellSpacing={0}
            cellPadding={0}
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Customer Name</th>
                <th>Table Number</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6}>Belum ada order</td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.table_number}</td>
                    <td>{order.total}</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          order.status === "COMPLETED"
                            ? styles.statusDone
                            : order.status === "PROCESSING"
                              ? styles.statusProcess
                              : styles.statusPending
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className={styles.action}>
                      <Link to={`/orders/${order.id}`}>
                        <Button>Detail</Button>
                      </Link>
                      {order.status === "PROCESSING" && (
                        <Button onClick={() => handleComplete(order.id)}>
                          Completed
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default ListOrder;
