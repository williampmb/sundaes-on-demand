import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

describe("Dont update subtotals", () => {
  it("Should not update the subtotals if it has invalid input", async () => {
    render(<Options optionType="scoops" />);

    const scoopInput = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });
    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "-3");

    const scoopSubtotal = screen.getByText("Scoops total: $0.00");
    expect(scoopSubtotal).toBeInTheDocument();
  });
});

describe("Scoops and Toppings Opts", () => {
  test("Should display image from each scoop opt from server", async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    //confirm alt text of images
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  it("Should display image from each topping opt from server", async () => {
    render(<Options optionType="toppings" />);

    const toppingsImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    expect(toppingsImages).toHaveLength(3);

    const altText = toppingsImages.map((tooping) => tooping.alt);
    expect(altText).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot fudge topping",
    ]);
  });
});
