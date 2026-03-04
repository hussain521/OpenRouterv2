import { useState } from "react";
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
    <DashboardLayout title="Dialog Test">
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-8">Dialog Test Page</h1>
        
        <div className="grid grid-cols-2 gap-4 max-w-4xl">
          {/* Test buttons */}
          <Button onClick={() => openDialog("billing")}>
            Test Billing Address Dialog
          </Button>
          
          <Button onClick={() => openDialog("organization")}>
            Test Create Organization Dialog
          </Button>
          
          <Button onClick={() => openDialog("feedback")}>
            Test Feedback Dialog
          </Button>
          
          <Button onClick={() => openDialog("pdf")}>
            Test PDF Inputs Dialog
          </Button>
          
          <Button onClick={() => openDialog("reportFeedback")}>
            Test Report Feedback Dialog
          </Button>
          
          <Button onClick={() => openDialog("responseHealing")}>
            Test Response Healing Dialog
          </Button>
          
          <Button onClick={() => openDialog("webSearch")}>
            Test Web Search Dialog
          </Button>
          
          <div className="flex items-center gap-2">
            <span>API Key Dialog:</span>
            <CreateApiKeyDialog />
          </div>
          
          <div className="flex items-center gap-2">
            <span>Management Key Dialog:</span>
            <CreateManagementKeyDialog />
          </div>
        </div>

        {/* Dialogs */}
        <BillingAddressDialog
          open={dialogs.billing}
          onOpenChange={(open) => !open && closeDialog("billing")}
          onComplete={() => {
            console.log("Billing address completed");
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