import styled from "styled-components";

export const ActionStatusStyledSpan = styled.span<{
  color: string;
}>`
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  font-style: italic;
  font-family: helvetica;
  color: ${({ color }) => color};
`;
