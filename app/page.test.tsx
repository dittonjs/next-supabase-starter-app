import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders hello world heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Hello, world!" })
    ).toBeInTheDocument();
  });
});
