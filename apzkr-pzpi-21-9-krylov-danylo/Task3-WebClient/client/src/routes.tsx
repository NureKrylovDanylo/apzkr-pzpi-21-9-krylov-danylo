import { ComponentType } from "react";
import { Login } from "./Auth/pages/Login/Login";
import { Registration } from "./Auth/pages/Registration/Registration";
import { CREATOR_ROLE } from "./consts";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, UMLS_VIEWER_ROUTE, UML_CREATOR_ROUTE } from "./routesConsts";
import { Project } from "./UmlCreator/pages/Project/Project";
import { UmlsViewer } from "./UmlView/pages/UmlsViewer/UmlsViewer";

interface RouteData {
    path: string,
    Component: ComponentType<{}>,
    roles?: string[]
}

export const authRoutes: RouteData[] = [
    { path: UML_CREATOR_ROUTE + `/:diagramId`, Component: Project, roles: [CREATOR_ROLE]},
    { path: UMLS_VIEWER_ROUTE, Component: UmlsViewer, roles: [CREATOR_ROLE]},
];

export const publicRoutes: RouteData[] = [
    { path: REGISTRATION_ROUTE, Component: Registration},
    { path: LOGIN_ROUTE, Component: Login},
];