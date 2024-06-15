import React, { useState, useEffect, useContext } from 'react'
import uuid from 'react-uuid';
import { Button } from '../../../components/UI/Button/Button';
import { Modal } from '../../../components/UI/Modal/Modal';
import { UMLDiagramSaveDto } from '../../../interfaces/Dto/UMLDiagramSaveDto';
import { UMLDiagram } from '../../../interfaces/Models/UMLDiagram';
import { DiagramCreateForm } from '../../components/DiagramCreateForm/DiagramCreateForm';
import { DiagramItem } from '../../components/DiagramItem/DiagramItem';
import { getUserUmls } from '../../../http/umlApi';
import cl from './UmlsViewer.module.css';
import { DiagramContext } from '../../..';

export const UmlsViewer = () => {
    const [userDiagrams, setUserDiagrams] = useState<UMLDiagram[]>([]);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

    const handleCloseCreateModal = () => setShowCreateModal(false);
    const handleShowCreateModal = () => setShowCreateModal(true);

    const fetchDiagrams = async () => {
      await getUserUmls().then((data) => setUserDiagrams(data)).catch((error) => console.error(error));
    };

    useEffect(() => {
      fetchDiagrams();
    }, [])
    
  return (
    <div className={cl.container}>
      <Modal
        onClose={handleCloseCreateModal}
        show={showCreateModal}
        title="Create new diagram"
      >
        <DiagramCreateForm
          fetchItems={fetchDiagrams}
          handleCloseCreateModal={handleCloseCreateModal}
        ></DiagramCreateForm>
      </Modal>
      <Button type="button" onClick={handleShowCreateModal}>Create new diagram</Button>
      <div className={cl.items}>
        {userDiagrams.map((diagram) => 
          <DiagramItem key={diagram.diagramId} diagram={diagram}></DiagramItem>
        )}
      </div>
    </div>
  )
}
