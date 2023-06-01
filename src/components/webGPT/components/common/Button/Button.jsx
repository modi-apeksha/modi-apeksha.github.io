import { useMemo } from "react"
import { useTheme } from "../../../hooks/ThemeContext"
import { useNavigate } from "react-router-dom";
import {scrollToElement} from "../../../utils/helpers";

const Button = ({
    className = "",
    type = 'primary',
    bgColor,
    textColor,
    children,
    borderRadius = 25,
    height = 48,
    onClick,
    to,
    href,
    ...rest
}) => {

    const { PRIMARY_COLOR, SECONDARY_COLOR } = useTheme();
    const navigate = useNavigate();
    const style = useMemo(() => {
        return {
            backgroundColor: bgColor || PRIMARY_COLOR,
            color: textColor || SECONDARY_COLOR,
            borderRadius: borderRadius || "",
            height: height,
            outline: "none",
            border: "unset"
        }
    }, [PRIMARY_COLOR, SECONDARY_COLOR, bgColor, textColor, borderRadius, height]);


    const handleClick = (e) => {
        if (onClick)
            return onClick(e);
        if (to)
            return navigate(to);

        if (href) {
            if(href.charAt(0) === "#"){
                return scrollToElement(href.substring(1))
            }
            return window.location.href = href;
        }

    }

    return (
        <button
            className={`${className} btn btn-${type}`}
            {...rest}
            style={style}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default Button;