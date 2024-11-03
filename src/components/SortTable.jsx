import React, { useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable
} from "@dnd-kit/sortable";
import { useTable } from "react-table";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const DragHandle = ({ isDragging, ...props }) => (
  <div className={`drag-handle ${isDragging ? 'grabbing' : ''}`} {...props}>
    <ArrowDownwardIcon/>
  </div>
);

const DraggableTableRow = ({ row }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.original.id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition: transition || undefined,
    zIndex: isDragging ? 9999 : undefined,
    position: isDragging ? 'relative' : undefined,
    background: isDragging ? 'rgba(127, 207, 250, 0.3)' : undefined,
  };

  return (
    <tr ref={setNodeRef} style={style} {...row.getRowProps()}>
      {row.cells.map((cell, i) => (
        <td key={i} className="table-data" {...cell.getCellProps()}>
          {i === 0 && (<DragHandle isDragging={isDragging} {...attributes} {...listeners} />)}
          {cell.render('Cell')}
        </td>
      ))}
    </tr>
  );
};

export function SortTable({ data, setData }) {
  const [activeId, setActiveId] = useState(null);

  // Ensure data is always an array
  const safeData = useMemo(() => data || [], [data]);

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        accessor: "action",
      },
      {
        Header: "Data",
        accessor: "value",
      }
    ],
    []
  );

  const items = useMemo(() => safeData.map(({ id }) => id), [safeData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: safeData,
  });

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setData((data) => arrayMove(data, items.indexOf(active.id), items.indexOf(over.id)));
    }
    setActiveId(null);
  };

  const handleDragCancel = () => setActiveId(null);

  const selectedRow = useMemo(() => {
    if (!activeId) return null;
    const row = rows.find(({ original }) => original.id === activeId);
    prepareRow(row);
    return row;
  }, [activeId, rows, prepareRow]);

  return (
    <div style={{position:'relative',width:'100%', overflow:'hidden'}}>
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
    >
     
      <table {...getTableProps()}>
      
        <tbody {...getTableBodyProps()}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {rows.map((row) => {
              prepareRow(row);
              return <DraggableTableRow key={row.original.id} row={row} />;
            })}
          </SortableContext>
        </tbody>
      </table>
    
    </DndContext></div>
  );
}
