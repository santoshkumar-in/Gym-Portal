import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Step {
  name: string;
  number: number;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
}

const StepProgress = ({ steps, currentStep }: StepProgressProps) => {
  return (
    <div className="relative mx-auto mb-8 mt-4 flex w-full max-w-lg items-center justify-between">
      {steps.map((step, index) => (
        <div
          key={index}
          className="relative flex flex-1 items-center justify-center"
        >
          {/* Connector Line (except for the last step) */}
          {index !== 0 && (
            <div
              className={`absolute -left-1/2 top-1/2 h-1 w-full ${
                currentStep > step.number ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
          )}

          {/* Step Circle */}
          <div
            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 font-medium ${
              currentStep > step.number
                ? "border-primary bg-primary text-white"
                : currentStep === step.number
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-400 bg-gray-300 text-gray-600"
            }`}
          >
            {currentStep > step.number ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              step.number
            )}
          </div>

          {/* Step Label */}
          <p
            className={`absolute top-10 text-sm ${
              currentStep >= step.number
                ? "font-semibold text-black"
                : "text-gray-500"
            }`}
          >
            {step.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
