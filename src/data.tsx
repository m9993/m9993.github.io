import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import { SlGraduation } from "react-icons/sl";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";

export default {
  social: [
    {
      id: 1,
      icon: <BsGithub />,
      url: "https://github.com/m9993",
    },
    {
      id: 2,
      icon: <BsLinkedin />,
      url: "https://www.linkedin.com/in/muntasir-alam-378664211",
    },
    {
      id: 3,
      icon: <BsFacebook />,
      url: "https://www.facebook.com/tahshin.nihshat",
    },
  ],
  education: [
    {
      id: 1,
      icon: <SlGraduation />,
      year: "2022 - 2023",
      title: "Graduate",
      subject: "Master of Science in Computer Science",
      institute: "American International University-Bangladesh",
      description:
        "This program prepares students for careers in software engineering, where they can work on developing high-quality software systems and applications. Graduates gain expertise in software project management, software design patterns, software testing methodologies, and software quality assurance. They may also be well-equipped to pursue research or teaching positions in academia.",
    },
    {
      id: 2,
      icon: <SlGraduation />,
      year: "2017 - 2021",
      title: "Undergraduate",
      subject: "Bachelor of Science in Computer Science & Enigneering",
      institute: "American International University-Bangladesh",
      description:
        "This program provides students with a solid understanding of the fundamentals of computer science, including programming, algorithms, software engineering, database management, and computer systems. It launches a career in various fields such as software development, data analysis, cybersecurity, web development, and more.",
    },
    {
      id: 3,
      icon: <SlGraduation />,
      year: "2016",
      title: "Higher School Certificate (HSC)",
      subject: "Science",
      institute: "Cambrian College, Dhaka",
      description:
        "It is a secondary education certification that is typically completed after 12 years of formal schooling. This certificate indicates that a student has successfully completed their high school education and has achieved proficiency in science subjects such as physics, chemistry, and biology.",
    },
    {
      id: 3,
      icon: <SlGraduation />,
      year: "2014",
      title: " Secondary School Certificate (SSC)",
      subject: "Science",
      institute: "Cumilla High School",
      description:
        "It is typically completed after 10 years of formal schooling.",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      icon: "💻",
      accent: "blue",
      skills: ["React Native", "React", "Next.js", "Tailwind CSS", "Bootstrap"],
    },
    {
      name: "Backend",
      icon: "⚙️",
      accent: "purple",
      skills: ["NestJS", "Express.js", "Node.js", "ASP.NET", "Laravel"],
    },
    {
      name: "Databases",
      icon: "🗃️",
      accent: "emerald",
      skills: ["MySQL", "Microsoft SQL Server", "Oracle Database"],
    },
    {
      name: "Other",
      icon: "🔧",
      accent: "amber",
      skills: [
        "REST API",
        "Git",
        "OOP",
        "KML",
        "TypeScript",
        "JavaScript",
        "CSS",
        "C#",
        "C++",
        "Java",
        "PHP",
      ],
    },
  ],
  certifications: [
    {
      id: "1",
      image: "/certificates/c1.png",
      title: "HTML, CSS, and Javascript for Web Developers",
      institution: "Coursera",
      link: "https://coursera.org/share/2ea3dd2cbbfe3c46a211d1165a488b86",
      accentColor: "orange",
    },
    {
      id: "2",
      image: "/certificates/c2.png",
      title: "Interactivity with JavaScript",
      institution: "Coursera",
      link: "https://coursera.org/share/46038e6c8c55d0dbbfedef78c2a047f2",
      accentColor: "blue",
    },
    // {
    //   id: "nodejs-dev",
    //   image: "/certificates/nodejs-certified.png",
    //   title: "Node.js Developer Certification",
    //   institution: "OpenJS Foundation",
    //   link: "https://openjsf.org/certification/",
    //   accentColor: "green",
    // },
    // {
    //   id: "ts-pro",
    //   image: "/certificates/typescript-expert.png",
    //   title: "TypeScript Professional",
    //   institution: "Microsoft",
    //   link: "https://www.microsoft.com/en-us/learning/typescript-certification.aspx",
    //   accentColor: "purple",
    // },
  ],
  contactMethods: [
    {
      icon: <FiMail className="text-blue-600" size={28} />,
      title: "Email Me",
      value: "muntasiralam9993@gmail.com",
      href: "mailto:muntasiralam9993@gmail.com",
      description: "For project inquiries and collaborations",
    },
    {
      icon: <FiPhone className="text-green-600" size={28} />,
      title: "Call Me",
      value: "+88 01681797553",
      href: "tel:+8801681797553",
      description: "Available Mon-Fri, 9am-5pm BST",
    },
    {
      icon: <FiMapPin className="text-red-600" size={28} />,
      title: "Location",
      value: "Dhaka, Bangladesh",
      href: "https://maps.google.com/?q=Dhaka",
      description: "Open to remote work opportunities",
    },
    {
      icon: <FiClock className="text-purple-600" size={28} />,
      title: "Availability",
      value: "Flexible Hours",
      href: "#availability",
      description: "Let's schedule a meeting",
    },
  ],
  projects: [
    {
      id: "attnd",
      name: "Attnd: Employee Attendance App",
      description:
        "Track attendance, manage payroll, monitor field visits, and assign tasks powerful Attendance System designed for modern businesses. Whether your team works in the office, in the field, or remotely, Attnd makes workforce management simple, accurate, and fast.",
      icon: "/projects/attnd-icon.png",
      screenshot: "/projects/attnd.png",
      playStoreLink:
        "https://play.google.com/store/apps/details?id=com.trillionbits.attndadmin",
      appStoreLink:
        "https://apps.apple.com/us/app/attnd-employee-management-app/id1544654549",
      webLink: "https://www.attnd.xyz/",
      technologies: ["React Native", "Redux", "React-Query", "Node.js"],
      downloads: "10K+",
      rating: 4.8,
    },
    {
      id: "bes",
      name: "Bangladesh Endocrine Society (BES)",
      description:
        "This app will be one place for conference attendees, offering features for registration on payment (sslcommerz), browsing past and upcoming conferences, speaker information, and personalized program schedules.",
      icon: "/projects/bes-icon.png",
      screenshot: "/projects/bes.png",
      playStoreLink:
        "https://play.google.com/store/apps/details?id=com.trillionbits.besapp3",
      appStoreLink:
        "https://apps.apple.com/us/app/bangladesh-endocrine-society/id6502255932",
      webLink: "https://bes.org.bd/",
      technologies: [
        "sslcommerz",
        "NestJS",
        "MySQL",
        "React Native",
        "Redux",
        "React-Query",
        "TypeScript",
        "Node.js",
      ],
      downloads: "100+",
      rating: 4.5,
    },
    {
      id: "bsm",
      name: "Bangladesh Society of Medicine (BSM)",
      description:
        "Bangladesh Society of Medicine is an organization of Medicine specialists of Bangladesh. The Society established for ensuring the rights and benefits of Medicine Specialists and teaching the graduate and post graduate students so that they will be able to provide comprehensive healthcare service to the people of Bangladesh by organizing conferences.",
      icon: "/projects/bsm-icon.png",
      screenshot: "/projects/bsm.png",
      playStoreLink:
        "https://play.google.com/store/apps/details?id=com.trillionbits.bsmapp3",
      appStoreLink:
        "https://apps.apple.com/us/app/bsmedicine-society-of-medicine/id6477740895",
      webLink: "https://bsmedicine.org/",
      technologies: [
        "NestJS",
        "MySQL",
        "React Native",
        "Redux",
        "React-Query",
        "TypeScript",
        "Node.js",
      ],
      downloads: "100+",
      rating: 4.5,
    },
    {
      id: "pro-visit",
      name: "Job Scheduling & Time Tracking",
      description:
        "ProVisit Fieldworker App is a powerful, industry-ready solution designed to simplify and streamline field operations. Whether you're managing service technicians, delivery staff, or survey teams, ProVisit gives you the tools to organize tasks, monitor performance, and improve field productivity.",
      icon: "/projects/pv-icon.png",
      screenshot: "/projects/pv.png",
      playStoreLink:
        "https://play.google.com/store/apps/details?id=com.trillionbits.provisit.fieldworker",
      technologies: [
        "NestJS",
        "MySQL",
        "React Native",
        "Redux",
        "React-Query",
        "TypeScript",
        "Node.js",
      ],
      downloads: "10+",
      rating: 4.2,
    },
    {
      id: "evento",
      name: "Evento: Personal Event Manager",
      description:
        "Looking for a seamless way to organize and join events? Our event management app lets you create events in seconds, invite members, and collaborate with ease. Whether you're planning a birthday party, team meeting, or a community gathering, this app is your perfect companion.",
      icon: "/projects/evento-icon.png",
      screenshot: "/projects/evento.png",
      playStoreLink:
        "https://play.google.com/store/apps/details?id=com.evento.event.manager",
      technologies: [
        "React Native",
        "Redux",
        "React-Query",
        "TypeScript",
        "Node.js",
      ],
      downloads: "10+",
      rating: 4.2,
    },
    {
      id: "sb",
      name: "Smart Budget",
      description:
        "It is designed to help users track their expenses, manage income, and achieve financial goals. It offers features such as expense categorization, budget planning, bill reminders, and financial reports.",
      icon: "/projects/sb-icon.png",
      screenshot: "/projects/sb.png",
      technologies: [
        "React Native",
        "Redux",
        "React-Query",
        "TypeScript",
        "Node.js",
      ],
    },
    {
      id: "c5v",
      name: "Fair-Grade (C5V)",
      description:
        "This application collects environmental data (dynamic category and indicators) from user inputs and location, stores it as statements in a database, and uploads it to the blockchain. A KML file can be uploaded by website administrators to highlight various objects on the Google map.",
      icon: "/projects/c5v-icon.png",
      screenshot: "/projects/c5v.jpg",
      technologies: ["React Native", "Redux", "Node.js"],
    },
  ],
};
