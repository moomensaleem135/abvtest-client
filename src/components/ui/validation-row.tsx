interface ValidationRowProps {
    scope: string
    details: string
    coverage: string
    status: "Pass" | "Fail"
  }
  
  export function ValidationRow({ scope, details, coverage, status }: ValidationRowProps) {
    return (
      <div className="flex items-center hover:bg-[#1A1A1A]">
        <div className="px-6 py-4 w-1/4 text-[#F7F7F7]/80">{scope}</div>
        <div className="px-6 py-4 w-1/4 text-[#F7F7F7]/60">{details}</div>
        <div className="px-6 py-4 w-1/4 text-[#F7F7F7]/60">{coverage}</div>
        <div className="px-6 py-4 w-1/4 text-[#F7F7F7]/80">
          {status === "Pass" ? (
            <span className="flex items-center text-green-500">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Pass
            </span>
          ) : (
            <span className="flex items-center text-red-500">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Fail
            </span>
          )}
        </div>
      </div>
    )
  }
  