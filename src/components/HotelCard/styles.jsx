import { styled } from "styled-components";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { CONSTANTS } from "../../helpers/constants";

export const ImageCard = styled(Card)`
  display: flex;
  background-color: white;
  border: 0.0625rem solid ${CONSTANTS.STYLE.borderColor};
  box-shadow: ${CONSTANTS.STYLE.boxShadowDefault};
  position: relative;
  height: auto;
  max-height: 12.5rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${CONSTANTS.STYLE.boxShadowHover};
    transform: scale(1.05);
    cursor: pointer;
  }
`;

export const ImageWrapper = styled(Box)`
  position: relative;
  width: 9.375rem;
  height: 6.25rem;
`;

export const Banner = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${CONSTANTS.STYLE.bannerBgColor};
  color: white;
  padding: 0.25rem 0.5rem;
  font-size: ${CONSTANTS.STYLE.fontSizeSmall};
  font-weight: bold;
  border-bottom-right-radius: 0.25rem;
  z-index: 10;
`;

export const ContentBox = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  padding: 0rem 1rem 0rem 1rem !important;
  position: relative;
`;

export const TitleBox = styled(Box)`
  display: flex;
  align-items: center;
  min-width: 0;
`;

export const AddressText = styled(Typography)`
  margin-top: 0.3125rem;
  align-self: flex-start;
  font-size: ${CONSTANTS.STYLE.fontSizeMedium};
`;

export const RowBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > div {
    line-height: 0;
    display: flex;
    flex-direction: column;
  }
`;

export const DetailBox = styled(Box)`
  text-align: left;
`;

export const PriceBox = styled(Box)`
  text-align: right;
`;

export const HotelTitle = styled(Typography)`
  font-weight: bold;
  max-width: ${CONSTANTS.STYLE.maxTitleWidth};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RatingBox = styled(Box)`
  display: flex;
  align-items: center;
`;

export const PriceText = styled(Typography)`
  font-weight: bold;
  line-height: 1 !important;
`;
