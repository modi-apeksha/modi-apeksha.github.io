import "./sidebar.scss";
// import Logo from "../../common/logo/logo";
import NavItem from "../nav-item/nav-item";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = ({
	isOpen,
	toggleSidebar
}) => {

	const location = useLocation();

	useEffect(() => {
		if(isOpen){
			toggleSidebar();
		}
	}, [location]);

	return (
		<div className={`sidebar-container ${isOpen ? "sidebar-open" : "sidebar-close"}`} >
			<div className="sidebar-overlay" onClick={() => toggleSidebar()} />
			<div
				className={`noPrint sidebar-custom sidebar-nav`}
			>
				<NavItem />
			</div>
		</div>
	)
}

export default Sidebar;