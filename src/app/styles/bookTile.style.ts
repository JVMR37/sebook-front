import styled from "styled-components";
import { highlightAnimation } from "./animatedDiv.style";

export const BookDataDiv = styled.div`
  ${highlightAnimation}
  display: flex;
  margin: 2rem 4rem;
  padding: 3rem 3rem;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  height: 50%;
  min-height: 50%;

  border-radius: 15px;

  box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5);
`;

export const BookDataColumn = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: space-between;
  height: 100%;
  width: 60%;
`;

export const BookActionColumn = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 30%;
`;

export const BookDataText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  text-align: start;
  font: italic normal bold 2rem Helvetica;
  word-wrap: break-word;
  word-break: break-all;
  letter-spacing: 0px;

  color: ${({ theme }) => theme.colors.secondary};
  padding: 0;

  span:nth-child(1) {
    text-align: center;
    margin-left: 5px;
    font: italic normal 300 2rem Helvetica;
    letter-spacing: 0px;
  }
`;
