import SupportCard from "./SupportCard";

export default function SupportCards() {
  return (
    <section className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 mx-auto">
      <SupportCard type="ticket" />
      <SupportCard type="documentation" />
    </section>
  );
}