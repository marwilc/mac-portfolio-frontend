// Centralized content data for all app sections

export const ABOUT_CONTENT = {
  title: "Hi, I'm Marwil 👋",
  description: "Senior Frontend Engineer focused on React, Next.js, Angular and Node/NestJS. I like turning complex products into clean, modern and high-performant UIs.",
  experience: "7+ years building web and mobile apps, working with teams across LATAM and the US.",
  professionalExperience: {
    title: "💼 Professional Experience",
    items: [
      {
        company: "SURA CL",
        description: "Worked on multiple features for the AFP Capital application, including withdrawal flows and other critical financial functionalities. Contributed to building robust and user-friendly interfaces for pension management.",
        link: "https://www.afpcapital.cl/",
        linkText: "View AFP Capital →",
      },
    ],
  },
  connect: {
    title: "🔗 Connect",
    links: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/marwilc/",
        iconType: "linkedin" as const,
      },
      {
        name: "GitHub",
        url: "https://github.com/marwilc",
        iconType: "github" as const,
      },
    ],
  },
};

export const CONTACT_CONTENT = {
  title: "Contact",
  subtitle: "Let's work together or just say hi 👋",
  items: [
    {
      type: "Email",
      value: "marwilcampos@gmail.com",
      url: "mailto:marwilcampos@gmail.com",
    },
    {
      type: "GitHub",
      value: "github.com/marwilc",
      url: "https://github.com/marwilc",
    },
    {
      type: "LinkedIn",
      value: "linkedin.com/in/marwilc",
      url: "https://www.linkedin.com/in/marwilc/",
    },
  ],
};

export const RESUME_CONTENT = {
  title: "My Resume",
  description: "Download or view my resume/CV to learn more about my experience, skills, and qualifications.",
  icon: "📄",
  downloadUrl: "https://drive.google.com/uc?export=download&id=1dIHxrrd_YIpd0A7X5Jmn2zj3TqrN--uj",
  viewUrl: "https://drive.google.com/file/d/1dIHxrrd_YIpd0A7X5Jmn2zj3TqrN--uj/view?usp=sharing",
};

export const FINDER_CONTENT = {
  title: "Welcome to",
  titleHighlight: "Marwil CampOS",
  description: "This is a macOS-like desktop built with Next.js and Tailwind. You can turn each app into a section of your portfolio: About, Projects, Contact, etc.",
};

