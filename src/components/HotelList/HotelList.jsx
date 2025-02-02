import React, { useState, useMemo } from "react";
import { Stack, Divider } from "@mui/material";
import data from "../../data.json";
import { PageContainer, EmptyState } from "./styles";
import { CONSTANTS } from "../../helpers/constants";
import HotelListHeader from "../HotelListHeader/HotelListHeader";
import HotelCard from "../HotelCard/HotelCard";

const HotelList = () => {
  const [sortOrder, setSortOrder] = useState(CONSTANTS.SORT_ORDER.HIGH_LOW);
  const sortedHotels = useMemo(() => {
    return [...data.results]
      .filter(
        (hotel) =>
          hotel.property?.title &&
          hotel.property?.address &&
          hotel.property?.address.length > 0 &&
          hotel.property?.previewImage?.url &&
          hotel.property?.rating?.ratingValue &&
          hotel.property?.rating?.ratingType &&
          hotel.offer?.displayPrice?.amount !== undefined &&
          hotel.offer?.displayPrice?.currency
      )
      .sort((a, b) => {
        const priceA = a.offer?.displayPrice?.amount || 0;
        const priceB = b.offer?.displayPrice?.amount || 0;

        return sortOrder === CONSTANTS.SORT_ORDER.HIGH_LOW
          ? priceB - priceA
          : priceA - priceB;
      });
  }, [sortOrder]);

  const handleCardClick = (hotel) => {
    // Logic to pass hotel obj as payload to api and navigate to next page
    console.log("Selected Hotel: ", hotel);
  };

  return (
    <PageContainer>
      {sortedHotels.length === 0 ? (
        <EmptyState>{CONSTANTS.EMPTY_STATE}</EmptyState>
      ) : (
        <>
          <HotelListHeader
            totalHotels={sortedHotels.length}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <Stack spacing={2}>
            {sortedHotels.map((hotel, index) => (
              <React.Fragment key={hotel.id}>
                <HotelCard hotel={hotel} handleCardClick={handleCardClick} />
                {index !== sortedHotels.length - 1 && (
                  <Divider sx={{ my: 2 }} />
                )}
              </React.Fragment>
            ))}
          </Stack>
        </>
      )}
    </PageContainer>
  );
};

export default HotelList;
