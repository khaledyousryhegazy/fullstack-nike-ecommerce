import { z } from "zod";

export const addSchema = z.object({
  title: z.string().min(2, "Product name can't be less than 2 characters"),
  price: z.coerce.number().min(2, "Enter a valid price, please"),
  category: z.string().min(2, "Category can't be less than 2 characters"),
  gender: z.string().nonempty("Gender is required"),
  ageGroup: z.string().nonempty("Age group is required"),
});
