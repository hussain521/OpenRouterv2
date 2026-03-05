import { useState } from "react";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  BillingAddressDialog,
  CreateOrganizationDialog,
  FeedbackDialog,
  PdfInputsDialog,
  ReportFeedbackDialog,
  ResponseHealingDialog,
  WebSearchDialog,
} from "@/components/dialogs";
import { CreateApiKeyDialog } from "@/components/CreateApiKeyDialog";
import { CreateManagementKeyDialog } from "@/components/CreateManagementKeyDialog";

export function DialogTestPage() {
  const { t } = useTranslation();
  const [dialogs, setDialogs] = useState({
    billing: false,
    organization: false,
    feedback: false,
    pdf: false,
    reportFeedback: false,
    responseHealing: false,
    webSearch: false,
  });

  const openDialog = (dialog: keyof typeof dialogs) => {
    setDialogs((prev) => ({ ...prev, [dialog]: true }));
  };

  const closeDialog = (dialog: keyof typeof dialogs) => {
    setDialogs((prev) => ({ ...prev, [dialog]: false }));
  };

  return (
    <DashboardLayout title={t("dialogTest.pageTitle")}>
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-8">{t("dialogTest.heading")}</h1>
        
        <div className="grid grid-cols-2 gap-4 max-w-4xl">
          {/* Test buttons */}
          <Button onClick={() => openDialog("billing")}>
            {t("dialogTest.testBillingAddress")}
          </Button>
          
          <Button onClick={() => openDialog("organization")}>
            {t("dialogTest.testCreateOrganization")}
          </Button>
          
          <Button onClick={() => openDialog("feedback")}>
            {t("dialogTest.testFeedback")}
          </Button>
          
          <Button onClick={() => openDialog("pdf")}>
            {t("dialogTest.testPdfInputs")}
          </Button>
          
          <Button onClick={() => openDialog("reportFeedback")}>
            {t("dialogTest.testReportFeedback")}
          </Button>
          
          <Button onClick={() => openDialog("responseHealing")}>
            {t("dialogTest.testResponseHealing")}
          </Button>
          
          <Button onClick={() => openDialog("webSearch")}>
            {t("dialogTest.testWebSearch")}
          </Button>
          
          <div className="flex items-center gap-2">
            <span>{t("dialogTest.apiKeyDialogLabel")}</span>
            <CreateApiKeyDialog />
          </div>
          
          <div className="flex items-center gap-2">
            <span>{t("dialogTest.managementKeyDialogLabel")}</span>
            <CreateManagementKeyDialog />
          </div>
        </div>

        {/* Dialogs */}
        <BillingAddressDialog
          open={dialogs.billing}
          onOpenChange={(open) => !open && closeDialog("billing")}
          onComplete={() => {
            console.log(t("dialogTest.billingAddressCompleted"));
            closeDialog("billing");
          }}
        />
        
        <CreateOrganizationDialog
          open={dialogs.organization}
          onOpenChange={(open) => !open && closeDialog("organization")}
        />
        
        <FeedbackDialog
          open={dialogs.feedback}
          onOpenChange={(open) => !open && closeDialog("feedback")}
        />
        
        <PdfInputsDialog
          open={dialogs.pdf}
          onOpenChange={(open) => !open && closeDialog("pdf")}
        />
        
        <ReportFeedbackDialog
          open={dialogs.reportFeedback}
          onOpenChange={(open) => !open && closeDialog("reportFeedback")}
        />
        
        <ResponseHealingDialog
          open={dialogs.responseHealing}
          onOpenChange={(open) => !open && closeDialog("responseHealing")}
        />
        
        <WebSearchDialog
          open={dialogs.webSearch}
          onOpenChange={(open) => !open && closeDialog("webSearch")}
        />
      </div>
    </DashboardLayout>
  );
}

export default DialogTestPage;