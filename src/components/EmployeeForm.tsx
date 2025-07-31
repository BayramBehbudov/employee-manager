import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { useAtoms } from "../hooks/useAtoms";
import { useEffect, useMemo } from "react";
import { BorderBeam } from "./border-beam";
import { EmployeeSchema, type EmployeeType } from "../types/interface";
import ControlledInput from "./ControlledInput";
import ImagePicker from "./ImagePicker";
import axios from "axios";
import { formatPhoneNumber } from "../helpers/functions";
import { Button } from "primereact/button";
import "../styles/Form.css";
import type { Toast } from "primereact/toast";

const EmployeeForm = ({ toast }: { toast: React.RefObject<Toast> }) => {
  const {
    setVisible,
    visible,
    editEmployee,
    addEmployee,
    editParams,
    employees,
    setLoading,
  } = useAtoms();
  const isCreate = useMemo(() => editParams === "", [editParams]);
  const defaultValues = useMemo(() => {
    if (isCreate) {
      return {
        firstName: "",
        lastName: "",
        address: "",
        avatar: "",
        position: "",
        phone: "",
      };
    }
    const find = employees.find((e) => e.id === editParams);
    return { ...find, phone: formatPhoneNumber(find?.phone) };
  }, [editParams, employees, isCreate]);

  const { handleSubmit, control, reset } = useForm<EmployeeType>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const onCreate = async (formData: EmployeeType) => {
    try {
      setLoading(true);
      const { data, status } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        formData
      );
      if (status === 201) {
        addEmployee(data);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Employee added successfully",
          contentClassName: "p-4 gap-4 items-center justify-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Employee added failed",
        contentClassName: "p-4 gap-4 items-center justify-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (formData: EmployeeType) => {
    if (editParams === "") return;
    try {
      setLoading(true);
      const { data, status } = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${editParams}`,
        formData
      );
      if (status === 200) {
        editEmployee(data);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Employee updated successfully",
          contentClassName: "p-4 gap-4 items-center justify-center",
        });
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Employee updated failed",
        contentClassName: "p-4 gap-4 items-center justify-center",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (formData: EmployeeType) => {
    setVisible(false);
    if (isCreate) {
      onCreate(formData);
    } else {
      onUpdate(formData);
    }
  };
  return (
    <Dialog
      header="Employee Form"
      visible={visible}
      style={{ width: "50vw" }}
      contentClassName="p-5"
      headerClassName="px-5 py-2"
      maximizable
      draggable={false}
      onHide={() => {
        setVisible(false);
      }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      <motion.div
        className="relative p-6 border border-zinc-500/50 rounded-xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <motion.div
            className="gap-8 grid grid-cols-1 md:grid-cols-2"
            variants={itemVariants}
          >
            <ControlledInput name="firstName" control={control} />
            <ControlledInput name="lastName" control={control} />
          </motion.div>
          <motion.div
            className="gap-8 grid grid-cols-1 md:grid-cols-2"
            variants={itemVariants}
          >
            <ControlledInput name="position" control={control} />
            <ControlledInput name="phone" control={control} />{" "}
          </motion.div>
          <motion.div className="space-y-1" variants={itemVariants}>
            <ControlledInput name="address" control={control} />
          </motion.div>
          <motion.div className="space-y-1" variants={itemVariants}>
            <ImagePicker control={control} />
          </motion.div>

          <motion.div
            className="flex justify-end gap-3 pt-4 border-surface-200 dark:border-surface-700 border-t"
            variants={itemVariants}
          >
            <Button
              type="button"
              label="Cancel"
              severity="secondary"
              className="remove-button"
              outlined
              onClick={() => {
                reset(defaultValues);
                setVisible(false);
              }}
            />
            <Button
              type="submit"
              className="create-button"
              label={isCreate ? "Create" : "Update"}
            />
          </motion.div>
        </form>
        <BorderBeam
          duration={6}
          borderWidth={2}
          reverse
          size={400}
          className="from-transparent via-red-500 to-transparent"
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          borderWidth={2}
          reverse
          className="from-transparent via-blue-500 to-transparent"
        />
      </motion.div>
    </Dialog>
  );
};

export default EmployeeForm;
