export function FloatingActionButton() {
  return (
    <button className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 md:bottom-10 md:right-10 w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-nature-green-500 to-nature-blue-600 text-white rounded-full shadow-2xl shadow-nature-green-400/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 lg:hidden hover:shadow-2xl hover:shadow-nature-green-500/60">
      <span className="material-symbols-outlined text-2xl sm:text-3xl">add</span>
    </button>
  );
}
