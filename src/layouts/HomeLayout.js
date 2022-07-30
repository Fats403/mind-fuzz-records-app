import PropTypes from "prop-types";
import NavBar from "../components/NavBar";

export default function HomeLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
