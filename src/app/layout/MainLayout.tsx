import { MainStyledLayout } from "../styles/mainLayout.style";

const MainLayout: React.FC = (props) => (
  <MainStyledLayout>{props.children}</MainStyledLayout>
);

export default MainLayout;
