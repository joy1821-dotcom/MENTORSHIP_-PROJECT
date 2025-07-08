import {Mentee} from "../models/u-index.js"; 
import { isUserEmailUnique } from "../validations/isUserEmailUnique.js";



const menteesData = [
  {
    firstName: "Ebuka",
    lastName: "Johnson",
    shortBio: "Aspiring web developer passionate about front-end technologies.",
    email: "ebuka@example.com",
    goals: "Learn React and get an internship.",
    skills: ["HTML", "CSS"],
    password: "password123", 
  },
  {
    firstName: "Bob",
    lastName: "Smith",
    shortBio: "Interested in data science and machine learning.",
    email: "bob.smith@example.com",
    goals: "Build a machine learning portfolio.",
    skills: ["Python", "Pandas", "Matplotlib"],
    password: "securePass456",
  },
  {
    firstName: "Chloe",
    lastName: "Kim",
    shortBio: "Curious about cybersecurity and ethical hacking.",
    email: "chloe.kim@example.com",
    goals: "Learn about network security tools.",
    skills: ["Networking", "Linux"],
    password: "cyberSecure!78",
  },
];

export async function seedMentees(): Promise<void> {
  try {
    
  for (const mentee of menteesData) {
    const isEmailUnique = await isUserEmailUnique(mentee.email);
    if (!isEmailUnique) {
      console.log("Email is already in use.");
      return;
    }

    const existing = await Mentee.findOne({ where: { email: mentee.email } });

    if (existing) {
      console.log("Email already exists");
      return;
    }

    await Mentee.create(mentee);
  }

  console.log("Mentee seeding completed.");
    console.log("Mentees seeded successfully.");
  } catch (error) {
    console.error("Error seeding mentees:", error);
  }
}
