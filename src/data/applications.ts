export type Application = {
  id: string;
  auditionId: string;
  roleId: string;
  actorId: string;
  name: string;
  email: string;
  bio: string;
  resume: string;
  headshots: string[];
  videos: string[];
  status: "Submitted" | "Shortlisted" | "Rejected";
};

export const applications: Application[] = [
  {
    id: "1",
    auditionId: "1",
    roleId: "1-1",
    actorId: "1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    bio: "An aspiring actor with a passion for cinema.",
    resume: "/path/to/resume.pdf",
    headshots: ["/path/to/headshot1.jpg", "/path/to/headshot2.jpg"],
    videos: ["/path/to/video1.mp4", "/path/to/video2.mp4"],
    status: "Submitted",
  },
]; 