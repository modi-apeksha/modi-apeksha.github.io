import { ThemeProvider } from "./hooks/ThemeContext";
import { NotificationProvider } from "./hooks/NotificationContext";
import App from "./App";
import { ConfigProvider } from "./hooks/ConfigContext";

const WebGPT = ({
    brandName,
    brandDescription,
    brandLogo,
    header,
    footer,
    socials,
    themes,
    views
}) => {
    return (
        <ConfigProvider 
            brandName={brandName}
            brandDescription={brandDescription}
            brandLogo={brandLogo}
            header={header}
            footer={footer}
            socials={socials}
            views={views}
        >
            <ThemeProvider
                themes={themes}
            >
                <NotificationProvider>
                    <App />
                </NotificationProvider>
            </ThemeProvider>
        </ConfigProvider>
    )
}

export default WebGPT;