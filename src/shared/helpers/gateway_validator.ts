import { boolean, date, mixed, number, object, string } from "yup";

type Vaccine = "Sputnik" | "AstraZeneca" | "Pfizer" | "Jhonson&Jhonson";
const vaccine_allowed: Vaccine[] = [
  "Sputnik",
  "AstraZeneca",
  "Pfizer",
  "Jhonson&Jhonson",
];
export const userSchema = object({
  first_name: string()
    .required()
    .matches(/^[A-Za-z]+$/, "Must be only letters"),
  last_name: string()
    .required()
    .matches(/^[A-Za-z]+$/, "Must be only letters"),
  email: string().required().email(),
  document_number: string()
    .required()
    .length(10)
    .matches(/^[0-9]+$/, "Must be only digits"),
  date_birth: date(),
  address: string(),
  phone: string().min(3),
  vaccine_status: boolean(),
  vaccine_date: date(),
  vaccine_type: mixed<Vaccine>().oneOf(vaccine_allowed),
  vaccine_dose: number().integer().positive(),
}).required();

export const reportSchema = object({
  vaccine_status: boolean(),
  vaccine_date_start: date(),
  vaccine_date_end: date(),
  vaccine_type: mixed<Vaccine>().oneOf(vaccine_allowed),
}).required();
