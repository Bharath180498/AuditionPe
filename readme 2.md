Project Spec – Backstage India (Frontend-First)
📌 Project Summary
Build a web-based casting platform for India where:

Actors can discover and apply to casting calls with portfolios.

Producers can post casting calls, define roles, and view applicants.

You will first complete the entire frontend using dummy data, with full UI/UX flows, and later plug in backend functionality.

👥 User Roles
Actor

Producer / Casting Director

🧭 Core User Flows
✅ Actor Journey
Sign up / Login

Choose "Actor" role

Basic personal profile

Browse Casting Calls

List view of casting calls

Filters: location, gender, age range, category (Film, TV, Ad, etc.)

View Details of a Casting

View project, roles, requirements

Apply for a Role

Submit:

Resume (PDF)

Headshots (2 images)

Video links or uploads (2 videos)

Personal info (name, contact, bio)

Application Confirmation

See status as “Submitted”

Cannot reapply to same role

✅ Producer Journey
Sign up / Login

Choose "Producer" role

Setup profile with company/project name

Create a New Casting Call

Project title, description, category

Add one or more roles:

Role name

Gender

Age range

Description

Dashboard View

See list of all their posted castings

View Applicants

For each role, view who applied

See resume, headshots, videos, and contact info

(Later: Mark as shortlisted / rejected)

🖼️ Pages to Build (Frontend Only)
Page	Route	Description
Landing Page	/	Welcome, CTA for signup/login
Login	/login	Login form with role selection
Signup	/signup	Sign-up form for Actor/Producer
Audition Listing	/auditions	Filterable list of casting calls
Audition Detail	/auditions/[id]	Full details + apply form
Producer Dashboard	/producer/dashboard	List of castings created
New Casting	/producer/new	Form to create a casting call
View Applicants	/producer/[castingId]	List of actors who applied to each role

🎨 Design & UX Guidelines
Use Tailwind CSS with ShadCN UI for clean and responsive components

Keep UI professional but minimal

Use clear role-based layouts (Actor vs Producer)

Use toasts for action confirmations (e.g. “Application Submitted”)

🔍 Filters on Audition Listing Page
Role Gender

Age Range

Category (TV, Film, Ad)

Location

Keywords (Search bar)

💾 Frontend Tech Stack
Next.js (App Router)

Tailwind CSS

Typescript

React Context (or Zustand) for simple role/session state

Dummy data hardcoded into component or local file (JSON/JS object)

🧩 Frontend Logic (with Dummy Data)
All interactions are local:

Submitting forms shows a toast and adds to in-memory state

Audition list reads from static array

No backend/API calls

📦 Future Backend (v2) [Optional]
(Not needed now but documented for later)

Use Supabase or Firebase to:

Store users, auditions, applications

Upload media (images, resumes, videos)

Authentication via email/password or OTP

Admin moderation panel

✅ MVP Completion Criteria (Frontend)
Fully functional UI for both Actor and Producer

Navigation and conditional routing based on role

Forms and submission simulated with dummy data

No hard errors, all actions visually confirmed

