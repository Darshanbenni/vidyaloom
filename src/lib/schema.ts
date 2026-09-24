import { z } from "zod";

export const roleOptions = [
  "Principal",
  "Management",
  "Administrator",
  "Teacher",
  "IT Team",
  "Other",
] as const;

export const interestOptions = [
  "School ERP",
  "Website & Admissions CRM",
  "AI & Dashboards",
  "Training & Workshops",
  "Complete Solution",
  "Other",
] as const;

export const requestTypeOptions = ["demo", "workshop", "contact"] as const;

export const sourceOptions = [
  "header",
  "hero",
  "solution-erp",
  "solution-crm",
  "solution-ai",
  "training",
  "dashboard",
  "final-cta",
  "contact",
] as const;

export const demoFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name cannot exceed 100 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long."),
  phone: z
    .string()
    .trim()
    .max(32, "Phone number cannot exceed 32 characters.")
    .optional()
    .or(z.literal("")),
  institution: z
    .string()
    .trim()
    .min(2, "Institution name must be at least 2 characters.")
    .max(160, "Institution name cannot exceed 160 characters."),
  role: z
    .enum(roleOptions)
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .trim()
    .max(100, "City name cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),
  interest: z.enum(interestOptions),
  requirements: z
    .string()
    .trim()
    .max(2000, "Requirements cannot exceed 2000 characters.")
    .optional()
    .or(z.literal("")),
  preferredDate: z
    .string()
    .optional()
    .or(z.literal("")),
  permission: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted and accept the Privacy Policy.",
  }),
  requestType: z.enum(requestTypeOptions).default("demo"),
  source: z.string().default("header"),
  submissionId: z.string().min(1, "Missing submission ID"),
  turnstileToken: z.string().optional().or(z.literal("")),
  honeypot: z.string().max(0, "Invalid submission detected").optional().or(z.literal("")),
});

export type DemoFormData = z.infer<typeof demoFormSchema>;
