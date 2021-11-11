import styled from "styled-components";
import { highlightAnimation } from "./animatedDiv.style";

export const MainStyledLayout = styled.div`
  ${highlightAnimation}

  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
