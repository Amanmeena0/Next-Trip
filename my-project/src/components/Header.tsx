export function Header() {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-white/15 bg-primary/95 px-4 text-primary-foreground shadow-lift backdrop-blur-xl sm:h-18 sm:px-6 md:h-20 md:px-8">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white shadow-soft sm:h-11 sm:w-11 md:h-12 md:w-12">
          <span className="text-xl sm:text-2xl">✈️</span>
        </div>
        <h1 className="truncate text-lg font-bold text-white sm:text-xl md:text-2xl">
          TripFlow
        </h1>
      </div>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/15 sm:h-11 sm:w-11 md:h-12 md:w-12">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeMjNq8abFuMV5k1texBCe138GU6_0q2kEEgBLP8hy0qbU9Z_rDiNi0TcXMdYaPAI1PzBIoPTv6M1Htz3bnDEYq944WpS8z6d050F5YrNIPj5iiNEXBV85v7UkbZnm6ioZZdMb8y0Gj_HXzwNtRj3xIOWSGd0klUMgLxlTb0Dh6CIWipCeFunf13vNXr8X9hAZuBWyzvx2ddxHR6wljYs3A2zS6RkIok43W9QiRDhAZRZpy4FXZeOwo1DtymPDWYZpLhTJL7w5-rw"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
}
