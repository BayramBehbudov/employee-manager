import { motion } from "framer-motion";
import { Controller, type Control } from "react-hook-form";
import type { EmployeeType } from "../types/interface";
import { InputText } from "primereact/inputtext";

interface IControlledInput {
  control: Control<EmployeeType>;
  name: keyof EmployeeType;
}

const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

const ControlledInput = ({ control, name }: IControlledInput) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <div className="space-y-1">
            <InputText
              id={name}
              name={name}
              className="w-full border border-zinc-500/50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={value ? value.toString() : ""}
              onChange={onChange}
              autoComplete="off"
              placeholder={formatLabel(name)}
            />
            {error && (
              <motion.p
                className="text-red-500 text-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.2 }}
              >
                {error?.message}
              </motion.p>
            )}
          </div>
        );
      }}
    />
  );
};

export default ControlledInput;
