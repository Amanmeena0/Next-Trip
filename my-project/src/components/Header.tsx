export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-8 h-14 sm:h-16 bg-linear-to-r from-nature-blue-50 to-nature-green-50/80 backdrop-blur-xl border-b border-nature-green-200/50 shadow-sm md:shadow-md">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <span className="material-symbols-outlined text-nature-blue-700 text-xl sm:text-2xl shrink-0">travel_explore</span>
        <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-nature-blue-800 truncate">
          TripFlow
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <nav className="hidden sm:flex items-center space-x-4 lg:space-x-6">
          {['Plan', 'Explore', 'Trips'].map((item, i) => (
            <a
              key={item}
              href="#"
              className={`font-button text-xs sm:text-sm transition-colors ${
                i === 0 ? 'text-nature-blue-700 font-semibold' : 'text-nature-brown-600 hover:text-nature-green-700'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-linear-to-br from-nature-green-100 to-nature-blue-100 flex items-center justify-center overflow-hidden border-2 border-nature-green-300 shrink-0">
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
