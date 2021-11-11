import { InputHTMLAttributes } from "react";
import { StyledInput } from "../../GlobalStyles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const InputField: React.FC<InputProps> = (props) => {
  return <StyledInput {...props}></StyledInput>;
};
