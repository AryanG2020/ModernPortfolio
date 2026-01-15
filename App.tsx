import React, { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  Code2,
  Cpu,
  Cloud,
  ArrowUpRight,
  Database,
  Terminal,
  GraduationCap,
} from "lucide-react";
import Scene3D from "./components/Scene3D";
import ProjectCard from "./components/ProjectCard";
import Experience from "./components/Experience";
import LoadingScreen from "./components/LoadingScreen";
import { Project, ExperienceItem } from "./types";

// @ts-expect-error - TypeScript doesn't recognize image imports by default
import profileImg from "./assets/selfie_website.jpeg";

// @ts-expect-error
import orbitalImg from "./assets/orbitalMesh.png";

// @ts-expect-error
import carTestImg from "./assets/carTest.png";

// @ts-expect-error
import robotImg from "./assets/robotCompanion.png";

const SOCIAL_LINKS = {
  github: "https://github.com/AryanG2020",
  linkedin: "https://www.linkedin.com/in/aryan-gurubacharya/",
  email: "mailto:aryan.gurubacharya@gmail.com",
};

const PROFILE_IMAGE = profileImg;

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "OrbitalMesh Simulator",
    description:
      "A real-time 3D visualization of a self-healing LEO satellite constellation built with React, Three.js, and TypeScript. The application simulates complex orbital mechanics (Walker Delta pattern) and dynamic network topology, utilizing Dijkstra’s algorithm to calculate lowest-latency routing paths in real-time. It features interactive fault-tolerance testing and a sci-fi telemetry dashboard styled with Tailwind CSS and Lucide React.",
    tags: [
      "Python",
      "React Three Fiber",
      "Graph Theory",
      "Distributed Systems",
    ],

    link: "https://github.com/AryanG2020/Orbital-Mesh-Simulator",
    image: orbitalImg,
  },
  {
    id: 2,
    title: "Real-Time Position Engine",
    description:
      "High-frequency ingestion engine capable of sub-millisecond latency. Implements VWAP accounting, lock-free concurrency via mutex management, and O(1) portfolio state lookups.",
    tags: ["Python", "Multi-Threading", "FinTech", "Algo Trading"],
    link: "https://github.com/AryanG2020/stocks",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Rice Grain Classifier",
    description:
      "Deep learning computer vision model utilizing custom CNN architectures. Achieved 95%+ accuracy with optimized hyperparameters and automated image preprocessing pipelines.",
    tags: ["TensorFlow", "Keras", "CNN", "Computer Vision"],
    link: "https://github.com/AryanG2020/RiceGrainClassifier",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "TigerMart: Android E-Commerce App",
    description:
      "TigerMart is an e-commerce Android application tailored for DePauw University students, offering a convenient platform to purchase essential goods, academic materials, and dormitory supplies. Built using Java, the app features secure user authentication and registration powered by Firebase Authentication, ensuring data safety.",
    tags: ["Android", "Java", "Firebase", "E-Commerce"],
    link: "https://github.com/AryanG2020/TigerMart",
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Car Services: Salesforce Powered Chatbot",
    description:
      "TigerMart is an e-commerce Android application tailored for DePauw University students, offering a convenient platform to purchase essential goods, academic materials, and dormitory supplies. Built using Java, the app features secure user authentication and registration powered by Firebase Authentication, ensuring data safety.",
    tags: ["Salesforce", "APEX", "AgentForce", "Chatbot"],
    link: "https://github.com/AryanG2020/Car-Services-",
    image: carTestImg,
  },
  {
    id: 6,
    title: "Robot Companion",
    description:
      " An interactive 3D background featuring a swarm of physics-enabled robots that organically track the user's cursor and interact with one another, built using React Three Fiber.",
    tags: ["Typescript", "React", "Three.js", "Motion Physics"],
    link: "https://github.com/AryanG2020/RobotComponent",
    image: robotImg,
  },
];

