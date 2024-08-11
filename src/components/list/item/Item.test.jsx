import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Item from "./Item";

const story = {
	title: "React",
	url: "https://reactjs.org/",
	author: "Jordan Walke",
	num_comments: 3,
	points: 4,
	objectID: 0,
};

describe("Item", () => {
	it("renders all properties", () => {
		render(<Item item={story} />);

		expect(screen.getByText("Jordan Walke")).toBeInTheDocument();
		expect(screen.getByText("React")).toHaveAttribute(
			"href",
			"https://reactjs.org/",
		);
	});

	it("renders a clickable dismiss button", () => {
		render(<Item item={story} />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("clicking the dismiss button calls the callback handler", () => {
		const handleRemoveItem = vi.fn();
		render(<Item item={story} remove={handleRemoveItem} />);
		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(handleRemoveItem).toHaveBeenCalledTimes(1);
	});

	it("renders snapshot", () => {
		const { container } = render(<Item item={story} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
