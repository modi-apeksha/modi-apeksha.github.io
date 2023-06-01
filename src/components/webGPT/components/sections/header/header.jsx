import { useCallback, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Hamburger from "../../common/hamburger/hamburger";
import Logo from "../../common/logo/logo";
import NavItem from "../../common/nav-item/nav-item";
import "./header.scss";
import { useTheme } from "../../../hooks/ThemeContext";
import { useConfig } from "../../../hooks/ConfigContext";

const Header = ({
  toggleSidebar = () => { }
}) => {

  const { header } = useConfig();

  const { 
    position = "",
    customNav = false,
    isNavbarLeft = false,
    bgColor = "",
    textColor = "",
    borderColor = "",
    border = "",
    height = 80,
  } = header;

  const {
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    BASE_COLOR,
    TEXT_COLOR
  } = useTheme();

  const _header = useRef();
  const style = useMemo(() => {
    let s = {
      position: 'relative',
      backgroundColor: bgColor || PRIMARY_COLOR,
      color: textColor || SECONDARY_COLOR,
      height: height,
      display: "flex",
      flexFlow: "row",
      borderBottom: border,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    };

    if (position === 'fixed') {
      s.position = position;
      s.top = 0;
      s.left = 0;
      s.right = 0;
    }

    return s;
  }, [position, bgColor, textColor, height, border, borderColor, PRIMARY_COLOR, SECONDARY_COLOR]);


  const handleScroll = useCallback(() => {
    if (position === 'fixed') {
      var header = _header.current;
      var sticky = height * 2;
      if (window.pageYOffset > sticky) {
        header.style.backgroundColor = BASE_COLOR;
        header.style.color = TEXT_COLOR;
      } else {
        header.style.backgroundColor = PRIMARY_COLOR;
        header.style.color = SECONDARY_COLOR;
      }
    }
  }, [_header, position, height, BASE_COLOR, TEXT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR,]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true)
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    }


  }, [position, handleScroll]);



  return (
    <header
      className={`topbar`}
      style={style}
      ref={_header}
    >
      <Link
        to="/"
        className={`${isNavbarLeft ? "mr-20" : "mr-auto"}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          textTransform: "uppercase"
        }}
      >
        <Logo />
      </Link>

      <div className={`nav-bar-container ${isNavbarLeft ? "mr-auto" : ""}`}>
        <NavItem
          nav={customNav}
        />
      </div>

      <Hamburger
        setOpen={toggleSidebar}
        color={textColor || SECONDARY_COLOR}
      />
    </header>
  );
};

export default Header;
