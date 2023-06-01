import { useMemo } from "react";
import "./content-item.scss";

const ContentItem = ({
    id = "",
    className = "",
    img,
    description,
    rtl,
    title,
    imgHeight = "auto"
}) => {

    let styles = useMemo(() => {
        let s = {
            img: {
                width: imgHeight ? "auto" : "",
                height: imgHeight
            },
            right: {
                width: !img ? "100%" : "",
                alignItems: !img ? "center" : ''
            }
        };

        return s;
    }, [img, imgHeight])

    return (
        <div
            id={id}
            className={`${className} content ${rtl ? "lft" : ""}`}
        >
            <div className="content-body">
                {img &&
                    <div className="left">
                        <img src={img} className="img" alt="img" style={styles.img} />
                    </div>
                }
                {(title || description) &&
                    <div
                        className="right"
                        style={styles.right}
                    >
                        <h3>
                            {title}
                        </h3>
                        <p>
                            {description}
                        </p>
                    </div>
                }
            </div>

        </div>
    )
}

export default ContentItem;