export function PromoCard() {
  return (
    <div className="relative overflow-hidden rounded-xl h-48 group cursor-pointer">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7qXqw-X_vNKOrrRcziUy0FvnCz6tZhIIFZf5bPjXWWD4pUMg4dlhNu1qMB5N0QSNTPhgSYQ3CfbLkMuIw1frE0d-jn79cA0V1qBClrnZR9_kzUmhbWCiUvy87pUVBVLMogJcuQO_O5YmkBrb5YG8olfnRUWA_G9qrzWnlOI3WTk9LG8hPG0mAJodPKejyK08msWsKChiP_Paq9Dy8NY8cLbFaUxArXxYHHIKaWXNxyiO1ten9GfEKyQj8RpNhofqkSG9X6engoCQ"
        alt="Scenic alpine lake"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t-black p-6 flex flex-col justify-end">
        <span className="text-blue-300 text-xs font-label-caps mb-1">
          Travel Insight
        </span>
        <h3 className="text-white text-h3 font-h3 leading-tight">
          Explore the Alps this Autumn
        </h3>
      </div>
    </div>
  );
}
