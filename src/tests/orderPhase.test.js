import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Order Phases Path", () => {
  it.only("Gold path: pick, review and confirm order", async () => {
    // render app
    render(<App></App>);

    // add topings and scoops
    const scoopOpt = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });

    const toppingOpt = await screen.findByRole("checkbox", {
      name: /hot fudge/i,
    });

    userEvent.clear(scoopOpt);
    userEvent.type(scoopOpt, "2");
    userEvent.click(toppingOpt);

    // go to next phase
    const btnOrderSundae = await screen.findByRole("button", {
      name: /order sundae/i,
    });
    userEvent.click(btnOrderSundae);

    // check summary information based on order
    const chocolateSummary = await screen.findByText(/Chocolate$/);
    expect(chocolateSummary).toHaveTextContent("2");

    const hotFudgeSummary = await screen.findByText(/hot fudge/i);
    expect(hotFudgeSummary).not.toBeUndefined();

    // accept terms and conditions and click button to confirm order to go to next phase
    const termAndConditions = await screen.findByRole("checkbox", {
      name: /terms and conditions/i,
    });
    userEvent.click(termAndConditions);
    expect(termAndConditions).toBeChecked();

    const btnConfirmOrder = await screen.findByRole("button", {
      name: /confirm order/i,
    });
    expect(btnConfirmOrder).toBeEnabled();
    userEvent.click(btnConfirmOrder);

    // confirm order number on confirmation page and go to the next phasae
    const orderNumberPhrase = await screen.findByText(/your order number/i);
    const orderNumber = orderNumberPhrase.innerHTML.split(" ").pop();
    console.log("WHAT IT IS ", orderNumber);
    expect(orderNumber).not.toBeNaN();

    const btnNewOrder = await screen.findByRole("button", {
      name: /create new order/i,
    });
    userEvent.click(btnNewOrder);

    // check that scoops and toppings have been reset

    const scoopOptAgain = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });

    const toppingOptAgain = await screen.findByRole("checkbox", {
      name: /hot fudge/i,
    });

    screen.debug();

    expect(scoopOptAgain).toHaveTextContent("0");
    expect(toppingOptAgain).not.toBeChecked();
  });
});
