import React from "react";
import { Controller, type Control } from "react-hook-form";
import { motion } from "framer-motion";
import type { EmployeeType } from "../types/interface";

interface ImagePickerProps {
  control: Control<EmployeeType>;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ control }) => {
  return (
    <Controller
      control={control}
      name={"avatar"}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="flex gap-2 flex-col">
          <div className="flex gap-4">
            {value && (
              <div className="w-24 h-24 border rounded-md overflow-hidden">
                <img
                  src={value}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="w-24 h-24 border rounded-md flex items-center justify-center">
              <label className="cursor-pointer text-blue-500 flex flex-col items-center w-full h-full justify-center">
                <span className="text-lg">+</span>
                <span className="text-xs text-gray-500">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        onChange(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden "
                />
              </label>
            </div>
          </div>

          {error && (
            <motion.p
              className="text-red-500 text-sm mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.2 }}
            >
              {error.message}
            </motion.p>
          )}
        </div>
      )}
    />
  );
};

export default ImagePicker;
