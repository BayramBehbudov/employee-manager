import { useAtomValue, useSetAtom } from "jotai";
import {
  deleteEmployeeAtom,
  deleteVisibleAtom,
  deleteVisibleSetAtom,
  editEmployeeAtom,
  editParamsAtom,
  editParamsSetAtom,
  employeesAddAtom,
  employeesAtom,
  employeesSetAtom,
  loadingAtom,
  loadingSetAtom,
  visibleAtom,
  visibleSetAtom,
} from "../stores/atoms";

export const useAtoms = () => {
  const visible = useAtomValue(visibleAtom);
  const setVisible = useSetAtom(visibleSetAtom);

  const deleteVisible = useAtomValue(deleteVisibleAtom);
  const setDeleteVisible = useSetAtom(deleteVisibleSetAtom);

  const employees = useAtomValue(employeesAtom);
  const setEmployees = useSetAtom(employeesSetAtom);

  const addEmployee = useSetAtom(employeesAddAtom);

  const deleteEmployee = useSetAtom(deleteEmployeeAtom);
  const editEmployee = useSetAtom(editEmployeeAtom);

  const loading = useAtomValue(loadingAtom);
  const setLoading = useSetAtom(loadingSetAtom);

  const editParams = useAtomValue(editParamsAtom);
  const setEditParams = useSetAtom(editParamsSetAtom);
  return {
    editParams,
    setEditParams,
    visible,
    setVisible,
    employees,
    addEmployee,
    setEmployees,
    deleteEmployee,
    editEmployee,
    deleteVisible,
    setDeleteVisible,
    loading,
    setLoading,
  };
};
