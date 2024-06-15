import { $authhost } from "."
import { UMLDiagramSaveDto } from "../interfaces/Dto/UMLDiagramSaveDto";

export const getUserUmls = async () => {
    const {data} = await $authhost.get('api/UserUML')
    return data;
}

export const saveUmlDiagram = async (diagram: UMLDiagramSaveDto) => {
    const {data} = await $authhost.post('api/UserUML/save', diagram)
    return data;
}

export const getUmlDiagram = async (id: string) => {
    const {data} = await $authhost.get(`api/UserUML/${id}`)
    return data;
}