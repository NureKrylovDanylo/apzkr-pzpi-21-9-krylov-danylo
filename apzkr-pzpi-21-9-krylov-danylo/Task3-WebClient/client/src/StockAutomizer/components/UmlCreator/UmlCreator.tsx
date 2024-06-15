import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { DiagramContext } from "../../..";
import { useDiagram } from "../../../hooks/useDiagram";
import { UMLDiagram } from "../../../interfaces/Models/UMLDiagram";
import { projectCreationSteps } from "../../../types/ProjectCreationStep";
import { Steps } from "../Steps/Steps";
import { TableList } from "../TableList/TableList";
import { UmlView } from "../UmlView/UmlView";
import cl from "./UmlCreator.module.css";

export const UmlCreator = () => {
  const { fetchDiagram } = useContext(DiagramContext)!;
  const { diagramId } = useParams();

  useEffect(() => {
    if (diagramId) {
      fetchDiagram(diagramId);
    }
  }, [diagramId]);

  return (
    <div className={cl.wrapper}>
      <TableList></TableList>
      <UmlView></UmlView>
    </div>
  );
};
