import Item from "./item/Item";

const List = ({ onRemoveItem, list }) => (
	<ul>
		{list.map((item) => (
			<Item key={item.objectIDkey} item={item} remove={onRemoveItem} />
		))}
	</ul>
);

export default List;
