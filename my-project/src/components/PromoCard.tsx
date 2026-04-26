export function PromoCard() {
  return (
    <div className="relative overflow-hidden rounded-lg md:rounded-xl h-40 sm:h-48 lg:h-56 group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7qXqw-X_vNKOrrRcziUy0FvnCz6tZhIIFZf5bPjXWWD4pUMg4dlhNu1qMB5N0QSNTPhgSYQ3CfbLkMuIw1frE0d-jn79cA0V1qBClrnZR9_kzUmhbWCiUvy87pUVBVLMogJcuQO_O5YmkBrb5YG8olfnRUWA_G9qrzWnlOI3WTk9LG8hPG0mAJodPKejyK08msWsKChiP_Paq9Dy8NY8cLbFaUxArXxYHHIKaWXNxyiO1ten9GfEKyQj8RpNhofqkSG9X6engoCQ"
        alt="Scenic alpine lake"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-linear-to-t from-nature-brown-900 via-nature-brown-800/70 to-transparent p-3 sm:p-4 md:p-6 flex flex-col justify-end">
        <span className="text-nature-green-300 text-xs md:text-sm font-label-caps mb-1 md:mb-2">
          🌿 Travel Insight
        </span>
        <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-tight">
          Explore the Alps this Autumn
        </h3>
      </div>
    </div>
  );
}
