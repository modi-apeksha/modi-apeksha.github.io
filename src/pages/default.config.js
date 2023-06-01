import { FaLinkedin, FaGithub } from "react-icons/fa"

export const BRAND_NAME = 'Mrunal Modi';
export const BRAND_DESCRIPTION = "Profile";
export const LOGO_PATH = "../../images/logo.png";

export const THEME = {
    // primary color will be used for the background of highlighted content like header, banner, and buttons that are not on the banner and header 
    PRIMARY_COLOR : "#f2f2f2",
    // SECONDARY_COLOR/ PRIMARY_CONTRAST_COLOR will be used as the background of buttons and headings on the banner and header to highlight the button and content on the banner and header
    SECONDARY_COLOR : "#ffffff",
    // Base color will be used for the overall background
    BASE_COLOR : "#f5f5f5",
    // Text color will be used for general text overall
    TEXT_COLOR : "#333333",
    // Accent color will be used for links and buttons overall 
    ACCENT_COLOR : "#0099cc",
    // Will be used for cards and other highlighted containers' background color, if not set, secondary color will be used instead
    HIGHLIGHT_BG_COLOR : "#ffffff",
    // Will be used for cards and other highlighted containers' text color, if not set, text color will be used instead
    HIGHLIGHT_TEXT_COLOR : "#333333",
}

export const HEADER_CONFIG = {
    position: "normal", // fixed, normal
    customNav: false,
    isNavbarLeft: false,
    height: 80,
    bgColor: "#f2f2f2",
    textColor: "#000"
};

export const FOOTER_CONFIG = {
    copyrightInfo: "All Rights Reserved",
    textColor: "",
    minHeight: "",
    subFooterBgColor: "",
    subFooterTextColor: "",
    creditInfo: <>Made with ❤️ <br /> using React Components</>,
    socialLinksConfig: {
        color: "#bdbdbd"
    }
};

export const SOCIAL_LINKS = [
    {
        link: "https://www.linkedin.com/in/apekshamodi/",
        icon: <FaLinkedin />,
        label: "LinkedIn"
    },
    {
        link: "https://github.com/modi-apeksha",
        icon: <FaGithub />,
        label: "GitHub"
    }
];