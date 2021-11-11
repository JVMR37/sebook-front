import { TextareaHTMLAttributes } from "react";
import { StyledTextArea } from "../../GlobalStyles";

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const InputMultiLineField: React.FC<InputProps> = (props) => {
  return <StyledTextArea {...props}></StyledTextArea>;
};
