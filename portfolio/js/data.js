/* ==========================================================================
   Centralized content data — Skills & Projects.

   To add a new SKILL: add one object to `skills` below.
     { name: "Python", category: "Programming", level: "Learning" }
   A new `category` value automatically creates a new skill group — no
   HTML editing needed.

   To add a new PROJECT: add one object to `projects` below.
     {
       title: "Digital Logic Website",
       description: "An interactive digital logic learning website.",
       technologies: ["HTML", "CSS", "JavaScript"],
       github: "GITHUB_LINK",
       demo: "DEMO_LINK"
     }
   Leave `demo` empty ("" or omit it) if there's no live demo yet — the
   card will simply skip the Live Demo button instead of showing a dead
   link. `visual` (1-5) and `glyph` are optional cosmetic touches; if you
   skip them, new cards automatically cycle through the existing gradient
   styles and use a default glyph.

   js/render.js turns both of these into the exact same card markup the
   page already used, so the existing CSS keeps working untouched.
   ========================================================================== */

const skills = [
  { name: "C", category: "Programming", level: "Comfortable" },
  { name: "C++", category: "Programming", level: "Comfortable" },
  { name: "Java", category: "Programming", level: "Learning" },

  {
    name: "Data Structures",
    category: "Core Computer Science",
    level: "Practicing",
  },
  {
    name: "Algorithms",
    category: "Core Computer Science",
    level: "Practicing",
  },
  { name: "OOP", category: "Core Computer Science", level: "Comfortable" },
  {
    name: "Problem Solving",
    category: "Core Computer Science",
    level: "Practicing",
  },

  { name: "HTML", category: "Web", level: "Comfortable" },
  { name: "CSS", category: "Web", level: "Practicing" },
  { name: "JavaScript", category: "Web", level: "Learning" },

  { name: "Git", category: "Tools", level: "Practicing" },
  { name: "GitHub", category: "Tools", level: "Practicing" },
  { name: "VS Code", category: "Tools", level: "Comfortable" },

  { name: "CapCut", category: "Creative Tools", level: "Practicing" },
];

const projects = [
  {
    title: "University Management System",
    description:
      "A C++ & OOP-based system for managing university records students, courses, and enrollment built around file handling and the STL rather than a database.",
    technologies: ["C++", "OOP", "STL", "File Handling"],
    github: "https://github.com/minhaz-abedin69",
    demo: "https://uni-system.netlify.app/",
    visual: 1,
    glyph: "{ }",
  },
  {
    title: "Boolean Algebra & Logic Gates Study Dashboard",
    description:
      "An interactive dashboard covering Chapter 2 (Boolean Algebra & Logic Gates) of a Digital Logic Design course every textbook problem with worked answers, a Boolean-expression simplification tool, quizzes, and progress tracking, all in plain HTML/CSS/JS.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/minhaz-abedin69/Boolean-algebra-chapter-2",
    demo: "https://minhaz-abedin69.github.io/Boolean-algebra-chapter-2/",
    visual: 2,
    glyph: "01",
  },
  {
    title: "E-Voting Simulation",
    description:
      "A first-year project simulating an election system a C program handling the voting/counting logic, paired with an interactive HTML/CSS/JavaScript front end with sound effects for actions like casting a vote.",
    technologies: ["C", "HTML", "CSS", "JavaScript"],
    github:
      "https://github.com/minhaz-abedin69/E-voting-project-1st-year-final-",
    demo: "",
    visual: 4,
    glyph: "🗳",
  },
  {
    title: "Login Page UI",
    description:
      "A responsive login page built to practice form design and front-end interactivity clean layout, styled inputs, and JavaScript-driven interactions.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/minhaz-abedin69/Web-login-page1.",
    demo: "https://minhaz-abedin69.github.io/Web-login-page1./",
    visual: 5,
    glyph: "⇥",
  },
  {
    title: "Competitive Programming",
    description:
      "An ongoing habit rather than a single build: working through problems on Codeforces and LeetCode to get faster and more precise with data structures and algorithms.",
    technologies: [],
    isAchievement: true,
    achievementLabel:
      "Ongoing problem-solving practice` not a conventional software project.",
    visual: 3,
    glyph: "∑",
    links: [
      {
        label: "Codeforces",
        url: "https://codeforces.com/profile/Minhaz_Abedin",
      },
      { label: "LeetCode", url: "https://leetcode.com/u/Minhaz%20Abedin/" },
    ],
  },
];
