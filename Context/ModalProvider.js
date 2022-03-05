import React from "react";
export const ContextModal = React.createContext();
export const ModalProvider = (props) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const value = [isVisible, setIsVisible];
    return <ContextModal.Provider value={value} {...props} />;
};
