import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  it("renders headline", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const header = await screen.findByText("Awesome Stock App");
    expect(header).toBeVisible();
  });

  it("contains footer", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const footer = await screen.findByText((text) => text.includes("Build version:"));
    expect(footer).toBeVisible();
  });
});