const EXPERIENCE: ExperienceItem[] = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Cloud Walking",
    period: "July 2025 - Present",
    description:
      "As an Accredited Financial Services Cloud Professional and AgentForce Specialist, I engineer autonomous AI solutions grounded in Salesforce Data Cloud. I architected scalable Apex backends for multi-channel chatbots and developed AI-driven sales negotiation simulations with real-time feedback, ensuring strict audit compliance via Enhanced Event Logs.",
    skills: [
      "Salesforce",
      "Apex",
      "AgentForce",
      "TypeScript",
      "AI Integration",
    ],
  },
  {
    id: 2,
    role: "Software Engineer",
    company: "Spiralogics, Inc",
    period: "Oct 2023 - July 2025",
    description:
      "Engineered ETL middleware workflows and integrated GenAI chatbots into ERP systems using .NET Core. Built RAG pipelines improving accuracy and optimized SQL queries to reduce latency by 35%.",
    skills: ["C#", ".NET Core", "GenAI", "SQL", "RAG"],
  },
  {
    id: 3,
    role: "Quantitative Research Asst.",
    company: "DePauw University",
    period: "May 2024 - Aug 2024",
    description:
      "Simulated macroeconomic decision-making models in Julia using Bellman equations. Analyzed 1.3M+ datasets to study entrepreneurship trends, applying complex econometric modeling.",
    skills: ["Julia", "Econometrics", "Data Modeling", "Research"],
  },
];

