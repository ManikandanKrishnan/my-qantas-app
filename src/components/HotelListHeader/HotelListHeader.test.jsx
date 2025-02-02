import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import HotelListHeader from "./HotelListHeader";
import { CONSTANTS } from "../../helpers/constants";

jest.mock("../../assets/qantas-logo.png", () => "mocked-logo.png");
describe("HotelListHeader Component", () => {
  const mockSetSortOrder = jest.fn();

  beforeEach(() => {
    mockSetSortOrder.mockClear();
  });

  test("renders the company logo", () => {
    render(
      <HotelListHeader
        totalHotels={10}
        sortOrder={CONSTANTS.SORT_ORDER.HIGH_LOW}
        setSortOrder={mockSetSortOrder}
      />
    );

    const logoText = screen.getByAltText("Qantas logo");
    expect(logoText).toBeInTheDocument();
  });

  test("displays the total number of hotels", () => {
    render(
      <HotelListHeader
        totalHotels={15}
        sortOrder={CONSTANTS.SORT_ORDER.HIGH_LOW}
        setSortOrder={mockSetSortOrder}
      />
    );

    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText(CONSTANTS.LABELS.HOTELS_IN)).toBeInTheDocument();
  });

  test("calls setSortOrder when sort option is changed", () => {
    render(
      <HotelListHeader
        totalHotels={10}
        sortOrder={CONSTANTS.SORT_ORDER.HIGH_LOW}
        setSortOrder={mockSetSortOrder}
      />
    );

    const dropdown = screen.getByLabelText(CONSTANTS.LABELS.SORT_BY);
    fireEvent.mouseDown(dropdown);

    const lowToHighOption = screen.getByText(CONSTANTS.LABELS.PRICE_LOW_HIGH);
    fireEvent.click(lowToHighOption);

    expect(mockSetSortOrder).toHaveBeenCalledTimes(1);
    expect(mockSetSortOrder).toHaveBeenCalledWith(
      CONSTANTS.SORT_ORDER.LOW_HIGH
    );
  });
});
