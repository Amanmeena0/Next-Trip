export function EmptyState() {
  return (
    <div className="flex-1 glass-panel border-2 border-dashed border-nature-green-200 rounded-lg md:rounded-2xl flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 text-center min-h-64 sm:min-h-72 md:min-h-96 bg-linear-to-b from-nature-blue-50/30 to-nature-green-50/20">
      <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full bg-linear-to-br from-nature-blue-100 to-nature-green-100 flex items-center justify-center mb-4 sm:mb-6 shadow-md">
        <span className="material-symbols-outlined text-3xl sm:text-4xl md:text-5xl text-nature-blue-700">
          map
        </span>
      </div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-nature-blue-900 mb-2 md:mb-3">
        Ready to explore?
      </h3>
      <p className="max-w-xs mx-auto text-nature-brown-600 text-xs sm:text-sm md:text-base leading-relaxed">
        Fill out the form to generate a customized AI trip summary, budget
        breakdown, and itinerary tips.
      </p>
    </div>
  );
}
