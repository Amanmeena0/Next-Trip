export function PromoCard() {
  return (
    <div className="group relative h-44 cursor-pointer overflow-hidden rounded-3xl shadow-soft transition-shadow duration-300 hover:shadow-lift sm:h-52 md:h-64">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7qXqw-X_vNKOrrRcziUy0FvnCz6tZhIIFZf5bPjXWWD4pUMg4dlhNu1qMB5N0QSNTPhgSYQ3CfbLkMuIw1frE0d-jn79cA0V1qBClrnZR9_kzUmhbWCiUvy87pUVBVLMogJcuQO_O5YmkBrb5YG8olfnRUWA_G9qrzWnlOI3WTk9LG8hPG0mAJodPKejyK08msWsKChiP_Paq9Dy8NY8cLbFaUxArXxYHHIKaWXNxyiO1ten9GfEKyQj8RpNhofqkSG9X6engoCQ"
        alt="Scenic alpine lake"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/45 to-transparent p-4 flex flex-col justify-end sm:p-5 md:p-6">
        <h3 className="text-base font-bold leading-tight text-primary-foreground sm:text-lg md:text-2xl">
          Explore the Alps this Autumn
        </h3>
        <p className="mt-2 text-xs text-primary-foreground/80 opacity-90 sm:text-sm">Suggested for your budget</p>
      </div>
    </div>
  );
}
