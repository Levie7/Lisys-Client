import * as React from 'react';

export interface UIContextValue {
    isMobile: boolean;
}

const UIContext = React.createContext<UIContextValue>({
    isMobile: true,
});
export default UIContext;
export const useUIContext = () => React.useContext(UIContext);
