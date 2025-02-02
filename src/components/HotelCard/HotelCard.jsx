import React from "react";
import PropTypes from "prop-types";
import {
  CardMedia,
  Typography,
  Box,
  Tooltip,
  Link,
  useTheme,
} from "@mui/material";
import { Star, RadioButtonChecked } from "@mui/icons-material";
import { CONSTANTS } from "../../helpers/constants";
import {
  ImageCard,
  ImageWrapper,
  Banner,
  ContentBox,
  TitleBox,
  AddressText,
  RowBox,
  DetailBox,
  PriceBox,
  HotelTitle,
  RatingBox,
  PriceText,
} from "./styles";

const HotelCard = ({ hotel = {}, handleCardClick = () => {} }) => {
  // Validate required properties
  const isDataValid =
    hotel?.property?.title &&
    hotel?.property?.address &&
    hotel?.property?.rating?.ratingValue &&
    hotel?.property?.rating?.ratingType &&
    hotel?.property?.previewImage?.url &&
    hotel?.offer?.displayPrice?.amount &&
    hotel?.offer?.displayPrice?.currency;
  if (!isDataValid) return null; // Prevent rendering anything

  const theme = useTheme(); // Using MUI theme

  const renderRatingIcons = (ratingValue, ratingType) => {
    const IconComponent =
      ratingType === CONSTANTS.RATING_TYPE ? Star : RadioButtonChecked;

    const tooltipTitle =
      ratingType === CONSTANTS.RATING_TYPE
        ? CONSTANTS.TOOLTIP_RATING.TOOLTIP_STAR
        : CONSTANTS.TOOLTIP_RATING.TOOLTIP_CIRCLE;

    return Array.from({ length: Math.round(ratingValue) }, (_, i) => (
      <Tooltip key={i} title={tooltipTitle} arrow>
        <IconComponent
          data-testid="rating-icon"
          color="warning"
          fontSize="small"
        />
      </Tooltip>
    ));
  };

  return (
    <ImageCard data-testid="hotel-card" onClick={() => handleCardClick(hotel)}>
      <ImageWrapper>
        {hotel.offer?.promotion?.title && (
          <Banner>{hotel.offer.promotion.title}</Banner>
        )}

        <CardMedia
          component="img"
          image={hotel?.property?.previewImage?.url}
          alt={hotel?.property?.previewImage?.caption}
        />
      </ImageWrapper>

      <ContentBox>
        <Box>
          <TitleBox>
            <HotelTitle variant="h6">{hotel.property?.title}</HotelTitle>
            <RatingBox>
              {renderRatingIcons(
                hotel.property?.rating?.ratingValue,
                hotel.property?.rating?.ratingType
              )}
            </RatingBox>
          </TitleBox>

          <RowBox>
            <DetailBox>
              <AddressText
                variant="caption"
                color={theme.palette.text.secondary}
              >
                {hotel.property?.address?.join(", ")}
              </AddressText>
              <Typography variant="body2">
                <Link href="#" underline="always" color="error">
                  {hotel.offer?.name}
                </Link>
              </Typography>
              {hotel.offer?.cancellationOption?.cancellationType ===
                CONSTANTS.FREE_CANCELLATION.FREE_CANCELLATION && (
                <Typography variant="body2" color="success">
                  {CONSTANTS.FREE_CANCELLATION.FREE_CANCELLATION_TEXT}
                </Typography>
              )}
            </DetailBox>

            <PriceBox>
              <Typography
                variant="caption"
                color={theme.palette.text.secondary}
              >
                {CONSTANTS.OFFER.CURRENCY_TEXT} (
                {hotel.offer?.displayPrice?.currency})
              </Typography>
              <PriceText variant="h6">
                ${hotel.offer?.displayPrice?.amount}
              </PriceText>
              {hotel.offer?.savings?.amount && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ fontWeight: "bold" }}
                >
                  {CONSTANTS.OFFER.SAVING_TEXT} ${hotel.offer.savings.amount}!
                </Typography>
              )}
            </PriceBox>
          </RowBox>
        </Box>
      </ContentBox>
    </ImageCard>
  );
};

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    property: PropTypes.shape({
      title: PropTypes.string.isRequired,
      address: PropTypes.arrayOf(PropTypes.string).isRequired,
      rating: PropTypes.shape({
        ratingValue: PropTypes.number.isRequired,
        ratingType: PropTypes.string.isRequired,
      }).isRequired,
      previewImage: PropTypes.shape({
        url: PropTypes.string,
        caption: PropTypes.string,
      }).isRequired,
    }),
    offer: PropTypes.shape({
      displayPrice: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
      }).isRequired,
      name: PropTypes.string,
      promotion: PropTypes.shape({
        title: PropTypes.string,
      }),
      savings: PropTypes.shape({
        amount: PropTypes.number,
      }),
    }),
  }),
  handleCardClick: PropTypes.func,
};

export default HotelCard;
