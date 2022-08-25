import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
import NavBar from "../components/NavBar";

const ContentStyle = styled("div")(({ theme }) => ({}));

export default function DashboardLayout({ children }) {
  return (
    <>
      <NavBar />
      <Container maxWidth="lg">
        <ContentStyle>{children}</ContentStyle>
      </Container>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
