import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
	{
		id: "1",
		title: "Why should I join?",
		content: (
			<div className="space-y-4">
				<p>
					Most people never achieve their dreams simply because they never get
					started. We're here to change that.
				</p>
				<p>
					Building in public is the cheat code to shipping products people
					actually want. Did you know that{" "}
					<span className="font-bold text-foreground">
						42% of startups fail because there is no market need
					</span>
					? Countless creators spend months building in isolation, only to
					launch and realize nobody wants what they built. By sharing your
					progress weekly, you get built-in accountability and immediate
					feedback loops—ensuring you're always building in the right direction.
				</p>
			</div>
		),
	},
	{
		id: "2",
		title: "What are the requirements?",
		content:
			"The only requirement is that you must post an update at least once publicly every week. That's the whole point—to build in public.",
	},
	{
		id: "3",
		title: "What are seasons?",
		content:
			"Seasons are exciting periods where official events, sponsors, rewards, and perks happen! However, off-seasons are just as important—they are periods where you continue building and sharing without the pressure of an official event. During off-seasons, we have weekly leaderboards sectioned by around 50 users based on when they started, ensuring everyone plays on a fair ground to catch up in their league.",
	},
	{
		id: "4",
		title: "Who can join?",
		content:
			"Anyone from anywhere in the world! We are a completely async global community. Whether you're in Tokyo, New York, or a small village, as long as you have internet and a passion to build, you are welcome.",
	},
	{
		id: "no-following",
		title: "I don't have any following, can I join?",
		content:
			"Absolutely! You don't need an audience to be a part of this. Whether you have zero followers or thousands, what matters is your drive to build and share your work.",
	},
	{
		id: "5",
		title: "What can I work on?",
		content:
			"Anything! Make music, create a new recipe, build your startup, chase your dreams, or innovate. This is where we go wild and make cool shit.",
	},
	{
		id: "6",
		title: "Can I work on something I already have?",
		content:
			"Yes, you can start something new or continue working on something you are already building. Just share your progress like you're building a startup.",
	},
	{
		id: "7",
		title: "Is this a competition?",
		content:
			"No, it's just to encourage everyone to build and innovate together, and to showcase your work to fellow members and the world. This becomes your portfolio to showcase what you have done tangibly. Your records of progress can be used to showcase as part of your portfolio.",
	},
	{
		id: "8",
		title: "Are there prizes?",
		content:
			"No, not yet! But we're looking at shipping physical badge pins to everyone who participates, and of course, the most active top 10 will get special ones.",
	},
	{
		id: "9",
		title: "How do I become active?",
		content: (
			<div className="space-y-4">
				<p>
					Keep posting progress updates, discover what other people are building
					and share valuable feedback.
				</p>
				<p>
					Offer discounts or promo codes for other people to try your stuff in
					exchange for feedback. Post on social media (X, YouTube, Instagram,
					Threads, LinkedIn) and tag us!
				</p>
			</div>
		),
	},
	{
		id: "9",
		title: "Are streaks mandatory?",
		content:
			"Streaks are completely optional! They are just a fun way to maintain a flame effect on your avatar to show your consistency. Don't stress about it if you miss a week.",
	},
];

export function Faq() {
	return (
		<div className="w-full max-w-3xl mx-auto py-12">
			<h2 className="font-bold text-3xl text-center mb-8">
				Frequently Asked Questions
			</h2>
			<Accordion className="w-full space-y-4">
				{items.map((item, i) => (
					<AccordionItem
						className={`rounded-lg shadow-none border-none bg-card px-4 py-1 transition-all duration-300 hover:scale-[1.01] hover:rotate-0 ${
							i % 3 === 0
								? "rotate-0.5"
								: i % 3 === 1
									? "-rotate-0.5"
									: "rotate-0" // keep every 3rd one straight for variety
						}`}
						key={item.id}
						value={item.id}
					>
						<AccordionTrigger className="text-left !text-lg font-medium hover:no-underline [&[data-state=open]]:text-primary">
							{item.title}
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground pt-2 pb-4">
							{item.content}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
