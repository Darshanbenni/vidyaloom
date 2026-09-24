export interface SolutionCard {
  id: string;
  title: string;
  tagline: string;
  bullets: string[];
  color: "blue" | "mint" | "violet";
  iconType: "erp" | "crm" | "ai";
}

export interface TrainingFeature {
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  institution: string;
  rating?: number;
  avatarKey?: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface PartnerLogo {
  name: string;
  src?: string;
  isTech?: boolean;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
  };
  navigation: Array<{ label: string; href: string }>;
  techRail: {
    eyebrow: string;
    partners: string[];
  };
  hero: {
    eyebrow: string;
    headline: {
      line1: string;
      line2: string;
      line3: string;
    };
    subcopy: string[];
    primaryCta: string;
    secondaryCta: string;
    stats: StatItem[];
    handwritingLeft: string;
    handwritingRight: string;
  };
  solutions: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: SolutionCard[];
  };
  training: {
    eyebrow: string;
    title: string;
    subheading: string;
    description: string;
    cta: string;
    partners: string[];
    features: TrainingFeature[];
    badges: string[];
    handwriting: string;
  };
  dashboard: {
    title: string;
    subcopy: string;
    features: string[];
    cta: string;
    handwriting: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  schools: {
    eyebrow: string;
    title: string;
    list: string[];
  };
  closingCta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    handwritingStack: string[];
  };
  footer: {
    tagline: string;
    privacyLabel: string;
    privacyHref: string;
    socials: Array<{ platform: string; href: string }>;
  };
}

