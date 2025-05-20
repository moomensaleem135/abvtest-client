'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Testpad = () => {
  const [activeView, setActiveView] = useState<string | null>(null);
  const router = useRouter()
  const handleViewChange = (view: string) => {
    setActiveView(view)

    if (view === "developer") {
      router.push("/developer-view")
    } else if (view === "validator") {
      router.push("/validator-view")
    }
  }

  const handleReset = () => {
    setActiveView(null);
    localStorage.removeItem('currentConversationId')
  };

  return (
    <div className="bg-[#AEAEAE] bg-opacity-[0.16] p-6 rounded-[19px] w-80 backdrop-blur-[50px]">
      <h2 className="text-[#F7F7F7]/60 font-semibold text-xl font-medium text-center mb-4">
        ABV Testpad
      </h2>

      <div className="space-y-3">
        <button
          onClick={() => handleViewChange('validator')}
          className={`w-full py-2 text-[#F7F7F7]/60 rounded bg-[#AEAEAE] rounded-xl border border-[#FFFFFF] border-opacity-[0.16] bg-opacity-[0.04] hover:bg-gray-700/60 transition-colors`}
        >
          Validator View
        </button>

        <button
          onClick={() => handleViewChange('developer')}
          className={`w-full py-2 text-[#F7F7F7]/60 rounded bg-[#1F2323] rounded-xl border border-[#FFFFFF] border-opacity-[0.16] bg-opacity-40 hover:bg-gray-700/60 transition-colors`}
        >
          Developer View
        </button>

        <button
          onClick={handleReset}
          className="w-full py-2 text-[#F7F7F7]/60 rounded bg-[#1F2323] rounded-xl border border-[#FFFFFF] border-opacity-[0.16] bg-opacity-40 hover:bg-gray-700/60 transition-colors"
        >
          Reset All
        </button>
      </div>
    </div>
  );
};

export default Testpad;
