import ContentItem from "../../common/content-item/content-item";
import { useTheme } from "../../../hooks/ThemeContext";
import Button from "../../common/Button/Button";

const TextImage = ({
    id = "",
    className = "",
    img,
    description,
    rtl,
    title,
    imgHeight = "auto",
    actionButtons = []
}) => {
    const { SECONDARY_COLOR, TEXT_COLOR } = useTheme();
    return (
        <div>
            <ContentItem
                id={id}
                title={title}
                description={description}
                className={className}
                img={img}
                rtl={rtl}
                imgHeight={imgHeight}
            />
            <div>
                {actionButtons &&
                    <div className="btn-container">
                        {actionButtons.map((el, i) => (
                            <Button key={i} {...el} bgColor={SECONDARY_COLOR} textColor={TEXT_COLOR}>
                                {el.label}
                            </Button>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default TextImage;