import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import List from "./List";

const storyOne = {
	title: "React",
	url: "https://reactjs.org/",
	author: "Jordan Walke",
	num_comments: 3,
	points: 4,
	objectID: 0,
};

const storyTwo = {
	title: "Redux",
	url: "https://redux.js.org/",
	author: "Dan Abramov, Andrew Clark",
	num_comments: 2,
	points: 5,
	objectID: 1,
};

const stories = [storyOne, storyTwo];

describe("List", () => {
	const onRemoveItem = vi.fn();

	it("count items after rendering", () => {
		render(<List list={stories} onRemoveItem={onRemoveItem} />);
		const list = screen.getAllByRole("listitem");
		expect(list.length).toEqual(2);
	});

	it("clicking the dismiss button calls the callback handler", () => {
		render(<List list={stories} onRemoveItem={onRemoveItem} />);
		const button = screen.getAllByRole("button")[0];
		fireEvent.click(button);
		expect(onRemoveItem).toHaveBeenCalledTimes(1);
	});

	it("renders snapshot", () => {
		const { container } = render(
			<List list={stories} onRemoveItem={onRemoveItem} />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
