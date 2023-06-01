
const Home = {
    "path": "/",
    "navbarLinkLabel": "Home",
    "order": 1,
    "data": {},
    "view": {
        "section-banner": {
            "component": "Banner",
            "img": "/images/Apeksha-Image.jpeg",
            // "supTitle": "Mrunal Modi",
            "title": "Apeksha Modi",
            "subtitle": "Technology Lead",
            "text": " Development | Testing | Architecture | Tech Lead | Delivery | Engineering Manager Experience architecting and operationalizing enterprise IT application architectures along with integrating them into large-scale production applications across Hybrid MultiCloud.",
            "actionButtons": [
                {
                    "label": "Contact",
                    "href": "#section-contact-us",
                    // "style": {"width": 400}
                },
                {
                    "label": "Services",
                    "href": "#section-list-cards",
                    // "style": {"width": 400}
                }
            ],
            "bgColor": "#f2f2f2",
            "textColor": "#000",
            // "setImageAsBackground": true,
            // "rtl": true 
        },
        // "section-text-image": {
        //     "component": "TextImage",
        //     "img": "/images/skills.png",
        //     "title": "Current Skills",
        //     "description": "These areas are self assessed.",
        //     "rtl": true,
        //     "bgColor": "#FFFFFF",
        //     "textColor": "#000",
        // },
        // "section-text": {
        //     "component": "Text",
        //     "description": "mm",
        //     "title": "Text",
        //     "rtl": true,
        //     // "bgColor": "#f2f2f2",
        //     // "textColor": "#000",
        // },
        "section-list-cards": {
            "component": "ListCards",
            // "sectionTitle": "Areas",
            "cardInfo": [
                {
                    "title": "Digital Transformation",
                    // "img": "/images/area1.png",
                    "description": "Experience in combining strategic insights with digital know-hows to help you formulate new business models, modernize your legacy systems and create your market-ready digital products and platforms.",
                },
                {
                    "title": "Product Development",
                    // "img": "/images/area2.png",
                    "description": "Ability to research and create new technology solutions based on your business challenges and turn them into brand-new marketable products.",
                },
                {
                    "title": "Technology",
                    // "img": "/images/area3.png",
                    "description": "Help businesses embrace disruptive technologies so they can drive innovative growth from within and transition better long-term alongside surrounding mature digital organizations.",
                }
            ],
            "bgColor": "#FFFFFF",
            "textColor": "#000",
        },
        "section-contact-us": {
            "component": "ContactForm",
            "sectionTitle": "Contact",
            "bgColor": "#f2f2f2",
            "textColor": "#000",
            "submitButtonBgColor": "#FFFFFF",
            "submitButtonTextColor": "#000"
        }
    }
}

export default Home;