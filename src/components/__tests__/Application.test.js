import React from "react";


import { getByText, getAllByTestId, prettyDOM, render, cleanup , waitForElement, fireEvent} from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);
describe("Aplication", () => {
  it("changes the schedule when a new day is selected", async ()  => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];


    
  });
});