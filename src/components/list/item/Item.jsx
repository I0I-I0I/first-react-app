import styles from "./Item.module.css";
import Button from "../../ui/button/Button";

const Item = ({ item, remove }) => (
	<li key={item.objectIDkey} className={styles.item}>
		<a target="_blank" style={{ width: "40%" }} href={item.url}>
			{item.title}
		</a>
		<span style={{ width: "30%" }}>{item.author}</span>
		<span style={{ width: "10%" }}>{item.num_comments}</span>
		<span style={{ width: "10%" }}>{item.points}</span>
		<span style={{ width: "10%" }}>
			<Button onClick={() => remove(item)} size="small">
				delete
			</Button>
		</span>
	</li>
);

export default Item;
