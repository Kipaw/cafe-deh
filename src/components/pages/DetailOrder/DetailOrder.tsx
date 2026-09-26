import { Link, useParams } from "react-router-dom";
import styles from "./DetailOrder.module.css";
import { useEffect, useState } from "react";
import { getOrderById } from "../../../services/order.service";
import Button from "../../ui/Button";
import type { IOrderDetail } from "../../../types/order";

const DetailOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const result = await getOrderById(id);
        setOrder(result);
      } catch (error) {
        console.error("Gagal ambil detail order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Order tidak ditemukan</p>;
  }

  return (
    <main className={styles.detail}>
      <section className={styles.header}>
        <h1>Detail Order</h1>
        <Link to="/orders">
          <Button>Back</Button>
        </Link>
      </section>
      <section>
        <div className={styles.order}>
          <div className={styles.info}>
            <div className={styles.item}>
              <p>Order ID:</p>
              <h4>{order.id}</h4>
            </div>
            <div className={styles.item}>
              <p>Customer:</p>
              <h4>{order.customer_name}</h4>
            </div>
            <div className={styles.item}>
              <p>Table:</p>
              <h4>{order.table_number}</h4>
            </div>
            <div className={styles.item}>
              <p>Status:</p>
              <h4>{order.status}</h4>
            </div>
            <div className={styles.item}>
              <p>Total:</p>
              <h4>${order.total}</h4>
            </div>
          </div>
          <div className={styles.cart}>
            <h3>Order Items</h3>
            <div className={styles.list}>
              {order.cart.map((item, index) => (
                <div className={styles.item} key={index}>
                  <img
                    className={styles.image}
                    src={item.menuItem.image_url}
                    alt={item.menuItem.name}
                  />
                  <p className={styles.name}>
                    {item.quantity} x {item.menuItem.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailOrder;
