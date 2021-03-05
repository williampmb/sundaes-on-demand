import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("Sumamary Form Component", () => {
  it("Should render checkbox and it's unchecked", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });

    expect(checkbox).not.toBeChecked();
  });

  it("Should enable button when checking checkbox", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const btnConfirm = screen.getByRole("button", { name: /confirm order/i });

    fireEvent.click(checkbox);
    expect(btnConfirm).toBeEnabled();
  });

  it("Should disable btn when checkbox is unchecked", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const btnConfirm = screen.getByRole("button", { name: /confirm order/i });

    expect(checkbox).not.toBeChecked();
    expect(btnConfirm).toBeDisabled();
  });
});
