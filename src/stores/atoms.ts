import { atom } from "jotai";
import type { IEmployee } from "../types/interface";

export const visibleAtom = atom<boolean>(false);
export const visibleSetAtom = atom(null, (_, set, value: boolean) =>
  set(visibleAtom, value)
);
export const loadingAtom = atom<boolean>(false);
export const loadingSetAtom = atom(null, (_, set, value: boolean) =>
  set(loadingAtom, value)
);
export const employeesAtom = atom<IEmployee[]>([]);
export const employeesSetAtom = atom(null, (_, set, value: IEmployee[]) =>
  set(employeesAtom, value)
);

export const employeesAddAtom = atom(null, (get, set, value: IEmployee) => {
  const lastEmployees = get(employeesAtom);
  set(employeesAtom, [value, ...lastEmployees]);
});

export const deleteEmployeeAtom = atom(null, (get, set, value: string) => {
  const lastEmployees = get(employeesAtom);
  const newEmployees = lastEmployees.filter((emp) => emp.id !== value);
  set(employeesAtom, newEmployees);
});

export const deleteVisibleAtom = atom<boolean>(false);
export const deleteVisibleSetAtom = atom(null, (_, set, value: boolean) =>
  set(deleteVisibleAtom, value)
);
export const editEmployeeAtom = atom(null, (get, set, value: IEmployee) => {
  const lastEmployees = get(employeesAtom);
  const newEmployees = lastEmployees.map((emp) =>
    emp.id === value.id ? value : emp
  );
  set(employeesAtom, newEmployees);
});

export const editParamsAtom = atom<string>("");
export const editParamsSetAtom = atom(null, (_, set, value: string) => {
  set(editParamsAtom, value);
});
