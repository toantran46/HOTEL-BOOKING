import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollTop(props) {
  const location = useLocation().pathname;
  useEffect(() => {
    document.querySelector("body").scrollIntoView("body");
  }, [location]);

  return null;
}

export default ScrollTop;
