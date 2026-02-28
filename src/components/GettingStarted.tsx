import StepCard from "./StepCard";

export default function GettingStarted() {
  return (
    <section className="py-8 md:py-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
        <StepCard
          step={1}
          title="Signup"
          description="Create an account to get started. You can set up an org for your team later."
        >
          <div className="h-16 md:h-20 bg-gray-100 dark:bg-gray-700 rounded-lg" />
        </StepCard>

        <StepCard
          step={2}
          title="Buy credits"
          description="Credits can be used with any model or provider."
        >
          <div className="h-16 md:h-20 bg-gray-100 dark:bg-gray-700 rounded-lg" />
        </StepCard>

        <StepCard
          step={3}
          title="Get your API key"
          description="Create an API key and start making requests. Fully OpenAI compatible."
        >
          <div className="h-16 md:h-20 bg-gray-100 dark:bg-gray-700 rounded-lg" />
        </StepCard>
      </div>
    </section>
  );
}
