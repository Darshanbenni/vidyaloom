import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata = {
  title: "Privacy Policy — Vidyaloom",
  description: "How Vidyaloom collects, processes, and protects your demonstration enquiry information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#50627E]">
      <Header />

      <main className="flex-grow py-12 sm:py-16">
        <Container size="narrow">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0098FF] hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#EAF4FE] text-[#0098FF] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#081F44] tracking-tight">
              Privacy Policy
            </h1>
          </div>

          <p className="text-sm text-[#50627E] mb-8 pb-6 border-b border-[#E3EAF4]">
            Last updated: 20 September 2026 • Vidyaloom Educational Solutions
          </p>

          <div className="space-y-6 text-[15px] sm:text-[16px] leading-relaxed text-[#50627E]">
            <section>
              <h2 className="text-lg font-bold text-[#081F44] mb-2">
                1. Information We Collect
              </h2>
              <p>
                When you submit a demo or workshop request through our website, we collect your name, institutional email address, phone number (optional), school or college name, designated role, city, and specific areas of interest.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#081F44] mb-2">
                2. How We Use Your Data
              </h2>
              <p>
                Your information is used strictly to schedule, coordinate, and customize your requested demonstration, workshop, or consultation. We do not sell, rent, or trade your contact details to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#081F44] mb-2">
                3. Transmission and Security
              </h2>
              <p>
                Enquiry submissions are transmitted securely over TLS-encrypted connections directly to our institutional team via Resend. We enforce rate limiting and spam prevention mechanisms (including Cloudflare Turnstile bot verification) to maintain endpoint integrity.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#081F44] mb-2">
                4. Data Retention
              </h2>
              <p>
                Temporary submission metadata is retained on encrypted servers for up to 24 hours solely for deduplication and retry guarantees, after which it is automatically pruned. Formal correspondence is archived in our secure enterprise mailbox in accordance with institutional recordkeeping standards.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#081F44] mb-2">
                5. Contact Us
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to request the removal of your contact details, please contact us through our website enquiry form or by reaching out to our administrative team.
              </p>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
