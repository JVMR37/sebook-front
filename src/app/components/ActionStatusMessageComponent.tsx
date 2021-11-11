import { BookActionStatus } from "../store/bookSlice";
import { ActionStatusStyledSpan } from "../styles/actionStatusMessage.style";
import { appTheme } from "../utils/appTheme";

const ActionStatusMessage: React.FC<{
  status: BookActionStatus;
}> = (props) => {
  let color: string;
  switch (props.status) {
    case BookActionStatus.LOADING:
      color = appTheme.colors.secondary;
      break;

    case BookActionStatus.SUCCESS:
      color = appTheme.colors.main;
      break;

    case BookActionStatus.ERROR:
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

export default ActionStatusMessage;
