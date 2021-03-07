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

describe("Grand total tests", () => {
  it("Grand total starts at $0.00", () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", { name: /grand total/i });
  });

  it("Grand total updates if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total", { exact: false });
    expect(grandTotal).toHaveTextContent("$0.0");

    const chocolateScoop = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, "1");

    expect(grandTotal).toHaveTextContent("2.00");

    const cherriesTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.clear(cherriesTopping);
    userEvent.click(cherriesTopping);

    expect(grandTotal).toHaveTextContent("3.50");
  });

  it("Grand total updates if topping is added first", async () => {
    render(<OrderEntry />);

    const mmsToppings = await screen.findByRole("checkbox", { name: "M&Ms" });
    const grandTotal = screen.getByRole("heading", { name: /grand total/i });
    const vanillaScoop = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    expect(grandTotal).toHaveTextContent("0.00");

    userEvent.click(mmsToppings);

    expect(grandTotal).toHaveTextContent("1.50");

    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, "3");

    expect(grandTotal).toHaveTextContent("7.50");
  });

  it("Grand total updates if item is removed", async () => {
    render(<OrderEntry />);

    const hotFugdeTopping = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    const chocolateScoop = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    const grandTotal = screen.getByText(/grand total/i);

    expect(grandTotal).toHaveTextContent("0.00");

    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, "10");

    userEvent.click(hotFugdeTopping);

    expect(grandTotal).toHaveTextContent("21.50");

    userEvent.click(hotFugdeTopping);
    expect(grandTotal).toHaveTextContent("20.00");
  });
});

describe("subtotal updates tests", () => {
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

  it("Should update toppings subtotal when toppings change", async () => {
    render(<Options optionType="toppings" />);

    const subtotalToppings = screen.getByText("Toppings total", {
      exact: false,
    });

    expect(subtotalToppings).toHaveTextContent("0.00");

    await waitFor(async () => {
      const checkboxToppings = await screen.findAllByRole("checkbox");
      expect(checkboxToppings).toHaveLength(3);
      userEvent.click(checkboxToppings[0]);

      expect(subtotalToppings).toHaveTextContent("1.50");
    });
  });

  it("Should update toppings subtotal to 0.00 when 2 toppings are checked and unchecked", async () => {
    render(<Options optionType="toppings" />);

    const subtotalToppings = screen.getByText("Toppings total", {
      exact: false,
    });

    expect(subtotalToppings).toHaveTextContent("0.00");

    await waitFor(async () => {
      const checkboxToppings = await screen.findAllByRole("checkbox");

      userEvent.click(checkboxToppings[1]);
      userEvent.click(checkboxToppings[2]);

      expect(subtotalToppings).toHaveTextContent("3.00");
      userEvent.click(checkboxToppings[1]);
      userEvent.click(checkboxToppings[2]);
      expect(subtotalToppings).toHaveTextContent("0.00");
    });
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
