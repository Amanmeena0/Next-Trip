export function EmptyState() {
  return (
    <div className="flex-1 glass-panel border-2 border-dashed border-outline-variant/50 rounded-2xl flex flex-col items-center justify-center p-12 text-center min-h-72">
      <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl text-outline/50">
          map
        </span>
      </div>
      <h3 className="text-h3 font-h3 text-on-surface mb-2">
        Ready to explore?
      </h3>
      <p className="max-w-xs mx-auto text-on-surface-variant text-body-md">
        Fill out the form to generate a customized AI trip summary, budget
        breakdown, and itinerary tips.
      </p>
    </div>
  );
}
