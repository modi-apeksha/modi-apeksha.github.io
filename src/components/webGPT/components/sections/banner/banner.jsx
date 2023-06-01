import { useTheme } from "../../../hooks/ThemeContext";
import Button from "../../common/Button/Button";
import Link from "../../common/link/link";
import "./banner.scss";

const Banner = ({
    img = "",
    suptitle = "",
    title = "",
    subtitle = "",
    text = "",
    actionButtons = [],
    rtl,
    imageHeight = "100%",
    setImageAsBackground = false
}) => {

    const { SECONDARY_COLOR, TEXT_COLOR } = useTheme();

    return (
        <div
            className={`banner ${rtl ? "rtl" : "ltr"} ${setImageAsBackground ? "bg-img" : ""}`}
        >
            <div className="banner-content">
                {img &&
                    <div className={`left ${setImageAsBackground ? "bg-left" : "hidden-sm"}`}>
                        <img
                            src={img}
                            className="bannerImage"
                            alt="bannerImage"
                            height={imageHeight}
                        />
                    </div>
                }
                <div className="right">
                    {suptitle &&
                        <h3>
                            {suptitle}
                        </h3>
                    }
                    {title &&
                        <h1>
                            {title}
                        </h1>
                    }
                    {subtitle &&
                        <h3>
                            {subtitle}
                        </h3>
                    }
                    {text &&
                        <p>
                            {text}
                        </p>
                    }
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

        </div>
    )
}

export default Banner;