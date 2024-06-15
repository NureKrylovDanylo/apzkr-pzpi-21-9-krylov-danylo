import React, {useState, Dispatch, SetStateAction, useContext} from 'react'
import { Control, FieldValues, useFieldArray, useWatch } from 'react-hook-form';
import { DiagramContext } from '../../..';
import { Button } from '../../../components/UI/Button/Button';
import { UMLDiagram } from '../../../interfaces/Models/UMLDiagram';
import { UMLTable } from '../../../interfaces/Models/UMLTable';
import { TableListItem } from '../TableListItem/TableListItem';
import cl from './TableList.module.css';

export const TableList = () => {
    const [openTableId, setOpenTableId] = useState<string>();
    const {diagram, addNewTable} = useContext(DiagramContext)!;

    const toggleTable = (tableId: string) => {
        setOpenTableId(tableId === openTableId ? undefined : tableId)
    }

  return (
    <div className={cl.content}>
        <div className={cl.createButton}>
            <Button type="button" onClick={addNewTable}>New table</Button>
        </div>
        <ul className={cl.list}>
            {diagram?.tables?.map((table:UMLTable) =>
                <TableListItem isOpen={openTableId === table.tableId} key={table.tableId} table={table} toggleTable={toggleTable}></TableListItem>
            )}
        </ul>
    </div>
  )
}
