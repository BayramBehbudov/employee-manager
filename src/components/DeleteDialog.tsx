"use client";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

interface IProps {
  onSubmit: () => void;
}

const DeleteDialog: React.FC<IProps> = ({ onSubmit }: IProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        icon="pi pi-trash"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Are you sure you want to delete this employee?"
        visible={visible}
        onHide={() => {
          setVisible(false);
        }}
        draggable={false}
        headerClassName="p-2"
        contentClassName="px-5 py-2"
        footer={
          <div className="flex justify-end gap-4 mt-4 p-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setVisible(false)}
              className="bg-gray-500 hover:bg-gray-700 gap-2   text-white font-bold py-2 px-4 rounded"
            />
            <Button
              label="Delete"
              icon="pi pi-check"
              onClick={onSubmit}
              className="bg-red-500 hover:bg-red-700 gap-2 text-white font-bold py-2 px-4 rounded"
            />
          </div>
        }
      >
        <p>This action cannot be undone.</p>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
