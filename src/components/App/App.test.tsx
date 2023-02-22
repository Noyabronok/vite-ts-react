import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import App from "./App";
import { render } from "../../test-utils";

describe("App", () => {
  it("renders headline", async () => {
    render(<App />);

    const header = await screen.findByText("Awesome Stock App");
    expect(header).toBeVisible();
  });

  it("contains footer", async () => {
    render(<App />);

    const footer = await screen.findByText((text) =>
      text.includes("Build version:")
    );
    expect(footer).toBeVisible();
  });
});
