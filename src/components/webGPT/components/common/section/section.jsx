import Title from "../title/title";
import { useMemo } from "react";
import "./section.scss";
import { useTheme } from "../../../hooks/ThemeContext";

const Section = ({
    children,
    className="",
    title,
    id,
    bgColor,
    textColor,
    bgImage,
    componentName
}) => {

    const {
        PRIMARY_COLOR,
        SECONDARY_COLOR,
        BASE_COLOR,
        TEXT_COLOR
      } = useTheme();

    let styles = useMemo(() => {
        let s = {
            background: bgColor || (componentName === 'Banner' ? PRIMARY_COLOR : BASE_COLOR),
            color: textColor || (componentName === 'Banner' ? SECONDARY_COLOR : TEXT_COLOR)
        };
        if (bgImage) {
            s = {
                ...s,
                background: `url(${bgImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }
        }

        return s;

    }, [bgColor, textColor, bgImage, componentName, PRIMARY_COLOR, SECONDARY_COLOR, BASE_COLOR, TEXT_COLOR]);

    return (
        <div
            id={id}
            className={`${className} section ${title ? "titled-section" : ""}`}
            style={styles}
        >
            {title &&
                <Title title={title} />
            }
            <div className="section-content container">
                {children}
            </div>
        </div>
    )
}

export default Section;