import { Mentor } from "../models/u-index.js";
import { isUserEmailUnique } from "../validations/isUserEmailUnique.js";

export async function seedMentors() {
  
    
  const mentorsData = [
    {
      firstName: "Alice",
      lastName: "Johnson",
      shortBio: "Helping people grow in their careers.",
      email: "alice.johnson@example.com",
      goals: "Guide mentees toward professional success.",
      skills: ["Career Coaching", "Interview Prep", "Resume Review"],
      password: "password123", 
      isAvailable: true,
    },
    {
      firstName: "David",
      lastName: "Lee",
      shortBio: "Full-stack engineer passionate about mentorship.",
      email: "david.lee@example.com",
      goals: "Help others break into software engineering.",
      skills: ["JavaScript", "Node.js", "React", "System Design"],
      password: "password123",
      isAvailable: true,
    },
    {
      firstName: "Rina",
      lastName: "Patel",
      shortBio: "UX designer focused on accessibility and simplicity.",
      email: "rina.patel@example.com",
      goals: "Support aspiring designers entering the UX field.",
      skills: ["UX Design", "Figma", "User Research", "Design Thinking"],
      password: "password123",
      isAvailable: true,
    },
  ];

  for (const mentor of mentorsData) {
    
    const isEmailUnique = await isUserEmailUnique(mentor.email);
      if (!isEmailUnique) {
        console.log("Email is already in use.");
        return;
        }
    
    const existing = await Mentor.findOne({ where: { email: mentor.email } });
    
    if (existing) {
      console.log("Email already exists")
      return;
    }



    await Mentor.create(mentor);
  }

  console.log("Mentor seeding completed.");
}
