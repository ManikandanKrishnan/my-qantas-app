import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import data from "../../data.json";
import HotelListHeader from "../HotelListHeader/HotelListHeader";
import HotelList from "../HotelList/HotelList";
import { CONSTANTS } from "../../helpers/constants";

jest.spyOn(console, "log").mockImplementation(() => {});

jest.mock("../../data.json", () => {
  return {
    results: [
      {
        id: "mesq6mggyn",
        property: {
          propertyId: "P107802",
          title: "Primus Hotel Sydney",
          address: ["339 Pitt St", "Sydney"],
          previewImage: {
            url: "https://unsplash.it/145/125/?random",
            caption: "Image of Primus Hotel Sydney",
            imageType: "PRIMARY",
          },
          rating: {
            ratingValue: 5,
            ratingType: "self",
          },
        },
        offer: {
          promotion: {
            title: "Exclusive Deal",
            type: "MEMBER",
          },
          name: "Deluxe King",
          displayPrice: {
            amount: 375.0,
            currency: "AUD",
          },
          savings: {
            amount: 28.0,
            currency: "AUD",
          },
          cancellationOption: {
            cancellationType: "FREE_CANCELLATION",
          },
        },
      },
      {
        id: "cxd650nuyo",
        property: {
          propertyId: "P107801",
          title: "Courtyard by Marriott Sydney-North Ryde",
          address: ["7-11 Talavera Rd", "North Ryde"],
          previewImage: {
            url: "https://unsplash.it/145/125/?random",
            caption: "Image of Courtyard by Marriott Sydney-North Ryde",
            imageType: "PRIMARY",
          },
          rating: {
            ratingValue: 4.5,
            ratingType: "self",
          },
        },
        offer: {
          promotion: {
            title: "Exclusive Deal",
            type: "MEMBER",
          },
          name: "Deluxe Balcony Room",
          displayPrice: {
            amount: 329.0,
            currency: "AUD",
          },
          savings: {
            amount: 30.0,
            currency: "AUD",
          },
          cancellationOption: {
            cancellationType: "NOT_REFUNDABLE",
          },
        },
      },
      {
        id: "2",
        property: {
          title: "Hotel Two",
          address: ["339 Pitt St", "Sydney"],
          rating: { ratingValue: 4.0, ratingType: "stars" },
        },
        offer: { displayPrice: { amount: 150, currency: "USD" } },
      },
      {
        id: "missing-hotel",
        property: {
          title: "Incomplete Hotel",
        },
        offer: {}, // Missing price details
      },
    ],
  };
});

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("HotelList Component", () => {
  test("allows changing the sort order", () => {
    const setSortOrderMock = jest.fn(); // Mock the setSortOrder function
    const { getByLabelText } = render(
      <HotelListHeader
        totalHotels={10}
        sortOrder="high-low"
        setSortOrder={setSortOrderMock}
      />
    );

    const dropdown = screen.getByLabelText(CONSTANTS.LABELS.SORT_BY);
    fireEvent.mouseDown(dropdown);

    const lowToHighOption = screen.getByText(CONSTANTS.LABELS.PRICE_LOW_HIGH);
    fireEvent.click(lowToHighOption);

    expect(setSortOrderMock).toHaveBeenCalledTimes(1);
    expect(setSortOrderMock).toHaveBeenCalledWith(
      CONSTANTS.SORT_ORDER.LOW_HIGH
    );
  });

  test("renders the correct number of HotelCards", () => {
    render(<HotelList />);

    // Hotel cards should match the valid hotels (2, excluding the incomplete one)
    const hotelCards = screen.getAllByTestId("hotel-card");
    expect(hotelCards.length).toBe(2);
  });

  test("does not render HotelCard if required data is missing", () => {
    render(<HotelList />);

    // Ensure the incomplete hotel is not rendered
    expect(screen.queryByText("Incomplete Hotel")).not.toBeInTheDocument();
  });

  test("renders dividers between hotel cards except the last one", () => {
    render(<HotelList />);

    const hotelCards = screen.getAllByTestId("hotel-card");
    expect(hotelCards.length).toBe(2);

    const dividers = screen.getAllByRole("separator");
    expect(dividers.length).toBe(1);
  });

  test("displays an empty state message when no hotels are available", async () => {
    data.results = [];
    render(<HotelList />);

    // Empty state message should appear
    expect(screen.getByText(CONSTANTS.EMPTY_STATE)).toBeInTheDocument();

    // Hotel header and cards should NOT be present
    expect(screen.queryByText(/hotels in/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId("hotel-card")).not.toBeInTheDocument();
  });

  test("does not render incomplete hotel data", () => {
    jest.mock("../../data.json", () => ({
      results: [
        {
          id: "3",
          property: {
            title: "Incomplete Hotel",
            address: "",
          },
          offer: {},
        },
      ],
    }));

    render(<HotelList />);

    // Empty state should be shown because the hotel is incomplete
    expect(screen.getByText(CONSTANTS.EMPTY_STATE)).toBeInTheDocument();
  });
});
