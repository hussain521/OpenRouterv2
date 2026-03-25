import { useTranslation } from "react-i18next";

interface Benefit {
  titleKey: string;
  descriptionKey: string;
  iconPath: string;
  strokeLinecap?: "round" | "butt" | "square";
  strokeLinejoin?: "round" | "miter" | "bevel";
  strokeWidth?: string;
}

const benefits: Benefit[] = [
  {
    titleKey: "careers.benefits.remoteFirst.title",
    descriptionKey: "careers.benefits.remoteFirst.description",
    iconPath: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
  },
  {
    titleKey: "careers.benefits.competitiveCompensation.title",
    descriptionKey: "careers.benefits.competitiveCompensation.description",
    iconPath: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
  },
  {
    titleKey: "careers.benefits.healthWellness.title",
    descriptionKey: "careers.benefits.healthWellness.description",
    iconPath: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
  },
  {
    titleKey: "careers.benefits.unlimitedPto.title",
    descriptionKey: "careers.benefits.unlimitedPto.description",
    iconPath: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
  },
  {
    titleKey: "careers.benefits.wfhBudget.title",
    descriptionKey: "careers.benefits.wfhBudget.description",
    iconPath: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
  },
  {
    titleKey: "careers.benefits.quarterlyOffsites.title",
    descriptionKey: "careers.benefits.quarterlyOffsites.description",
    iconPath: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
  },
];

export default function CareersBenefits() {
  const { t } = useTranslation();

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-foreground">
          {t("careers.benefits.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("careers.benefits.subtitle")}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-8 h-8 bg-[#6467f2]/10 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={benefit.strokeWidth}
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap={benefit.strokeLinecap}
                  strokeLinejoin={benefit.strokeLinejoin}
                  d={benefit.iconPath}
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">{t(benefit.titleKey)}</h4>
              <p className="text-sm text-muted-foreground">
                {t(benefit.descriptionKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}