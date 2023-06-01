
import Card from "../../common/card/card";
import ContentItem from "../../common/content-item/content-item";
import "./list-cards.scss";
import { useTheme } from "../../../hooks/ThemeContext";
import Button from "../../common/Button/Button";

const ListCards = ({
    cardInfo = [],
    id = ""
}) => {

    const {
        HIGHLIGHT_BG_COLOR,
        HIGHLIGHT_TEXT_COLOR,
        SECONDARY_COLOR,
        TEXT_COLOR
    } = useTheme();

    return (
        <div className="info-cards-container" id={id}>
            {cardInfo.map((el, i) => (
                <Card
                    key={i}
                    className="info-cards"
                    style={{
                        backgroundColor: HIGHLIGHT_BG_COLOR || SECONDARY_COLOR,
                        color: HIGHLIGHT_TEXT_COLOR || TEXT_COLOR
                    }}
                >

                    <ContentItem
                        img={el.img}
                        description={el.description}
                        title={el.title}
                    />

                    {el.href && <Button key={i} href={el.href} bgColor={"#f2f2f2"} textColor={"#000"}>
                        {el.label}
                    </Button>}
                </Card>
            ))}
        </div>
    )
}

export default ListCards;