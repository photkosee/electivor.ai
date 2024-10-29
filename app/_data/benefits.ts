import { School, NotebookPen, BotMessageSquare, Blocks  } from "lucide-react";

export type BenefitType = {
  title: string;
  description: string;
  icon: React.ElementType;
}

export const benefits = [
	{
		title: "UNSW Course Recommender",
		description: "UNSW offers a diverse range of courses across numerous fields, which can be easily missed by new students.",
		icon: School,
	},
	{ 
    title: "Personal Plan Assistant",
    description: "Receive tailored course recommendations based on your career goals, interests, or specific topics.",
    icon: NotebookPen
  },
	{ 
    title: "Real-Time Chat", 
    description: "Chat with our 24/7 chatbot, always ready to assist you.", 
    icon: BotMessageSquare 
  },
	{
    title: "Developed By Students, For Students", 
    description: "Developed by students, for students. Our chatbot is designed to empathize with your academic journey.",
    icon: Blocks 
  },
];

export default benefits;