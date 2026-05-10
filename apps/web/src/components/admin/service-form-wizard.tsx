"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import { Save, ArrowLeft, ArrowRight, Send, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import type { ServiceFormState } from "@/app/actions/admin-services";

import { StepIndicator } from "./step-indicator";
import {
  ServiceStepBasics,
  defaultBasicsData,
  validateBasicsStep,
  type BasicsData,
} from "./service-step-basics";
import {
  ServiceStepPricing,
  defaultPricingData,
  type PricingData,
} from "./service-step-pricing";
import {
  ServiceStepVisibility,
  defaultVisibilityData,
  type VisibilityData,
} from "./service-step-visibility";

type ServiceFormWizardProps = {
  action: (
    previousState: ServiceFormState,
    formData: FormData,
  ) => Promise<ServiceFormState>;
  categories: Array<{ id: string; name: string }>;
  service?: {
    id: string;
    categoryId: string;
    name: string;
    slug: string;
    shortDescription: string;
    description: string | null;
    imagePath: string | null;
    status: string;
    isFeatured: boolean;
    displayOrder: number;
    metaTitle: string | null;
    metaDescription: string | null;
    pricing: {
      type: string;
      amountCents: number | null;
      currency: string;
      unitLabel: string | null;
      tieredDescription: string | null;
      publicLabel: string | null;
    } | null;
  };
};

const steps = [
  { label: "Basics", description: "Name, category, description" },
  { label: "Pricing", description: "Type, amount, labels" },
  { label: "Visibility", description: "Status, SEO" },
];

