export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-8 h-16 sm:h-18 md:h-20 bg-white border-b border-nature-green-200 shadow-sm">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg bg-nature-green-600 flex items-center justify-center shrink-0">
          <span className="text-white text-xl sm:text-2xl">✈️</span>
        </div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-nature-blue-900 truncate">
          TripFlow
        </h1>
      </div>
      <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-nature-blue-100 flex items-center justify-center overflow-hidden border border-nature-blue-300 shrink-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeMjNq8abFuMV5k1texBCe138GU6_0q2kEEgBLP8hy0qbU9Z_rDiNi0TcXMdYaPAI1PzBIoPTv6M1Htz3bnDEYq944WpS8z6d050F5YrNIPj5iiNEXBV85v7UkbZnm6ioZZdMb8y0Gj_HXzwNtRj3xIOWSGd0klUMgLxlTb0Dh6CIWipCeFunf13vNXr8X9hAZuBWyzvx2ddxHR6wljYs3A2zS6RkIok43W9QiRDhAZRZpy4FXZeOwo1DtymPDWYZpLhTJL7w5-rw"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
}