export const referencePreviewContent: SiteContent = {
  brand: {
    name: "Vidyaloom",
    tagline: "Smarter Schools, Brighter Futures.",
  },
  navigation: [
    { label: "Solutions", href: "#solutions" },
    { label: "AI & Training", href: "#training" },
    { label: "About", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  techRail: {
    eyebrow: "TRUSTED & INSPIRED BY\nINDUSTRY LEADERS",
    partners: ["Google", "amazon", "Microsoft", "Meta", "NVIDIA"],
  },
  hero: {
    eyebrow: "END-TO-END SOLUTIONS FOR SCHOOLS & COLLEGES",
    headline: {
      line1: "Empowering",
      line2: "Education for a",
      line3: "Smarter Tomorrow",
    },
    subcopy: [
      "Technology. Training. Transformation.",
      "Complete solutions to run, grow and future-ready your institution.",
    ],
    primaryCta: "Book a Demo",
    secondaryCta: "Watch Video",
    stats: [
      { value: "20+", label: "Institutions Trust Us" },
      { value: "5000+", label: "Students Impacted" },
      { value: "98%", label: "Customer Satisfaction" },
    ],
    handwritingLeft: "Future Ready Students",
    handwritingRight: "Technology Today. Brighter Tomorrow",
  },
  solutions: {
    eyebrow: "OUR SOLUTIONS",
    title: "Everything Your Institution Needs. In One Place.",
    subtitle:
      "From daily operations to future-ready skills, we provide complete solutions for schools and colleges.",
    cards: [
      {
        id: "solution-erp",
        title: "School ERP & Process Automation",
        tagline: "Simplify operations. Save time. Focus on what matters – students.",
        color: "blue",
        iconType: "erp",
        bullets: [
          "Admissions & Enquiries",
          "Attendance & Exams",
          "Fees & Finance",
          "Timetable & Transport",
          "HR & Staff Management",
          "Reports & Analytics",
          "Parent & Student Management",
        ],
      },
      {
        id: "solution-crm",
        title: "Website + Admissions CRM + Parent/Student Experience",
        tagline: "A modern digital presence with end-to-end admission management.",
        color: "mint",
        iconType: "crm",
        bullets: [
          "Stunning Website for Your Institution",
          "Enquiry & Lead Management",
          "Online Admissions & Payments",
          "WhatsApp Follow-ups",
          "Parent & Student Portal",
          "Mobile App Experience",
          "Real-time Notifications & Updates",
        ],
      },
      {
        id: "solution-ai",
        title: "AI Solutions + Management Dashboards",
        tagline: "Smarter decisions. Higher impact. Powered by AI.",
        color: "violet",
        iconType: "ai",
        bullets: [
          "AI Assistants for Management, Teachers & Parents",
          "Automated Workflows",
          "Document Intelligence (ID, forms, etc.)",
          "Dashboards for Attendance, Fees, Admissions & Academics",
          "Predictive Insights",
          "Custom AI Solutions for Your Institution",
        ],
      },
    ],
  },
  training: {
    eyebrow: "FUTURE-READY LEARNING",
    title: "AI, Coding, Robotics & Industry Training",
    subheading: "Hands-on. Practical. Real-World Skills.",
    description:
      "We conduct workshops and training programs in schools and colleges, where students build live applications with guidance from industry experts from Google, Amazon, Microsoft and more.",
    cta: "Request a Workshop for Your School",
    partners: ["Google", "amazon", "Microsoft"],
    features: [
      { title: "Live Projects", description: "Build real applications" },
      { title: "Learn from Experts", description: "Industry professionals" },
      { title: "Deploy to the Internet", description: "See your app live" },
      { title: "Certificates", description: "Add value to your future" },
    ],
    badges: ["Build Live Apps", "Work with AI", "Deploy to the Cloud"],
    handwriting: "Students Today. Innovators Tomorrow",
  },
  dashboard: {
    title: "A Smarter Way\nto Manage Education",
    subcopy:
      "Powerful dashboards, real-time insights and automation to help you make better decisions, faster.",
    features: [
      "Real-time Analytics",
      "Role-based Access",
      "Custom Reports",
      "Accessible on Web & Mobile",
    ],
    cta: "Book a Demo",
    handwriting: "See the difference",
  },
  testimonials: {
    eyebrow: "VOICES THAT MATTER",
    title: "Trusted by Educators. Loved by Students.",
    subtitle:
      "Hear from school leaders and students who are experiencing the difference with Vidyaloom.",
    items: [
      {
        id: "test-1",
        quote:
          "Before this workshop, AI seemed like pure magic. The mentors broke down machine learning so simply that I was able to build and deploy my own smart image-recognition model in just two days. It completely changed how I look at future tech careers!",
        author: "Arjun Mehta",
        role: "Grade 10 Student",
        institution: "Sky International School, Bangalore",
      },
      {
        id: "test-2",
        quote:
          "I always wondered how processors actually run complex code inside our phones and laptops. The hands on sessions on microchips and logic circuits made chip architecture so exciting and approachable. Building my first logic simulation gave me immense confidence.",
        author: "Rohan Deshmukh",
        role: "Grade 9 Student",
        institution: "Swami Vivekananda School, Shimoga",
      },
      {
        id: "test-3",
        quote:
          "The practical sessions were fantastic! We didn’t just listen to theory we actually wired sensors, programmed microcontrollers, and watched our robotic rover navigate obstacles autonomously. It’s the best hands on technical workshop I’ve ever attended.",
        author: "Ananya Kulkarni",
        role: "Grade 11 Student",
        institution: "Love Dale Central School, Belagavi",
      },
    ],
  },
  schools: {
    eyebrow: "OUR PARTNERS & CLIENTS",
    title: "Leading Schools. Progressive Institutions. Growing Together.",
    list: [
      "Oakridge International School",
      "Greenwood High",
      "Vidyashilp Academy",
      "Inventure Academy",
      "International School Bangalore (TISB)",
      "Stonehill International School",
    ],
  },
  closingCta: {
    eyebrow: "LET'S BUILD A BRIGHTER FUTURE TOGETHER",
    title: "Ready to Transform Your Institution?",
    subtitle:
      "Book a free demo or invite us for a webinar/workshop at your school.",
    primaryCta: "Book a Demo",
    secondaryCta: "Contact Us",
    handwritingStack: ["Partner", "Educate", "Innovate", "Grow"],
  },
  footer: {
    tagline: "Smarter Schools, Brighter Futures.",
    privacyLabel: "Privacy Policy",
    privacyHref: "/privacy",
    socials: [
      { platform: "LinkedIn", href: "https://linkedin.com" },
      { platform: "YouTube", href: "https://youtube.com" },
      { platform: "Instagram", href: "https://instagram.com" },
    ],
  },
};

export const productionContent: SiteContent = {
  ...referencePreviewContent,
  techRail: {
    eyebrow: "TECHNOLOGY & LEARNING\nECOSYSTEM",
    partners: ["Google Cloud", "AWS", "Microsoft Azure", "NVIDIA"],
  },
  training: {
    ...referencePreviewContent.training,
    description:
      "We conduct workshops and training programs in schools and colleges, where students build live applications with guidance from experienced software and AI engineers.",
  },
};

export function getSiteContent(): SiteContent {
  return process.env.CONTENT_MODE === "production"
    ? productionContent
    : referencePreviewContent;
}
