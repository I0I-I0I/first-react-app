import styles from "./Button.module.css";

const classes = {
	size: {
		small: `${styles.buttonSmall}`,
		large: `${styles.buttonLarge}`,
	},
};

const Button = ({ children, size = "small", ...props }) => (
	<button className={`${styles.button} ${classes.size[size]}`} {...props}>
		{children}
	</button>
);

export default Button;
