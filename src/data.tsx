import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import { SlGraduation } from "react-icons/sl";

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
      description: "It is typically completed after 10 years of formal schooling.",
    },
  ],
};
