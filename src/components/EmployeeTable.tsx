"use client";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import type { IEmployee } from "../types/interface";
import "../styles/EmployeeTable.css";
import { useAtoms } from "../hooks/useAtoms";
import DeleteDialog from "./DeleteDialog";
import { LoadingState } from "./loading-state";
import { EmptyState } from "./empty-state";
import { formatPhoneNumber } from "../helpers/functions";
import axios from "axios";
import type { Toast } from "primereact/toast";

const EmployeeTable = ({ toast }: { toast: React.RefObject<Toast> }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    setVisible,
    loading,
    employees,
    deleteEmployee,
    setEditParams,
    setLoading,
  } = useAtoms();
  const avatarBody = (rowData: IEmployee) => (
    <div className="flex align-items-center">
      <img
        src={rowData.avatar}
        alt={`${rowData.firstName} ${rowData.lastName}`}
        width="50"
        height="50"
        className="employee-avatar rounded-full object-cover w-[50px] h-[50px]"
      />
    </div>
  );

  const nameBody = (rowData: IEmployee) => (
    <div className="flex flex-column">
      <span className="employee-name">
        {rowData.firstName} {rowData.lastName}
      </span>
    </div>
  );

  const positionBody = (rowData: IEmployee) => (
    <span className="employee-position">{rowData.position}</span>
  );

  const addressBody = (rowData: IEmployee) => (
    <span className="text-gray-600 text-sm">{rowData.address}</span>
  );

  const phoneBody = (rowData: IEmployee) => (
    <span className="employee-phone">{formatPhoneNumber(rowData.phone)}</span>
  );

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setVisible(false);
      const { status } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/${id}`
      );
      if (status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Employee deleted successfully",
          contentClassName: "p-4 gap-4 items-center justify-center",
        });
        deleteEmployee(id);
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Employee deleted failed",
        contentClassName: "p-4 gap-4 items-center justify-center",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const actionBody = (rowData: IEmployee) => (
    <div className="flex gap-2 action-buttons">
      <Button
        icon="pi pi-pencil"
        className="edit-button action-button"
        onClick={() => {
          setVisible(true);
          setEditParams(rowData.id);
        }}
      />
      <DeleteDialog onSubmit={() => handleDelete(rowData.id)} />
    </div>
  );

  return (
    <div className="employee-table-container">
      <div className="table-wrapper">
        <div className="table-header">
          <h2 className="table-title">Employee Management</h2>
          {employees.length > 0 ? (
            <div className="header-actions">
              <div className="search-container">
                <span className="search-icon">🔍</span>
                <InputText
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search employees..."
                  className="search-input"
                />
              </div>
              <Button
                icon="+"
                label="Add Employee"
                className="add-button"
                rounded
                outlined
                severity="success"
                onClick={() => {
                  setVisible(true);
                  setEditParams("");
                }}
              />
            </div>
          ) : null}
        </div>
        {employees.length === 0 ? (
          <div
            className="flex justify-center items-center"
            style={{ height: "calc(100vh - 220px)" }}
          >
            {loading ? <LoadingState /> : <EmptyState />}
          </div>
        ) : (
          <DataTable
            value={employees}
            sortMode="multiple"
            filters={{
              firstName: { value: searchQuery, matchMode: "contains" },
            }}
            paginator
            removableSort
            dataKey="id"
            loading={loading}
            loadingIcon="pi pi-spinner animate-spin text-white"
            rows={10}
            className="employee-datatable"
            emptyMessage={"No employees found matching your search criteria."}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
          >
            <Column
              header="Avatar"
              body={avatarBody}
              style={{ width: "80px", textAlign: "center" }}
              frozen
            />
            <Column
              sortable
              header="Name"
              body={nameBody}
              style={{ minWidth: "180px" }}
              sortField="firstName"
            />
            <Column
              header="Position"
              body={positionBody}
              style={{ minWidth: "150px" }}
              sortable
              sortField="position"
            />
            <Column
              header="Address"
              body={addressBody}
              style={{ minWidth: "200px" }}
              sortable
              sortField="address"
            />
            <Column
              header="Phone"
              body={phoneBody}
              style={{ minWidth: "140px" }}
            />
            <Column
              header="Actions"
              body={actionBody}
              style={{ width: "120px", textAlign: "center" }}
              frozen
              alignFrozen="right"
            />
          </DataTable>
        )}
      </div>
    </div>
  );
};

export default EmployeeTable;
