import InputWithLabel from "../ui/inputWithLabel/InputWithLabel";
import Button from "../ui/button/Button";
import styles from "./SearchForm.module.css";

const SearchForm = ({ onSearchSubmit, searchTerm, onSearchInput }) => (
	<form onSubmit={onSearchSubmit} className={styles.searchForm}>
		<InputWithLabel
			id="search"
			value={searchTerm}
			onInputChange={onSearchInput}
			isFocused
		>
			Search
		</InputWithLabel>

		<Button type="submit" size="large" disabled={!searchTerm}>
			Search
		</Button>
	</form>
);

export default SearchForm;