const EXTRACURRICULARS: ExperienceItem[] = [
  {
    id: 1,
    role: "Eminent Recorder (Exec)",
    company: "Sigma Alpha Epsilon",
    period: "2022 - 2024",
    description:
      "Served as third-in-command for the Indiana Delta chapter. Maintained meticulous records, organized the highly successful Paddy Murphy Philanthropy Week, and led recruitment efforts securing one of the largest pledge classes. Two-time Charles Collins Award recipient.",
    skills: ["Leadership", "Event Planning", "Recruitment", "Philanthropy"],
  },
  {
    id: 2,
    role: "Archive Database Intern",
    company: "DePauw University",
    period: "2023 - 2024",
    description:
      "Digitized records and managed the archive library database. Collaborated with IT and library teams to enhance database indexing and ensure secure, scalable storage of archival materials.",
    skills: [
      "Database Management",
      "Digitization",
      "Archival",
      "IT Collaboration",
    ],
  },
  {
    id: 3,
    role: "Teaching Assistant",
    company: "DePauw University",
    period: "2022",
    description:
      "Supported Computer Science students by assisting with coursework, guiding them through complex concepts, and facilitating group discussions to foster a collaborative learning environment.",
    skills: ["Mentoring", "Computer Science", "Instruction", "Communication"],
  },
  {
    id: 4,
    role: "Project Management Intern",
    company: "Hoste Hainse",
    period: "2020",
    description:
      "Volunteered to support sustainable development in Nepal's Sarlahi district. Helped establish fish-farming and mechanized farming businesses to alleviate poverty, contributing to economic resilience.",
    skills: ["Project Management", "Sustainability", "Community Development"],
  },
  {
    id: 5,
    role: "Project Co-Founder",
    company: "Himalayan Climate Initiative",
    period: "2019",
    description:
      "Co-founded 'Sangeet ra Sadhbaw' to fund education for underprivileged students. Organized a major musical fundraiser in Kathmandu, securing sponsorships to cover educational expenses for forty students for ten years.",
    skills: ["Fundraising", "Leadership", "Social Impact", "Event Organizing"],
  },
];

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.8]);

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-accent selection:text-black overflow-x-hidden">
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 3D Background */}
      <Scene3D />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-center items-center backdrop-blur-sm bg-black/20 border-b border-white/5">
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <a href="#about" className="hover:text-accent transition-colors">
            About
          </a>
          <a href="#experience" className="hover:text-accent transition-colors">
            Experience
          </a>
          <a href="#work" className="hover:text-accent transition-colors">
            Work
          </a>
          <a href="#activities" className="hover:text-accent transition-colors">
            Activities
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="h-screen flex flex-col justify-center items-center px-6 text-center relative">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="max-w-5xl z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: isLoading ? 0.5 : 0 }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-mono tracking-wide"
            >
              CS & QUANTITATIVE ECONOMICS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isLoading ? 0.7 : 0.2 }}
              className="text-5xl md:text-8xl font-display font-bold mb-6 leading-none tracking-tight"
            >
              Developing Intelligent
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 stroke-text">
                and Scalable Ecosystems.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isLoading ? 0.9 : 0.4 }}
              className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Specializing in building salesforce solutions, financial engines,
              fault-tolerant architectures, and audit-grade cloud solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isLoading ? 1.0 : 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <a
                href="#work"
                className="px-8 py-4 bg-accent text-black font-bold rounded-full hover:bg-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,243,255,0.3)]"
              >
                View Projects
              </a>
              <a
                href="#about"
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                Bio & Skills
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
          >
            <ArrowDown size={24} />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 relative group"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 bg-dark/50">
                <div className="absolute inset-0 bg-accent/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={PROFILE_IMAGE}
                  alt="Aryan Gurubacharya"
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="absolute -inset-4 border border-accent/20 rounded-2xl -z-10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
              <div className="absolute -inset-4 border border-secondary/20 rounded-2xl -z-10 -translate-x-4 -translate-y-4 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-accent font-mono text-sm mb-4 tracking-widest uppercase">
                About Me
              </h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Bridging complex business logic with{" "}
                <span className="text-gray-500">scalable architecture</span>.
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                For me, Computer Science is more than just code—it’s the engine
                of <strong className="text-white">efficiency</strong>. I see
                every line of code as an opportunity to reduce friction, improve
                decisions, and connect complex data to the people who need it.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                With a dual background in{" "}
                <strong className="text-white">CS and Econometrics</strong> from{" "}
                <strong className="text-white">DePauw University</strong>, I
                bridge the gap between abstract algorithms and real-world
                impact. My passion lies in building systems that are
                mathematically precise but human-centric—whether I'm
                architecting{" "}
                <strong className="text-white">
                  fault-tolerant distributed networks
                </strong>
                , designing{" "}
                <strong className="text-white">intuitive AI agents</strong>, or
                optimizing{" "}
                <strong className="text-white">financial ecosystems</strong>. I
                build technology that ensures data serves people, not the other
                way around.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <Terminal className="text-accent" /> Python, C#, Java, Apex,
                  TypeScript, Javascript
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Cpu className="text-accent" /> Distributed Systems
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Database className="text-accent" /> SQL & NoSQL
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Cloud className="text-accent" /> AWS & Salesforce
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/5 text-accent">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      DePauw University
                    </h4>
                    <p className="text-gray-400 text-sm">
                      B.A. Computer Science & Econometrics and Quantitative
                      Economics
                    </p>
                    <p className="text-accent font-mono text-sm mt-1">
                      GPA: 3.92/4.00
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="py-24 px-6 md:px-12 bg-white/5 backdrop-blur-sm"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-accent font-mono text-sm mb-4 tracking-widest uppercase">
                Career Path
              </h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold">
                Experience
              </h3>
            </div>

            <Experience items={EXPERIENCE} />
          </div>
        </section>

        {/* Work Section */}
        <section
          id="work"
          className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
        >
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-accent font-mono text-sm mb-4 tracking-widest uppercase">
                Portfolio
              </h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold">
                Featured Projects
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* Extracurricular Activities Section */}
        <section
          id="activities"
          className="py-24 px-6 md:px-12 bg-white/5 backdrop-blur-sm border-t border-white/5"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-accent font-mono text-sm mb-4 tracking-widest uppercase">
                Leadership & Volunteering
              </h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold">
                Activities
              </h3>
            </div>

            <Experience items={EXTRACURRICULARS} />
          </div>
        </section>

        {/* Footer / Contact */}
        <section
          id="contact"
          className="py-32 px-6 md:px-12 text-center max-w-4xl mx-auto relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -z-10" />

          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight">
            Ready to solve
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
              complex problems?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Whether it's optimizing a financial engine, providing salesforce
            solutions, or discussing quantitative models, I'm open to new
            opportunities.
          </p>

          <a
            href={SOCIAL_LINKS.email}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]"
          >
            aryan.gurubacharya@gmail.com{" "}
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>

          {/* 3. UPDATED FOOTER LINKS LOGIC */}
          <div className="mt-24 flex justify-center gap-8">
            {[
              { Icon: Github, href: SOCIAL_LINKS.github },
              { Icon: Linkedin, href: SOCIAL_LINKS.linkedin },
              { Icon: Mail, href: SOCIAL_LINKS.email },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto") ? undefined : "noopener noreferrer"
                }
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:text-black hover:scale-110 transition-all text-gray-400"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
