import { useEffect, useState } from "react"
import { ImSpinner2 } from "react-icons/im";
import "./spinner.scss";


const Spinner = ({
    isFullScreen,
    holdForMounting,
    loading,
    children,
    fontSize = "",
    color = "",
    size = 2,
    className = "",
    bgColor,
    fullScreen
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (holdForMounting)
            setMounted(true);
    }, []);

    let spinner = <div className={`spinner-container ${className}`} style={{
        fontSize: fontSize,
    }} >
        <ImSpinner2 className={`fa-spin fa-${size}x`}/>
    </div>

    if (isFullScreen || fullScreen) {
        spinner = <div className="fullscreen-spinner" style={{ background: bgColor }}>
            {spinner}
        </div>
    }

    if (!children || loading || (holdForMounting && !mounted)) {
        return spinner;
    }

    return children;

}

export default Spinner;