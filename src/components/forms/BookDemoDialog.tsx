"use client";

import React, { useState, useRef, useId } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useDemoModal, type DemoModalOptions } from "./DemoModalContext";
import {
  demoFormSchema,
  roleOptions,
  interestOptions,
  type DemoFormData,
} from "@/lib/schema";

// Map incoming interest string to one of the strict schema options
function mapInterest(rawInterest?: string): (typeof interestOptions)[number] {
  if (!rawInterest) return "Complete Solution";
  if (interestOptions.includes(rawInterest as (typeof interestOptions)[number])) {
    return rawInterest as (typeof interestOptions)[number];
  }
  const lower = rawInterest.toLowerCase();
  if (lower.includes("erp") || lower.includes("automation")) return "School ERP";
  if (lower.includes("crm") || lower.includes("admission") || lower.includes("website"))
    return "Website & Admissions CRM";
  if (lower.includes("dashboard") || lower.includes("ai")) return "AI & Dashboards";
  if (lower.includes("workshop") || lower.includes("training") || lower.includes("robotics"))
    return "Training & Workshops";
  return "Complete Solution";
}

interface FormContentProps {
  options: DemoModalOptions;
  onClose: () => void;
}

function BookDemoFormContent({ options, onClose }: FormContentProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotId = useId();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    role: "",
    city: "",
    interest: mapInterest(options.interest),
    requirements: "",
    preferredDate: "",
    permission: false,
    honeypot: "",
  });

  const [submissionId, setSubmissionId] = useState<string>(() => crypto.randomUUID());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // If there was an error for this field, clear it as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    // If an attempt previously failed, generate a fresh submissionId upon edits
    if (status === "error") {
      setSubmissionId(crypto.randomUUID());
      setStatus("idle");
      setServerError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate using Zod schema
    const payloadToValidate: DemoFormData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      institution: formData.institution,
      role: (formData.role as (typeof roleOptions)[number]) || undefined,
      city: formData.city,
      interest: formData.interest as (typeof interestOptions)[number],
      requirements: formData.requirements,
      preferredDate: formData.preferredDate,
      permission: formData.permission,
      requestType: options.requestType || "demo",
      source: options.source || "header",
      submissionId,
      turnstileToken: "",
      honeypot: formData.honeypot,
    };

    const validation = demoFormSchema.safeParse(payloadToValidate);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);

      // Focus first invalid field
      const firstInvalidFieldName = Object.keys(fieldErrors)[0];
      if (firstInvalidFieldName && formRef.current) {
        const invalidElement = formRef.current.elements.namedItem(firstInvalidFieldName) as
          | HTMLElement
          | undefined;
        invalidElement?.focus();
      }
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      const result = await response.json().catch(() => null);

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setServerError(
          result?.message ||
            "Unable to submit your enquiry at this moment. Please try again or contact us directly."
        );
      }
    } catch {
      setStatus("error");
      setServerError(
        "Network connection issue. Your details have been preserved; please click below to retry."
      );
    }
  };

  const getDialogTitle = () => {
    switch (options.requestType) {
      case "workshop":
        return "Request a School Workshop";
      case "contact":
        return "Get in Touch with Vidyaloom";
      default:
        return "Book a Free Platform Demo";
    }
  };

  const getDialogSubtitle = () => {
    switch (options.requestType) {
      case "workshop":
        return "Invite our AI & coding engineers for a hands-on live technology workshop at your school.";
      case "contact":
        return "Have questions? Our institutional advisors will get back to you within 24 hours.";
      default:
        return "Experience how Vidyaloom transforms school management, admissions, and student learning.";
    }
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#E3EAF4] shadow-2xl">
      {status === "success" ? (
        <div className="py-8 px-2 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#E9FBF4] text-[#00B990] flex items-center justify-center mb-5 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#081F44] tracking-tight mb-3">
            Enquiry Received!
          </h3>

          <p className="text-[16px] text-[#50627E] max-w-md mx-auto leading-relaxed mb-6">
            Thank you, <strong className="text-[#081F44]">{formData.fullName}</strong>. We have
            received your enquiry for{" "}
            <strong className="text-[#081F44]">{formData.institution}</strong>. Our educational
            technology advisor will contact you at{" "}
            <strong className="text-[#081F44]">{formData.email}</strong> to coordinate your
            personalized walkthrough.
          </p>

          <div className="bg-[#F0F4FE] border border-[#CBDDF8] rounded-2xl p-4 text-xs text-[#50627E] max-w-md mb-8 text-left space-y-1.5">
            <p>
              <strong>Reference ID:</strong> <span className="font-mono">{submissionId.slice(0, 8)}...</span>
            </p>
            <p>
              <strong>Focus Area:</strong> {formData.interest}
            </p>
            {formData.preferredDate && (
              <p>
                <strong>Preferred Date:</strong> {formData.preferredDate} (Subject to availability)
              </p>
            )}
          </div>

          <PrimaryButton
            type="button"
            size="lg"
            icon={false}
            onClick={onClose}
            className="px-8 py-3 text-[15px]"
          >
            Done
          </PrimaryButton>
        </div>
      ) : (
        <>
          <DialogHeader className="mb-4 text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-7 h-7 rounded-lg bg-[#EAF4FE] text-[#0098FF] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0098FF]">
                {options.requestType === "workshop"
                  ? "Interactive Workshop"
                  : options.requestType === "contact"
                  ? "Contact Advisors"
                  : "Direct Platform Walkthrough"}
              </span>
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-[#081F44] tracking-tight leading-tight">
              {getDialogTitle()}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-[15px] text-[#50627E] leading-relaxed">
              {getDialogSubtitle()}
            </DialogDescription>
          </DialogHeader>

          {serverError && (
            <div
              role="alert"
              className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Honeypot field - hidden from people and assistive tech */}
            <div
              style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
              aria-hidden="true"
            >
              <label htmlFor={honeypotId}>Do not fill this field</label>
              <input
                id={honeypotId}
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold uppercase tracking-wider text-[#081F44] mb-1.5"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. Dr. Kavita Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#CBDDF8] bg-[#FAFCFF] focus:bg-white focus:border-[#0098FF] focus:outline-none focus:ring-2 focus:ring-[#0098FF]/20 text-[#081F44] placeholder:text-[#50627E]/50 transition-all disabled:opacity-60"
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-[#081F44] mb-1.5"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@institution.org"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#CBDDF8] bg-[#FAFCFF] focus:bg-white focus:border-[#0098FF] focus:outline-none focus:ring-2 focus:ring-[#0098FF]/20 text-[#081F44] placeholder:text-[#50627E]/50 transition-all disabled:opacity-60"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Phone & Institution Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold uppercase tracking-wider text-[#081F44] mb-1.5"
                >
                  Phone / WhatsApp <span className="text-[#50627E]/60 text-[11px] font-normal">(Optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#CBDDF8] bg-[#FAFCFF] focus:bg-white focus:border-[#0098FF] focus:outline-none focus:ring-2 focus:ring-[#0098FF]/20 text-[#081F44] placeholder:text-[#50627E]/50 transition-all disabled:opacity-60"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="institution"
                  className="block text-xs font-bold uppercase tracking-wider text-[#081F44] mb-1.5"
                >
                  School / College Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  required
                  placeholder="e.g. Greenwood Academy"
                  value={formData.institution}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  aria-invalid={!!errors.institution}
                  aria-describedby={errors.institution ? "institution-error" : undefined}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#CBDDF8] bg-[#FAFCFF] focus:bg-white focus:border-[#0098FF] focus:outline-none focus:ring-2 focus:ring-[#0098FF]/20 text-[#081F44] placeholder:text-[#50627E]/50 transition-all disabled:opacity-60"
                />
                {errors.institution && (
                  <p id="institution-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.institution}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Your Role & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="role"
                  className="block text-xs font-bold uppercase tracking-wider text-[#081F44] mb-1.5"
                >
                  Your Role <span className="text-[#50627E]/60 text-[11px] font-normal">(Optional)</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#CBDDF8] bg-[#FAFCFF] focus:bg-white focus:border-[#0098FF] focus:outline-none focus:ring-2 focus:ring-[#0098FF]/20 text-[#081F44] transition-all disabled:opacity-60 cursor-pointer"
                >
                  <option value="">Select your role...</option>
                  {roleOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-xs font-bold uppercase tracking-wider text-[#081F44] mb-1.5"
                >
                  City / Location <span className="text-[#50627E]/60 text-[11px] font-normal">(Optional)</span>
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="e.g. Bangalore, Mumbai"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#CBDDF8] bg-[#FAFCFF] focus:bg-white focus:border-[#0098FF] focus:outline-none focus:ring-2 focus:ring-[#0098FF]/20 text-[#081F44] placeholder:text-[#50627E]/50 transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {/* Row 4: Interested in & Preferred Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="interest"
                  className="block text-xs font-bold uppercase tracking-wider text-[#081F44] mb-1.5"
                >
                  Primary Focus Area <span className="text-red-500">*</span>
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  aria-invalid={!!errors.interest}
                  aria-describedby={errors.interest ? "interest-error" : undefined}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#CBDDF8] bg-[#FAFCFF] focus:bg-white focus:border-[#0098FF] focus:outline-none focus:ring-2 focus:ring-[#0098FF]/20 text-[#081F44] transition-all disabled:opacity-60 cursor-pointer font-medium"
                >
                  {interestOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.interest && (
                  <p id="interest-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.interest}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="preferredDate"
                  className="block text-xs font-bold uppercase tracking-wider text-[#081F44] mb-1.5"
                >
                  Preferred Date <span className="text-[#50627E]/60 text-[11px] font-normal">(Optional)</span>
                </label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.preferredDate}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#CBDDF8] bg-[#FAFCFF] focus:bg-white focus:border-[#0098FF] focus:outline-none focus:ring-2 focus:ring-[#0098FF]/20 text-[#081F44] transition-all disabled:opacity-60 cursor-pointer"
                />
                <span className="text-[11px] text-[#50627E]/70 block mt-1">
                  Asia/Kolkata timezone preference
                </span>
              </div>
            </div>

            {/* Row 5: Requirements / Notes */}
            <div>
              <label
                htmlFor="requirements"
                className="block text-xs font-bold uppercase tracking-wider text-[#081F44] mb-1.5"
              >
                Specific Requirements or Questions{" "}
                <span className="text-[#50627E]/60 text-[11px] font-normal">(Optional)</span>
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={3}
                placeholder="Tell us about student count, current systems, or particular challenges you want to solve..."
                value={formData.requirements}
                onChange={handleChange}
                disabled={status === "submitting"}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#CBDDF8] bg-[#FAFCFF] focus:bg-white focus:border-[#0098FF] focus:outline-none focus:ring-2 focus:ring-[#0098FF]/20 text-[#081F44] placeholder:text-[#50627E]/50 transition-all disabled:opacity-60 resize-y"
              />
            </div>

            {/* Row 6: Permission Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  id="permission"
                  name="permission"
                  type="checkbox"
                  checked={formData.permission}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  aria-invalid={!!errors.permission}
                  aria-describedby={errors.permission ? "permission-error" : undefined}
                  className="w-4 h-4 mt-1 rounded text-[#0098FF] border-[#CBDDF8] focus:ring-[#0098FF] cursor-pointer"
                />
                <span className="text-xs sm:text-[13px] text-[#50627E] leading-relaxed">
                  I agree to be contacted about this enquiry and have read the{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="text-[#0098FF] underline font-semibold hover:text-[#081F44]"
                  >
                    Privacy Policy
                  </Link>
                  . <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.permission && (
                <p id="permission-error" className="mt-1 text-xs text-red-600 font-medium pl-7">
                  {errors.permission}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 border-t border-[#E3EAF4]">
              <button
                type="button"
                onClick={onClose}
                disabled={status === "submitting"}
                className="px-5 py-2.5 text-sm font-semibold text-[#50627E] hover:text-[#081F44] rounded-full transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <PrimaryButton
                type="submit"
                size="md"
                disabled={status === "submitting"}
                className="px-7 py-3 text-[15px] min-w-[160px] justify-center"
              >
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </span>
                ) : options.requestType === "workshop" ? (
                  "Request Workshop"
                ) : options.requestType === "contact" ? (
                  "Send Message"
                ) : (
                  "Confirm Demo Request"
                )}
              </PrimaryButton>
            </div>
          </form>
        </>
      )}
    </DialogContent>
  );
}

export function BookDemoDialog() {
  const { isOpen, closeDemoModal, options } = useDemoModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDemoModal()}>
      {isOpen && (
        <BookDemoFormContent options={options} onClose={closeDemoModal} />
      )}
    </Dialog>
  );
}
