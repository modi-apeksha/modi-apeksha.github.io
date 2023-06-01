import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Section from "../components/common/section/section";
import Banner from "../components/sections/banner/banner";
import TextImage from "../components/sections/text-image/text-image";
import Text from "../components/sections/text/text";
import Form from "../components/common/form/form";
import ContactForm from "../components/sections/contact-form/contact-form";
import ListCards from "../components/sections/list-cards/list-cards";


const PageManager = ({
    views
}) => {
    const location = useLocation();
    const [view, setView] = useState(null);
    // eslint-disable-next-line
    const [data, setData] = useState(null);
    const [mounted, setMounted] = useState(false);

    const Components = useMemo(() => ({
        "Banner": Banner,
        "TextImage": TextImage,
        "Text": Text,
        "Form": Form,
        "ContactForm": ContactForm,
        "ListCards": ListCards
    }), []);

    useEffect(() => {
        let v = Object.values(views).find(el => el.path === location.pathname);
        console.log(v)
        if (v) {
            setView(v.view);
            setData(v.data);
        }
        setMounted(true);
    }, [location, views]);

    return (
        <div className="page-manager">
            {(mounted && !view) &&
                <h1 className="text-center">
                    404 Not Found
                </h1>
            }
            {(mounted && view) && Object.keys(view).map((id, i) => {
                let Component = Components[view[id]["component"]];
                
                if (!Component) 
                    return null;

                return (
                    <Section
                        className={view[id].className}
                        title={view[id].sectionTitle}
                        id={view[id].id || id}
                        bgColor={view[id].bgColor}
                        textColor={view[id].textColor}
                        bgImage={view[id].bgImage}
                        key={i}
                        componentName={view[id]["component"]}
                    >
                        <Component
                            {...view[id]}
                        >
                            {view[id].children}
                        </Component>
                    </Section>
                )
            })}
        </div>
    )
}

export default PageManager;