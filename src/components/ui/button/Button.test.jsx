import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "./Button.jsx";

describe("Button", () => {
	it("correct display passed text", () => {
		render(<Button>Test</Button>);
		expect(screen.getByText("Test")).toBeTruthy();
	});

	it("get correct props", () => {
		render(
			<Button size="large" disabled>
				Test
			</Button>,
		);

		const button = screen.getByRole("button");

		expect(button.disabled).toBeTruthy();
		expect(button.className).toMatch(/buttonLarge/);
	});

	it("snapshot", () => {
		const { container } = render(
			<Button size="large" disabled>
				Test
			</Button>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
