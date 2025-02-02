import { styled } from "styled-components";
import { Container, Typography } from "@mui/material";

export const PageContainer = styled(Container)`
  background-color: white;
  padding: 1.5rem 0;
  text-align: center;
`;

export const EmptyState = styled(Typography)`
  font-size: 1.2rem;
  color: gray;
  padding: 2rem;
`;
