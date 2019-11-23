import React, { createContext, useContext } from 'react';
import { BrowserRouter, Redirect, Route as RouteLib, RouteProps, Switch } from 'react-router-dom';

const DEFAULT_AUTH_PATH = '/login';

const RouterContext = createContext<{ authPath: string; isAuth?: boolean }>({
    authPath: DEFAULT_AUTH_PATH,
});

export const Router: React.FC<{
    authPath: string;
    isAuth?: boolean;
}> = ({ children, authPath, isAuth }) => (
    <RouterContext.Provider value={{ authPath, isAuth }}>
        <BrowserRouter>
            <Switch>{children}</Switch>
        </BrowserRouter>
    </RouterContext.Provider>
);

export const Route: React.FC<{ authenticate?: boolean } & RouteProps> = ({
    children,
    authenticate,
    component,
    ...rest
}) => {
    const { authPath, isAuth } = useContext(RouterContext);
    const Component = component as any;
    return (
        <RouteLib
            {...rest}
            render={({ location, ...props }) =>
                authenticate && !isAuth ? (
                    <Redirect
                        to={{
                            pathname: authPath,
                            state: { from: location },
                        }}
                    />
                ) : (
                    <Component location={location} {...props} />
                )
            }
        />
    );
};
