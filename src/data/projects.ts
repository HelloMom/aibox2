export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Project 1",
    description: "Description of project 1",
    image: "/images/project1.jpg",
    technologies: ["Next.js", "React", "TypeScript"],
    demoUrl: "https://demo-url.com",
    githubUrl: "https://github.com/your-username/project1",
    featured: true,
  },
  {
    id: "2",
    title: "Project 2",
    description: "Description of project 2",
    image: "/images/project2.jpg",
    technologies: ["Vue.js", "Nuxt.js", "TypeScript"],
    githubUrl: "https://github.com/your-username/project2",
    featured: false,
  },
]