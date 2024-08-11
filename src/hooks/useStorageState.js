import { useEffect, useRef, useState } from "react";

const useStorageState = (key, initialState) => {
	const isMounted = useRef(false);
	const [value, setValue] = useState(localStorage.getItem(key) || initialState);

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
		} else {
			localStorage.setItem(key, value);
		}
	}, [key, value]);

	return [value, setValue];
};

export default useStorageState;
