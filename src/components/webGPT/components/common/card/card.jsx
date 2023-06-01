// import Box from "@material-ui/core/Box";
// import styled from "styled-components";
import "./card.scss";

const Card = ({
    children,
    className="",
    style={}
}) => {
    return (
        <div 
            className={`card ${className}`}
            style={style}
        >
            {children}
        </div>
    )
}

export default Card;