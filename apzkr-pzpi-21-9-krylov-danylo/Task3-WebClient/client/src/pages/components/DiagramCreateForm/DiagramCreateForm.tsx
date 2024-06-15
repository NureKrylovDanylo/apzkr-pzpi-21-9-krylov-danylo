import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";
import { FormLayout } from "../../../components/FormLayout/FormLayout";
import { Button } from "../../../components/UI/Button/Button";
import { Input } from "../../../components/UI/Input/Input";
import { UMLDiagramSaveDto } from "../../../interfaces/Dto/UMLDiagramSaveDto";
import { saveUmlDiagram } from "../../../http/umlApi";
import { DiagramContext } from "../../..";

interface IProps {
  fetchItems: () => void;
  handleCloseCreateModal: () => void;
}

export const DiagramCreateForm = ({
  fetchItems,
  handleCloseCreateModal,
}: IProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UMLDiagramSaveDto>();
  const {diagram, addNewDiagram} = useContext(DiagramContext)!;

  const createDiagram = async (data: UMLDiagramSaveDto) => {
    const newDiagram: UMLDiagramSaveDto = {
      ...data,
      diagramId: uuid(),
      tables: [],
      connections: [],
    };

    await addNewDiagram(newDiagram).then(() => {
      fetchItems();
      handleCloseCreateModal();
    }).catch((error) => console.error(error));
  };

  return (
    <div>
      <FormLayout onSubmit={handleSubmit(createDiagram)}>
        <Input
          control={control}
          label="Diagram name"
          inputType="text"
          name="name"
          errorMessage={errors.name?.message}
          rules={{
            required: "Name is required",
            maxLength: {
              value: 20,
              message: "Max length should be under 20 chars",
            },
          }}
        ></Input>
        <Button type="submit">Create</Button>
      </FormLayout>
    </div>
  );
};
