'use client';


export default function Page() {
  const articles = [
    {
      id: 1,
      title:
        "Flagship Phone Showdown: iPhone vs Samsung vs Google Pixel",
      description:
        "Comparing the latest flagship smartphones from Apple, Samsung, and Google to see which one comes out on top.",
      author: "Emma Jh",
      date: "Jan 28",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title:
        "Samsung Galaxy S24 Ultra: First Impressions & Hands-On Review",
      description:
        "A detailed hands-on review of Samsung’s newest flagship smartphone with camera and AI upgrades.",
      author: "John Deo",
      date: "Feb 02",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop",
    },
     {
      id: 3,
      title:
        "Samsung Galaxy S24 Ultra: First Impressions & Hands-On Review",
      description:
        "A detailed hands-on review of Samsung’s newest flagship smartphone with camera and AI upgrades.",
      author: "John Deo",
      date: "Feb 02",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop",
    },
  ];


  return (
    <div className="min-h-screen bg-[#f5f5f5] py-6">
      <div className="max-w-6xl mx-auto px-4">
        
     


        {/* Article Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
  {articles.map((article) => (
    <div
      key={article.id}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-[120px] md:h-[240px] object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-3">
        <h2 className="text-[20px] md:text-[28px] leading-tight font-bold text-gray-900 mb-3">
          {article.title}
        </h2>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed ">
          {article.description}
        </p>

        {/* Author */}
        {/* <div className="flex items-center gap-3 text-gray-500 text-sm">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
            {article.author.charAt(0)}
          </div>

          <span>{article.author}</span>

          <span>•</span>

          <span>{article.date}</span>
        </div> */}
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
}
