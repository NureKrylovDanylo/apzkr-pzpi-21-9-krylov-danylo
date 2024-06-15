import React, { ReactNode, useContext } from "react";
import cl from "./Navbar.module.css";
import records from "../../records.json";
import { NavLink } from "react-router-dom";
import { ContextMenuContext, UserSessionContext } from "../..";
import { ADMIN_ROLE, CREATOR_ROLE } from "../../consts";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, UMLS_VIEWER_ROUTE } from "../../routesConsts";
import { ContextMenu } from "../UI/ContextMenu/ContextMenu";

interface IProps {
  children: ReactNode;
}

interface INavigationItem {
  link: string;
  label: string;
  roles?: string[];
}

const navigationItems: INavigationItem[] = [];

const nonAuthNavigationItems: INavigationItem[] = [
  { link: LOGIN_ROUTE, label: "Login" },
  { link: REGISTRATION_ROUTE, label: "Registration" },
];

const authNavigationItems: INavigationItem[] = [
  { link: UMLS_VIEWER_ROUTE, label: "My umls", roles: [ADMIN_ROLE, CREATOR_ROLE] },
];

export const Navbar = ({ children }: IProps) => {
  const { isAuthorized, user } = useContext(UserSessionContext)!;
  const {hideMenu, position, isVisible, contextChildren} = useContext(ContextMenuContext)!;
  
  return (
    <div className={cl.wrapper}>
      {isVisible && (
          <ContextMenu position={position} onHide={hideMenu}>{contextChildren}</ContextMenu>
        )}
      <header className={cl.header}>
        <div className={cl.headerContent}>
          <div className={cl.logotype}>
            <img src={records.redLogotype} alt="Logotype" />
          </div>
          <nav className={cl.navigation}>
            {navigationItems.map(({ link, label }) => (
              <NavLink key={link} className={cl.navItem} to={link}>
                {label}
              </NavLink>
            ))}
            {isAuthorized
              ? authNavigationItems.map(
                  ({ link, label, roles }) =>
                    roles?.some((role) => user?.role.includes(role)) && (
                      <NavLink key={link} className={cl.navItem} to={link}>
                        {label}
                      </NavLink>
                    )
                )
              : nonAuthNavigationItems.map(({ link, label }) => (
                  <NavLink key={link} className={cl.navItem} to={link}>
                    {label}
                  </NavLink>
                ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};
