import z from "zod";

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  avatar: string;
  position: string;
  phone: string;
}

export const EmployeeSchema = z.object({
  firstName: z
    .string({ error: "First name is required" })
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must be at most 50 characters long"),
  lastName: z
    .string({ error: "Last name is required" })
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name must be at most 50 characters long"),
  address: z
    .string({ error: "Address is required" })
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address must be at most 100 characters long"),
  avatar: z
    .string({ error: "Avatar URL is required" })
    .url("Avatar URL must be a valid URL"),
  position: z
    .string({ error: "Position is required" })
    .min(2, "Position must be at least 2 characters long")
    .max(50, "Position must be at most 50 characters long"),
  phone: z
    .string({ error: "Phone number is required" })
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Phone number must be a valid international phone number (e.g., +1234567890)"
    ),
});

export type EmployeeType = z.infer<typeof EmployeeSchema>;
