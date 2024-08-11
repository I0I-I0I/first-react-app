import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import useStorageState from "./hooks/useStorageState";

import StoriesService from "./api/StoriesService";

import List from "./components/list/List";
import SearchForm from "./components/searchForm/SearchForm";

import styles from "./App.module.css";

const getCountCommentsForAllStories = (stories) => {
	return stories.data.reduce(
		(result, value) => result + value.num_comments || 0,
		0,
	);
};

const storiesReducer = (state, action) => {
	switch (action.type) {
		case "STORIES_FETCH_INIT":
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		case "STORIES_FETCH_SUCCESS":
			return {
				...state,
				status: action.status,
				data: action.payload,
				isLoading: false,
				isError: false,
			};
		case "STORIES_FETCH_FAILURE":
			return {
				...state,
				status: action.status,
				isLoading: false,
				isError: true,
			};
		case "REMOVE_STORY":
			return {
				...state,
				data: state.data.filter(
					(story) => story.objectID !== action.payload.objectID,
				),
			};
		default:
			throw new Error();
	}
};

const App = () => {
	const [searchTerm, setSearchTerm] = useStorageState("search", "");
	const [query, setQuery] = useState("");

	const [stories, dispatchStories] = useReducer(storiesReducer, {
		data: [],
		isLoading: false,
		isError: false,
		status: 0,
	});

	console.log(stories);

	const handleFetchStories = useCallback(async () => {
		dispatchStories({ type: "STORIES_FETCH_INIT" });
		const [response, status] = await StoriesService.getStories(query);
		if (status === 200) {
			dispatchStories({
				type: "STORIES_FETCH_SUCCESS",
				payload: response.data.hits,
				status,
			});
		} else {
			dispatchStories({ type: "STORIES_FETCH_FAILURE", status });
		}
	}, [query]);

	useEffect(() => {
		handleFetchStories();
	}, [handleFetchStories]);

	const handleRemoveStory = useCallback((item) => {
		dispatchStories({
			type: "REMOVE_STORY",
			payload: item,
		});
	}, []);

	const handleSearchInput = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		setQuery(searchTerm);
		event.preventDefault();
	};

	const countComments = useMemo(
		() => getCountCommentsForAllStories(stories),
		[stories],
	);

	return (
		<div className={styles.container}>
			<h1 className={styles.headlinePrimary}>
				My Hacker Stories (with {countComments} comments)
			</h1>

			<SearchForm
				searchTerm={searchTerm}
				onSearchInput={handleSearchInput}
				onSearchSubmit={handleSearchSubmit}
			/>

			{stories.isError ? (
				<p>Something went wrong ... (Response status: {stories.status})</p>
			) : stories.isLoading ? (
				<p>Loading...</p>
			) : (
				<List onRemoveItem={handleRemoveStory} list={stories.data} />
			)}
		</div>
	);
};

export default App;
export { storiesReducer };
