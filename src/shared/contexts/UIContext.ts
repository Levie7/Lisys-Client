import * as React from 'react';

export interface UIContextValue {
    isMobile: boolean;
}

export const UIContext = React.createContext<UIContextValue>({
    isMobile: true,
});
