export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 h-16 bg-white/95 sm:bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-md">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <span className="material-symbols-outlined text-primary text-xl sm:text-2xl flex-shrink-0">travel_explore</span>
        <h1 className="text-base sm:text-xl font-bold tracking-tight text-primary font-h2 truncate">
          TripFlow
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <nav className="hidden sm:flex items-center space-x-4 lg:space-x-6">
          {['Plan', 'Explore', 'Trips'].map((item, i) => (
            <a
              key={item}
              href="#"
              className={`font-button text-xs sm:text-body-sm transition-colors ${
                i === 0 ? 'text-primary' : 'text-outline hover:text-primary'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden border border-primary-container/20 flex-shrink-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeMjNq8abFuMV5k1texBCe138GU6_0q2kEEgBLP8hy0qbU9Z_rDiNi0TcXMdYaPAI1PzBIoPTv6M1Htz3bnDEYq944WpS8z6d050F5YrNIPj5iiNEXBV85v7UkbZnm6ioZZdMb8y0Gj_HXzwNtRj3xIOWSGd0klUMgLxlTb0Dh6CIWipCeFunf13vNXr8X9hAZuBWyzvx2ddxHR6wljYs3A2zS6RkIok43W9QiRDhAZRZpy4FXZeOwo1DtymPDWYZpLhTJL7w5-rw"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
