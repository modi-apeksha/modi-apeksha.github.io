import { createContext, useContext, useMemo } from "react";
import * as defaultConfig from "../config/default.config";



const ConfigContext = createContext(null);
export const useConfig = () => {
    const configContext = useContext(ConfigContext);
    if (!configContext) {
        throw new Error(
            `useConfig() can only be used inside of <ConfigProvider />, please declare it at a higher level.`,
        );
    }
    const { 
        brandName,
        brandDescription,
        brandLogo,
        header,
        footer,
        socials,
        views,
     } = configContext;
    return useMemo(() => {
        return {
            brandName,
            brandDescription,
            brandLogo,
            header,
            footer,
            socials,
            views,
        }
    }, [
        brandName,
        brandDescription,
        brandLogo,
        header,
        footer,
        socials,
        views,
    ])
}

export const ConfigProvider = ({
    brandName=defaultConfig.BRAND_NAME,
    brandDescription=defaultConfig.BRAND_DESCRIPTION,
    brandLogo=defaultConfig.LOGO_PATH,
    header=defaultConfig.HEADER_CONFIG,
    footer=defaultConfig.FOOTER_CONFIG,
    socials=defaultConfig.SOCIAL_LINKS,
    views=defaultConfig.VIEWS,
    children
}) => {
    return (
        <ConfigContext.Provider
            value={{
                brandName,
                brandDescription,
                brandLogo,
                header: {
                    // use default height for header if height is not provided
                    height: defaultConfig.HEADER_CONFIG.height, 
                    ...header,
                },
                footer,
                socials,
                views,
            }}
        >
            {children}
        </ConfigContext.Provider>
    )
}