import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InputWithLabel from "./InputWithLabel.jsx";

const props = {
	id: "input1",
	value: "React",
	type: "text",
	onInputChange: vi.fn(),
	isFocused: false,
	children: "Search",
};

describe("InputWithLabel", () => {
	it("correct input value", () => {
		render(<InputWithLabel {...props} />);
		const input = screen.getByRole("textbox");
		expect(input.value).toEqual("React");
	});

	it("text in label", () => {
		render(<InputWithLabel {...props} />);
		const label = screen.getByLabelText("Search");
		expect(label).toBeDefined();
	});

	it("change function is called once", () => {
		const fn = vi.fn();
		render(<InputWithLabel {...props} onInputChange={fn} />);
		const input = screen.getByRole("textbox");
		fireEvent.change(input, {
			target: { value: "ForTest" },
		});
		expect(fn).toHaveBeenCalledOnce();
	});

	it("renders snapshot", () => {
		const { container } = render(<InputWithLabel {...props} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
