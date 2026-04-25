export function FloatingActionButton() {
  return (
    <button className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-primary-container text-on-primary-container rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 lg:hidden">
      <span className="material-symbols-outlined text-2xl">add</span>
    </button>
  );
}
