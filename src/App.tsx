"use client";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { useEffect, useRef } from "react";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";
import GlobalProvider from "./providers/GlobalProvider";
import { useAtoms } from "./hooks/useAtoms";
import axios from "axios";
import { Toast } from "primereact/toast";

function App() {
  const { setEmployees, employees, setLoading } = useAtoms();
  const toast = useRef<Toast>(null);
  useEffect(() => {
    (async () => {
      if (employees.length > 0) return;
      try {
        setLoading(true);
        const { data, status } = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`
        );

        if (data.length > 0 && status === 200) {
          setEmployees(data);
        }
      } catch (error) {
        console.log(error);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [employees.length, setEmployees, setLoading]);

  return (
    <GlobalProvider>
      <div className="flex justify-center items-center">
        <EmployeeTable toast={toast} />
        <EmployeeForm toast={toast} />
      </div>
      <Toast ref={toast} position="top-center"  />
    </GlobalProvider>
  );
}

export default App;
