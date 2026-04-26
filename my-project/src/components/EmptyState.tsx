export function EmptyState() {
  return (
    <div className="flex-1 bg-linear-to-br from-nature-blue-50 to-nature-green-50 border border-nature-green-200 rounded-lg md:rounded-2xl flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 text-center min-h-80 sm:min-h-96 md:min-h-125">
      {/* Icon */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white border-2 border-nature-green-300 flex items-center justify-center mb-5 sm:mb-6 md:mb-7">
        <span className="text-4xl sm:text-5xl md:text-6xl">🗺️</span>
      </div>

      {/* Content */}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-nature-blue-900 mb-3 sm:mb-4">
        Create Your Perfect Trip
      </h3>
      <p className="max-w-sm mx-auto text-sm sm:text-base md:text-lg text-nature-brown-700 leading-relaxed mb-6 sm:mb-7 md:mb-8">
        Get started by filling out a few simple details on the left. We'll generate a customized itinerary, budget breakdown, and travel tips just for you.
      </p>

      {/* Steps */}
      <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 border border-nature-green-200 max-w-sm w-full">
        <h4 className="text-sm sm:text-base font-semibold text-nature-blue-800 mb-3 sm:mb-4 text-left">
          Quick setup:
        </h4>
        <div className="space-y-2.5 sm:space-y-3 text-left">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-nature-green-600 text-white flex items-center justify-center shrink-0 text-xs sm:text-sm font-bold">
              1
            </div>
            <span className="text-xs sm:text-sm md:text-base text-nature-brown-700 pt-0.5">Enter where you're traveling from and to</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-nature-green-600 text-white flex items-center justify-center shrink-0 text-xs sm:text-sm font-bold">
              2
            </div>
            <span className="text-xs sm:text-sm md:text-base text-nature-brown-700 pt-0.5">Set your travel dates</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-nature-green-600 text-white flex items-center justify-center shrink-0 text-xs sm:text-sm font-bold">
              3
            </div>
            <span className="text-xs sm:text-sm md:text-base text-nature-brown-700 pt-0.5">Choose your budget and create!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
