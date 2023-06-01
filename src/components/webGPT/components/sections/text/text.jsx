import ContentItem from "../../common/content-item/content-item";

const Text = ({ 
    id, 
    className = "", 
    title, 
    description,
    bgColor,
    textColor
}) => {
    return (
        <ContentItem
            id={id}
            title={title}
            description={description}
            className = {className}
            bgColor={bgColor}
            textColor={textColor}
        />
    )
}

export default Text;