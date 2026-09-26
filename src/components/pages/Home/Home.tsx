import styles from "./Home.module.css";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className={styles.home}>
      <h1>Welcome To Cafe Deh</h1>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </main>
  );
};

export default Home;
