import { IProjectStepViewer } from "../interfaces/IProjectStepViewer";

export type ProjectCreationStep = "FeaturesEnabling" | "UmlCreation" | "ColorsSelection" | "Receiving";
export const projectCreationSteps:IProjectStepViewer[] = [
    {step: "FeaturesEnabling", label: "Enabling features"},
    {step: "UmlCreation", label: "Creating UML diagram"},
    {step: "ColorsSelection", label: "Select colors"},
    {step: "Receiving", label: "Receiving"},
]