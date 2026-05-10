"use client";

import { Check } from "lucide-react";

type Step = {
  label: string;
  description: string;
};

type StepIndicatorProps = {
  steps: Step[];
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick?: (step: number) => void;
};

export function StepIndicator({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className="step-indicator">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.has(index);
        const isCurrent = index === currentStep;
        const isClickable = isCompleted || index <= currentStep;
        const lineActive = isCompleted || isCurrent;

        return (
          <div key={step.label} className="step-indicator-step">
            {index < steps.length - 1 && (
              <div
                className={`step-indicator-line ${
                  lineActive ? "step-line-active" : ""
                }`}
              />
            )}
            <button
              type="button"
              className={`step-indicator-button ${
                isCurrent
                  ? "step-current"
                  : isCompleted
                    ? "step-completed"
                    : "step-pending"
              } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
              onClick={() => isClickable && onStepClick?.(index)}
              disabled={!isClickable}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className="step-indicator-circle">
                {isCompleted && !isCurrent ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : (
                  <span className="step-indicator-number">{index + 1}</span>
                )}
              </span>
            </button>
            <div className="step-indicator-text">
              <span className="step-indicator-label">{step.label}</span>
              <span className="step-indicator-description">
                {step.description}
              </span>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
