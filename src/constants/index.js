import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";
import project5 from "../assets/projects/project-5.jpg";
import project6 from "../assets/projects/project-6.jpg";

export const HERO_CONTENT = `I am a dedicated full stack developer with a strong focus on building efficient and dynamic web applications. With extensive hands-on experience in front-end frameworks like React and Vue.js, as well as back-end technologies such as Node.js, Express, and MongoDB, I specialize in creating seamless and responsive user experiences. My passion lies in solving complex challenges with innovative solutions that not only enhance business operations but also prioritize performance and scalability.`;

export const ABOUT_TEXT = `I am a motivated and adaptable full stack developer with a passion for building innovative and intuitive web applications. With a strong foundation in technologies such as React, Angular, Node.js, and MongoDB, I bring a well-rounded approach to front-end and back-end development. Over the years, I have honed my ability to transform complex requirements into efficient, scalable solutions that enhance user experiences. My journey in development is fueled by a commitment to continuous learning and staying ahead in a rapidly evolving tech landscape. Beyond coding, I enjoy exploring emerging technologies, mentoring aspiring developers, and contributing to impactful open-source initiatives.`;

export const EXPERIENCES = [
  {
    year: "2024 (Jan - Apr)",
    role: "Software Engineering Intern",
    company: "Avolta",
    description: `Collaborated with the development team to design and implement new features for the company's primary product. Gained hands-on experience with cloud technologies and CI/CD pipelines. Optimized API performance, reducing response time by 20%.`,
    technologies: ["Java", "Spring Boot", "Docker", "Kubernetes"],
  },
  {
    year: "2023 - 2024",
    role: "Tech Support Intern",
    company: "Gao Tek Inc.",
    description: `Optimized website performance and functionality using various technologies. Supported team members in debugging and maintaining web solutions.`,
    technologies: ["HTML", "CSS", "JavaScript", "Python", "SQL"],
  },
  // {
  //   year: "2021 - Present",
  //   role: "Team Leader",
  //   company: "McDonald's",
  //   description: `Assisted in strategic planning and managed drive-thru operations, ensuring high-quality service delivery and team efficiency.`,
  //   technologies: ["Leadership", "Team Management", "Customer Service"],
  // },
  
];

export const PROJECTS = [
  {
    title: "E-Commerce Web App",
    image: project1, // Placeholder for the image
    description:
      "A full-stack e-commerce platform with features like product management, user authentication, and a seamless shopping experience.",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "Enquiry Capturing System",
    image: project2, // Placeholder for the image
    description:
      "A system to capture user enquiries via a web form and store them in a Google Sheet using the Google Sheets API.",
    technologies: ["React", "Node.js", "Express", "Google Sheets API"],
  },
  {
    title: "Real-Time Data Synchronization Platform",
    image: project3, // Placeholder for the image
    description:
      "Developed a platform enabling real-time synchronization of data across multiple devices.",
    technologies: ["Java", "RESTful APIs", "Docker", "Kubernetes"],
  },
  {
    title: "YouTube Clone",
    image: project4, // Placeholder for the image
    description:
      "A frontend application replicating YouTube's functionality, fetching and displaying videos using the YouTube API.",
    technologies: ["React", "Redux", "JavaScript", "YouTube API"],
  },
  {
    title: "Signature App",
    image: project5, // Placeholder for the image
    description:
      "An app allowing users to create, customize, save, and download digital signatures.",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Weather App",
    image: project6, // Placeholder for the image
    description:
      "A weather application fetching and displaying live weather updates using an API.",
    technologies: ["React", "API Integration"],
  },
];

export const CONTACT = {
  address: "Toronto, Ontario, Canada ",
  phoneNo: "+1 (647) 612-5182 ",
  email: "SomilArora55@gmail.com",
};
