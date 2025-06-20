interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between mb-1">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className={`step-indicator ${index + 1 <= currentStep ? "active" : ""}`}>
            <span className={`badge rounded-circle ${index + 1 <= currentStep ? "danger" : "bg-secondary"}`}>
              {index + 1}
            </span>
          </div>
        ))}
      </div>
      <div className="progress">
        <div
          className="progress-bar danger"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      <div className="d-flex justify-content-between mt-1">
        <span className="small">Personal Info</span>
        <span className="small">Additional Details</span>
        <span className="small">Social Media</span>
        <span className="small">Thank You</span>
      </div>
    </div>
  )
}

