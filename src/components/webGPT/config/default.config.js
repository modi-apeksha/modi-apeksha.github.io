import { FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa"

export const BRAND_NAME = 'Web GPT';
export const BRAND_DESCRIPTION = "Some Desc";
export const LOGO_PATH = "../../images/logo.png";

export const HEADER_CONFIG = {
    position: "fixed", // fixed, normal
    customNav: false,
    isNavbarLeft: false,
    height: 80,
    bgColor: "#f2f2f2",
    textColor: "#000",
};

export const FOOTER_CONFIG = {
    // description: "",
    // isFootNavigation: "",
    // isSocial: "",
    // isSubFooter: "",
    // isCredits: "",
    // bgColor: "#f2f2f2",
    // borderColor: "#f2f2f2",
    // border: "#f2f2f2",
    copyrightInfo: "All Rights Reserved, WebGPT",
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
        link: "/",
        icon: <FaTwitter />,
        label: "Twitter"
    },
    {
        link: "/",
        icon: <FaInstagram />,
        label: "Instagram"
    },
    {
        link: "/",
        icon: <FaDiscord />,
        label: "Discord"
    }
];

export const VIEWS = [{
    "path": "/",
    "navbarLinkLabel": "Home",
    "order": 1,
    "data": {},
    "view": {
        "section-text": {
            "component": "Text",
            "description": "Enim in fugiat reprehenderit incididunt est sunt tempor deserunt excepteur quis consequat nulla nostrud ex. In duis eiusmod do quis est in sit commodo consequat eu aliqua duis deserunt. Exercitation dolor mollit amet in sint do mollit magna. Lorem sunt sint aute incididunt aute. Ut consectetur non ipsum velit eu. Proident tempor esse voluptate consequat aliquip mollit. Aliquip labore consequat amet dolore minim reprehenderit amet tempor dolor incididunt nisi labore qui.",
            "title": "Text",
            "rtl": true,
            // "bgColor": "#f2f2f2",
            // "textColor": "#000",
        },
    }
}];