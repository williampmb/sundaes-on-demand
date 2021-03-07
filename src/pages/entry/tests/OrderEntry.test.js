import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import Options from "../Options";
import userEvent from "@testing-library/user-event";

describe("total updates tests", () => {
  it("update scoop subtotal when scoops change", async () => {
    render(<Options optionType="scoops" />);

    //make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText("Scoops total: $", {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent("0.00");

    //update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(scoopsSubtotal).toHaveTextContent("2.00");

    //update chocolate scoops to 2 and check subtotal

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");

    expect(scoopsSubtotal).toHaveTextContent("6.00");
  });
});

describe("Testing alerts", () => {
  it("Should handle erros for scoops and toppings routes", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        res(ctx.status(500));
      }),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        res(ctx.status(500));
      })
    );

    render(<OrderEntry />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });
});
