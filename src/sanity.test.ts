import { describe, it, expect } from "vitest";

// reminder to use this for looking up what's rendered
// screen.debug();


describe("sanity check", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});
