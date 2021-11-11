import { BookLoadStatus } from "../store/bookSlice";
import { ActionStatusStyledSpan } from "../styles/actionStatusMessage.style";
import { appTheme } from "../utils/appTheme";

const LoadStatusMessage: React.FC<{
  status: BookLoadStatus;
}> = (props) => {
  let color: string;
  switch (props.status) {
    case BookLoadStatus.LOADING:
      color = appTheme.colors.secondary;
      break;

    case BookLoadStatus.LOADED:
      color = appTheme.colors.main;
      break;

    case BookLoadStatus.ERROR:
      color = appTheme.colors.error;
      break;

    default:
      color = appTheme.colors.secondary;
      break;
  }

  return (
    <ActionStatusStyledSpan color={color}>
      {props.children}
    </ActionStatusStyledSpan>
  );
};

export default LoadStatusMessage;
