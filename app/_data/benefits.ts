import { School, NotebookPen, BotMessageSquare, Blocks  } from "lucide-react";

export type BenefitType = {
  title: string;
  description: string;
  icon: React.ElementType;
}

export const benefits = [
	{
		title: "Cover All Fields of Study",
		description: "UNSW offers a wide range of courses in various fields, which can be overlooked if you're just starting out",
		icon: School,
	},
	{ 
    title: "Personal Plan Assistant",
    description: "Get personalized course recommendations based on your goals, career, or topics",
    icon: NotebookPen
  },
	{ 
    title: "Real-Time Chat", 
    description: "Chat with our chatbot that never sleeps and always be there for you", 
    icon: BotMessageSquare 
  },
	{
    title: "Built By a Student For a Student", 
    description: "Our chatbot is built by a student for a student, we know your struggles",
    icon: Blocks 
  },
];

export default benefits;