export function ServiceFormWizard({
  action,
  categories,
  service,
}: ServiceFormWizardProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [serverState, setServerState] = useState<ServiceFormState>({
    status: "idle",
  });
  const [isPending, startTransition] = useTransition();

  const [basicsData, setBasicsData] = useState<BasicsData>(
    service
      ? {
          categoryId: service.categoryId,
          name: service.name,
          slug: service.slug,
          shortDescription: service.shortDescription,
          description: service.description ?? "",
          imagePath: service.imagePath ?? "",
          displayOrder: String(service.displayOrder ?? 0),
        }
      : defaultBasicsData,
  );

  const [pricingData, setPricingData] = useState<PricingData>(
    service?.pricing
      ? {
          pricingType: service.pricing.type,
          amountCents: service.pricing.amountCents?.toString() ?? "",
          unitLabel: service.pricing.unitLabel ?? "",
          publicLabel: service.pricing.publicLabel ?? "",
          tieredDescription: service.pricing.tieredDescription ?? "",
          currency: service.pricing.currency ?? "CAD",
        }
      : defaultPricingData,
  );

  const [visibilityData, setVisibilityData] = useState<VisibilityData>(
    service
      ? {
          metaTitle: service.metaTitle ?? "",
          metaDescription: service.metaDescription ?? "",
          status: service.status as "DRAFT" | "ACTIVE" | "INACTIVE",
          isFeatured: service.isFeatured,
        }
      : defaultVisibilityData,
  );

  const updateBasics = useCallback((field: keyof BasicsData, value: string) => {
    setBasicsData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updatePricing = useCallback(
    (field: keyof PricingData, value: string) => {
      setPricingData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const updateVisibility = useCallback(
    (field: keyof VisibilityData, value: string | boolean) => {
      setVisibilityData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  function validateCurrentStep(): boolean {
    let errors: Record<string, string> = {};

    if (currentStep === 0) {
      errors = validateBasicsStep(basicsData);
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function stepForFieldErrors(fieldErrors: Record<string, string>): number {
    const fields = Object.keys(fieldErrors);
    if (
      fields.some((field) =>
        [
          "categoryId",
          "name",
          "slug",
          "shortDescription",
          "description",
          "imagePath",
          "displayOrder",
        ].includes(field),
      )
    ) {
      return 0;
    }
    if (
      fields.some((field) =>
        [
          "pricingType",
          "amountCents",
          "unitLabel",
          "publicLabel",
          "tieredDescription",
        ].includes(field),
      )
    ) {
      return 1;
    }
    return 2;
  }

  function handleNext() {
    if (!validateCurrentStep()) return;

    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    setStepErrors({});
  }

  function handleBack() {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setStepErrors({});
  }

  function handleStepClick(step: number) {
    if (step <= currentStep || completedSteps.has(step)) {
      setCurrentStep(step);
      setStepErrors({});
    }
  }

  function buildFormData(intent: "draft" | "publish"): FormData {
    const formData = new FormData();

    formData.set("intent", intent);

    // Basics
    formData.set("categoryId", basicsData.categoryId);
    formData.set("name", basicsData.name);
    formData.set("slug", basicsData.slug);
    formData.set("shortDescription", basicsData.shortDescription);
    formData.set("description", basicsData.description);
    formData.set("imagePath", basicsData.imagePath);
    formData.set("displayOrder", basicsData.displayOrder);

    // Pricing
    formData.set("pricingType", pricingData.pricingType);
    formData.set("amountCents", pricingData.amountCents);
    formData.set("unitLabel", pricingData.unitLabel);
    formData.set("publicLabel", pricingData.publicLabel);
    formData.set("tieredDescription", pricingData.tieredDescription);
    formData.set("currency", pricingData.currency);

    // Visibility
    formData.set("metaTitle", visibilityData.metaTitle);
    formData.set("metaDescription", visibilityData.metaDescription);
    formData.set(
      "status",
      intent === "publish" && visibilityData.status === "DRAFT"
        ? "ACTIVE"
        : visibilityData.status,
    );
    if (visibilityData.isFeatured) {
      formData.set("isFeatured", "on");
    }

    return formData;
  }

  function handleSubmit(intent: "draft" | "publish") {
    if (intent === "publish" && !validateCurrentStep()) return;

    const formData = buildFormData(intent);

    startTransition(async () => {
      const result = await action({ status: "idle" }, formData);
      setServerState(result);

      if (result.status === "error" && result.fieldErrors) {
        setStepErrors(result.fieldErrors);
        setCurrentStep(stepForFieldErrors(result.fieldErrors));
        return;
      }

      if (result.status === "success" && result.serviceId) {
        router.push("/admin/services");
      }
    });
  }

  return (
    <form ref={formRef} className="grid gap-6">
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
      />

      <div className="admin-card">
        <div className="admin-card-body">
          {currentStep === 0 && (
            <ServiceStepBasics
              data={basicsData}
              errors={stepErrors}
              categories={categories}
              onChange={updateBasics}
            />
          )}
          {currentStep === 1 && (
            <ServiceStepPricing
              data={pricingData}
              errors={stepErrors}
              onChange={updatePricing}
            />
          )}
          {currentStep === 2 && (
            <ServiceStepVisibility
              data={visibilityData}
              errors={stepErrors}
              onChange={updateVisibility}
              isDraft={false}
            />
          )}
        </div>
      </div>

      {/* Messages */}
      {serverState.message ? (
        <p
          className={`rounded-lg px-4 py-3 text-sm font-semibold ${
            serverState.status === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-700"
          }`}
          aria-live="polite"
        >
          {serverState.message}
        </p>
      ) : null}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <div>
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#151515]/10 px-4 text-sm font-semibold text-[#151515]/70 transition-colors hover:bg-[#151515]/5"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              Back
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            disabled={isPending}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#151515]/10 px-4 text-sm font-semibold text-[#151515]/60 transition-colors hover:bg-[#151515]/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            ) : (
              <Save className="h-4 w-4" strokeWidth={2} />
            )}
            Save draft
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#151515] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#3b82f6]"
            >
              Next
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSubmit("publish")}
              disabled={isPending}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#151515] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#3b82f6] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              ) : (
                <Send className="h-4 w-4" strokeWidth={2} />
              )}
              {service?.status === "DRAFT"
                ? "Publish service"
                : service
                  ? "Save changes"
                  : "Publish service"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
