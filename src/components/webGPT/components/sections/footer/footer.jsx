import SocialContact from "../../common/social-contacts/social-contacts";
import "./footer.scss";
import NavItem from "../../common/nav-item/nav-item";
import Logo from "../../common/logo/logo";
import { useMemo } from "react";
import { useTheme } from "../../../hooks/ThemeContext";
import { useConfig } from "../../../hooks/ConfigContext";


export default function Footer() {

	const { footer } = useConfig();

	const {
		description = "",
		isFootNavigation = true,
		copyrightInfo = "",
		isSocial = true,
		isSubFooter = true,
		isCredits = true,
		creditInfo = "",
		bgColor = "",
		textColor = "",
		borderColor = "",
		border = "",
		minHeight = 180,
		subFooterBgColor = "",
		subFooterTextColor = "",
	} = footer;


	const {
		BASE_COLOR,
		TEXT_COLOR
	} = useTheme();
	const style = useMemo(() => {
		let s = {
			backgroundColor: bgColor || BASE_COLOR,
			color: textColor || TEXT_COLOR,
			minHeight: minHeight,
			borderTop: border || `solid 1px ${borderColor}`,
		};

		return s;
	}, [bgColor, textColor, minHeight, BASE_COLOR, TEXT_COLOR]);

	const subFooterStyle = useMemo(() => {
		let s = {
			backgroundColor: subFooterBgColor || BASE_COLOR,
			color: subFooterTextColor || TEXT_COLOR,
		};

		return s;
	}, [subFooterBgColor, subFooterTextColor, BASE_COLOR, TEXT_COLOR]);

	return (
		<footer className="footer" style={style}>
			<section className="container">
				<div className="main-footer">
					<div className="brand-content">
						<Logo />
						<p>{description}</p>
					</div>
					{isFootNavigation &&
						<div className="nav">
							<NavItem />
						</div>
					}
					{isSocial &&
						<div className="social">
							<SocialContact
								title={"Follow Us"}
							/>
						</div>
					}
				</div>
			</section>
			{isSubFooter &&
				<section className="bottom-bar flex justify-center align-center" style={subFooterStyle}>
					{copyrightInfo &&
						<div className="copyright-content">
							&copy; {copyrightInfo}
						</div>
					}
					{isCredits &&
						<div className="credits">
							{creditInfo}
						</div>
					}
				</section>
			}
		</footer>
	);
}
