import styles from "./Button.module.css";

interface PropTypes {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: "primary" | "secondary";
}

const Button = (props: PropTypes) => {
  const {
    type = "button",
    children,
    color = "primary",
    className = "",
    onClick,
  } = props;

  return (
    <button
      className={`${styles.button} ${styles[`button-${color}`]} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
