import { createContext, useContext, useMemo, useState } from "react";
import Notification from "../components/common/notification/notification";

const NotificationContext = createContext(null);

export const useNotification = () => {
    const notificationContext = useContext(NotificationContext);
    if(!notificationContext){
        throw new Error(
            "useNotification() can only be used inside of <NotificationProvider />, " + "please declare it at a higher level.",
          );
    }

    const { setNotification } = notificationContext;
    return useMemo(() => {
        return {
            setNotification
        }
    }, [notificationContext])
}

export const NotificationProvider = ({children}) => {
    const [ notification, setNotification ] = useState(null);

    return (
        <NotificationContext.Provider
            value={{setNotification}}
        >
            {children}
            <Notification data={notification} />
        </NotificationContext.Provider>
    )
}