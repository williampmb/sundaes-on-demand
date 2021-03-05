import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

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

    userEvent.click(checkbox);
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

describe("pophover", () => {
  it("Should popover responds to hover", async () => {
    render(<SummaryForm />);
    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivery/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    //popover appers upon mouseover of checbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(/no ice cream will actually be delivery/i);
    expect(popover).toBeInTheDocument();

    //popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivery/i)
    );
  });
});
