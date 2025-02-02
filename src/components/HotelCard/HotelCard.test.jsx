import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HotelCard from "./HotelCard";
import { CONSTANTS } from "../../helpers/constants";

const mockHotel = {
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
};

const mockImageUrl = "https://unsplash.it/145/125/?random";
const mockHandleCardClick = jest.fn();

describe("HotelCard Component", () => {
  test("renders hotel name correctly", () => {
    render(<HotelCard hotel={mockHotel} />);
    expect(screen.getByText("Primus Hotel Sydney")).toBeInTheDocument();
  });

  test("displays hotel address", () => {
    render(<HotelCard hotel={mockHotel} />);
    expect(screen.getByText("339 Pitt St, Sydney")).toBeInTheDocument();
  });

  test("renders rating icons based on hotel rating", () => {
    render(<HotelCard hotel={mockHotel} />);
    expect(screen.getAllByTestId("rating-icon")).toHaveLength(5);
  });

  test("renders price correctly", () => {
    render(<HotelCard hotel={mockHotel} />);
    expect(screen.getByText("$375")).toBeInTheDocument();
  });

  test("displays promotion banner if available", () => {
    render(<HotelCard hotel={mockHotel} />);
    expect(screen.getByText("Exclusive Deal")).toBeInTheDocument();
  });

  test("renders savings amount if available", () => {
    render(<HotelCard hotel={mockHotel} />);
    expect(screen.getByText("Save $28!")).toBeInTheDocument();
  });

  test("shows cancellation option when applicable", () => {
    render(<HotelCard hotel={mockHotel} />);
    expect(
      screen.getByText(CONSTANTS.FREE_CANCELLATION.FREE_CANCELLATION_TEXT)
    ).toBeInTheDocument();
  });

  test("calls handleCardClick when clicked", () => {
    render(
      <HotelCard hotel={mockHotel} handleCardClick={mockHandleCardClick} />
    );

    fireEvent.click(screen.getByRole("img"));
    expect(mockHandleCardClick).toHaveBeenCalledTimes(1);
  });

  test("renders image with correct alt text", () => {
    render(<HotelCard hotel={mockHotel} />);
    expect(
      screen.getByAltText(mockHotel?.property?.previewImage?.caption)
    ).toHaveAttribute("src", mockImageUrl);
  });

  test("does not break when optional data is missing", () => {
    const { container } = render(<HotelCard hotel={{}} />);

    expect(container.firstChild).toBeNull();
  });

  test("does not render when required data is missing", () => {
    const incompleteHotelData = {
      property: {
        title: "Luxury Hotel",
        // Address is missing
        address: [],
        rating: { ratingValue: 5, ratingType: "star" },
        previewImage: {
          url: "",
          caption: "",
        },
      },
      offer: {
        displayPrice: { amount: 250, currency: "AUD" },
        name: "Special Deal",
      },
    };

    const { container } = render(<HotelCard hotel={incompleteHotelData} />);

    expect(container.firstChild).toBeNull();
  });
});
