'use client';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Poojabookingpage() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Dummy data for article listing with added date and image for news-like feel
    const dummyArticles = [
      { id: 1, title: "Article One", summary: "This is the summary of article one.", date: "2023-10-01", image: "https://www.nytimes.com/wirecutter/reviews/best-android-phone/" },
      { id: 2, title: "Article Two", summary: "This is the summary of article two.", date: "2023-10-02", image: "https://www.nytimes.com/wirecutter/reviews/best-android-phone/" },
      { id: 3, title: "Article Three", summary: "This is the summary of article three.", date: "2023-10-03", image: "https://www.nytimes.com/wirecutter/reviews/best-android-phone/" },
      { id: 4, title: "Article Four", summary: "This is the summary of article four.", date: "2023-10-04", image: "https://www.nytimes.com/wirecutter/reviews/best-android-phone/" },
    ];
    setArticles(dummyArticles);
  }, []);

  // Array of height classes for varying card sizes
  const cardHeights = ['h-64', 'h-80', 'h-48', 'h-72'];

  return (
    <div className="bg-[#FFEEE2] min-h-screen pb-10">
      <div className="font-sans pt-10 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4">
       
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <div key={article.id} className={`bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow ${cardHeights[article.id % cardHeights.length]} flex flex-col justify-between overflow-hidden`}>
                <img src={article.image} alt={article.title} className="w-full h-32 object-cover rounded-t-lg" />
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.summary}</p>
                  </div>
                  <div className="text-sm text-gray-500">{article.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
