export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary">travel_explore</span>
        <h1 className="text-xl font-bold tracking-tight text-primary font-h2">
          TripFlow
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center space-x-6">
          {['Plan', 'Explore', 'Trips'].map((item, i) => (
            <a
              key={item}
              href="#"
              className={`font-button text-body-sm transition-colors ${
                i === 0 ? 'text-primary' : 'text-outline hover:text-primary'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden border border-primary-container/20">
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
