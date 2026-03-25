import { useTranslation } from "react-i18next";

interface Position {
  title: string;
  department: string;
}

const positions: Position[] = [
  {
    title: "careers.openPositions.positions.partnerDevelopmentManager.title",
    department: "careers.openPositions.positions.partnerDevelopmentManager.department",
  },
  {
    title: "careers.openPositions.positions.seniorFullStackEngineer.title", 
    department: "careers.openPositions.positions.seniorFullStackEngineer.department",
  },
  {
    title: "careers.openPositions.positions.providerOperationsSupport.title",
    department: "careers.openPositions.positions.providerOperationsSupport.department",
  },
  {
    title: "careers.openPositions.positions.developerRelationsLead.title",
    department: "careers.openPositions.positions.developerRelationsLead.department",
  },
  {
    title: "careers.openPositions.positions.lifecycleMarketingLead.title",
    department: "careers.openPositions.positions.lifecycleMarketingLead.department",
  },
  {
    title: "careers.openPositions.positions.accountExecutive.title",
    department: "careers.openPositions.positions.accountExecutive.department",
  },
  {
    title: "careers.openPositions.positions.strategicEnterpriseAccountExecutive.title",
    department: "careers.openPositions.positions.strategicEnterpriseAccountExecutive.department",
  },
  {
    title: "careers.openPositions.positions.customerEngineer.title",
    department: "careers.openPositions.positions.customerEngineer.department",
  },
  {
    title: "careers.openPositions.positions.financeBusinessOperationsManager.title",
    department: "careers.openPositions.positions.financeBusinessOperationsManager.department",
  },
  {
    title: "careers.openPositions.positions.businessDevelopmentRepresentative.title",
    department: "careers.openPositions.positions.businessDevelopmentRepresentative.department",
  },
];

export default function CareersOpenPositions() {
  const { t } = useTranslation();

  return (
    <section id="open-positions" className="w-full max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-foreground">
          {t("careers.openPositions.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("careers.openPositions.subtitle")}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {positions.map((position, index) => (
          <div
            key={index}
            className="group transition-colors hover:bg-accent/50 p-4 cursor-pointer flex justify-between items-center rounded-lg border border-border"
            tabIndex={0}
            role="button"
            aria-label={`View ${t(position.title)} job details`}
          >
            <div>
              <h3 className="text-lg font-medium mb-1.5 text-foreground">
                {t(position.title)}
              </h3>
              <div className="text-sm text-muted-foreground">
                {t(position.department)}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}