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
          This is the best way to stay accountable, ship your projects, and
          connect with other builders. We focus on consistency and real output
          rather than just talk.
        </p>
        <p>
          Discover and make cool stuff with a community spirit of innovation.
          Together we can change the world and make a difference. Most
          importantly, share as you build—not just when it's done—to gain
          valuable feedback from fellow members and make better stuff.
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
      "Seasons are time-limited periods dedicated to focused building and shipping. Each season brings a fresh start and a cohort of builders working together towards their launch goals.",
  },
  {
    id: "4",
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
];

export function Faq() {
  return (
    <div className="w-full max-w-3xl mx-auto py-12">
      <h2 className="font-bold text-3xl text-center mb-8">Frequently Asked Questions</h2>
      <Accordion
        className="w-full space-y-4"
      >
        {items.map((item) => (
          <AccordionItem
            className="rounded-lg shadow-none border-none bg-card px-4 py-1"
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
