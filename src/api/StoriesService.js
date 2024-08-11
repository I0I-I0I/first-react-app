import axios from "axios";

const URL = "https://hn.algolia.com/api/v1/search?query=React";

export default class StoriesService {
	static async getStories(searchTerm) {
		try {
			const response = await axios.get(URL, {
				params: {
					query: searchTerm,
				},
			});
			return [response, response.status];
		} catch (err) {
			console.error(err);
			return [null, err.response.status];
		}
	}
}
