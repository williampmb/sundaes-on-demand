import { render, screen } from "@testing-library/react";

import Options from "../Options";

describe("Scoops and Toppings Opts", () => {
  it("Should display image from each scoop opt from server", async () => {
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
