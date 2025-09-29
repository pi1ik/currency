import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Что такое криптовалюта",
  description:
    "Узнай что такое Биткойн, кто и когда его придумал, а также получи уникальную возможность проконсультироваться с экспертами и инвестировать в действительно растущие криптовалюты",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full">{children}</div>;
}
