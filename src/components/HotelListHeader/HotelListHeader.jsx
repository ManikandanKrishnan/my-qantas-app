import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { CONSTANTS } from "../../helpers/constants";
import logo from "../../assets/qantas-logo.png";
import {
  HeaderBox,
  HotelsInfoText,
  BoldText,
  ItalicText,
  Logo,
} from "./styles";

const HotelListHeader = ({ totalHotels, sortOrder, setSortOrder }) => {
  return (
    <>
      <Logo src={logo} alt={CONSTANTS.ALT_TEXT.LOGO} />
      <HeaderBox>
        <HotelsInfoText>
          <BoldText>{totalHotels}</BoldText>
          <ItalicText> {CONSTANTS.LABELS.HOTELS_IN} </ItalicText>
          <BoldText>{CONSTANTS.CITY}</BoldText>
        </HotelsInfoText>
        <FormControl>
          <InputLabel id="sort-by-label">{CONSTANTS.LABELS.SORT_BY}</InputLabel>
          <Select
            id="sort-by-select"
            value={sortOrder}
            label={CONSTANTS.LABELS.SORT_BY}
            labelId="sort-by-label"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value={CONSTANTS.SORT_ORDER.HIGH_LOW}>
              {CONSTANTS.LABELS.PRICE_HIGH_LOW}
            </MenuItem>
            <MenuItem value={CONSTANTS.SORT_ORDER.LOW_HIGH}>
              {CONSTANTS.LABELS.PRICE_LOW_HIGH}
            </MenuItem>
          </Select>
        </FormControl>
      </HeaderBox>
    </>
  );
};


HotelListHeader.propTypes = {
  totalHotels: PropTypes.number.isRequired,
  sortOrder: PropTypes.oneOf([
    CONSTANTS.SORT_ORDER.HIGH_LOW,
    CONSTANTS.SORT_ORDER.LOW_HIGH,
  ]).isRequired,
  setSortOrder: PropTypes.func.isRequired,
};

export default HotelListHeader;
