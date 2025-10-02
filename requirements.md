Senior Full-Stack Developer: Practical Assessment
1. Introduction & Goal
Welcome! The purpose of this exercise is to provide a practical, hands-on opportunity for you to showcase your skills as a senior-level developer. We're looking for an executor and a builder—someone who can effectively translate ideas into functional, well-crafted applications using modern tools.
This is not a test of memory but an assessment of your problem-solving abilities, architectural choices, and proficiency with a contemporary tech stack. We estimate this project will take approximately 8-10 hours of focused effort.
2. The Persona We're Looking For
We are assessing for a Senior Individual Contributor. This is not a management or team lead role. We value clean code, pragmatic architectural decisions, and the ability to work efficiently. We strongly encourage you to use modern tools that accelerate development, such as AI code assistants (e.g., Cursor, GitHub Copilot), to build this project. The goal is to see how you build, not how much boilerplate you can remember.
3. The Project: A Two-Part Application
You will build a simple, two-part web application: a marketing landing page and a connected mini-app called "The Idea Board."
Part 1: The Landing Page
A simple, single-page, responsive marketing site.
Requirements:
Content: It should have a standard landing page structure: a hero section, a "features" section (3-4 features), and a call-to-action (CTA) button. Generate copy using A.I, as long as it makes sense..
CTA: The call-to-action button should link to the /app route, where the mini-web-app will live.
Design: The page must be aesthetically pleasing and fully responsive, providing a good user experience on both desktop and mobile devices.
Part 2: The Mini Web App - "The Idea Board"
A simple, real-time, anonymous idea board.
Requirements:
Functionality:
An input field where a user can type an idea (max 280 characters) and submit it.
A list or grid displaying all submitted ideas.
Each idea card should display the idea's text and an "Upvote" button with a counter.
Clicking the "Upvote" button should increment the counter for that idea.
Persistence: Ideas and their upvote counts must be stored in a database.
User Experience: The list of ideas and upvote counts should feel "live." While full real-time with WebSockets is an option, a simple "re-fetch on action" or periodic polling is also perfectly acceptable.
4. Required Technical Stack & Architecture
This is where you make choices that reflect modern best practices.
Frontend:
Framework: React (Next.js is highly recommended) or another modern equivalent like Vue/Nuxt.
Styling: Use a modern CSS framework. Tailwind CSS is strongly preferred.
Backend:
Language/Framework: Your choice. Node.js (Express, Fastify), Python (FastAPI, Django), Go, or Rust are all great options.
API: Create a simple REST or GraphQL API to handle creating ideas and upvoting them.
Database:
Your choice. A relational database like PostgreSQL is preferred, but SQLite or a modern BaaS like Supabase/Firestore is also acceptable.
Containerization (Mandatory):
The entire application (frontend, backend, database) must be containerized using Docker.
Provide a docker-compose.yml file that allows us to run the entire stack locally with a single command: docker-compose up.
Include well-written Dockerfiles for each service.
Bonus (Optional):
Provide basic Kubernetes manifests (deployment.yaml, service.yaml, ingress.yaml) to demonstrate an understanding of cloud-native deployment.
5. Deliverables
Please provide the following:
Git Repository: A link to a public Git repository (e.g., GitHub, GitLab) containing the full source code for the project.
A Comprehensive README.md: This is crucial. Your README should include:
An overview of your project and architectural choices.
Clear, step-by-step instructions on how to run the application locally using Docker Compose.
A description of the API endpoints you created.
Any other relevant notes or trade-offs you made.
6. Evaluation Criteria
You will be assessed on the following:
Completeness & Functionality: Does the application meet all the requirements and work as expected?
Code Quality: Is the code clean, well-structured, readable, and maintainable?
Technical Choices: Did you select appropriate tools and use them effectively?
Containerization: Does the Docker setup work flawlessly and follow best practices?
User Experience: Is the final product polished and responsive?
Documentation: Is the README.md clear and comprehensive?
Good luck, and we look forward to seeing what you build!
