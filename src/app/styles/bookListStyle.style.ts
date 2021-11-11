import styled from "styled-components";
// import { highlightAnimation } from "./animatedDiv.style";
import { StyledCard } from "./card.style";

export const BookListStyled = styled(StyledCard)`
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  padding-top: 2rem;
  overflow-y: auto;
  height: 65%;
  max-width: 50%;
  overflow-y: auto;
`;
