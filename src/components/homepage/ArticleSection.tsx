import React from "react";
import { ChevronRight } from "lucide-react";
import type { Article } from "../../types";

interface ArticlesSectionProps {
  articles: Article[];
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
  // const formatDate = (dateString: string): string => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Recent Open Projects
            </h2>
            <p className="text-gray-600">
              Stay updated with the latest trends and insights
            </p>
          </div>
          <button
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors"
            onClick={() => (window.location.href = "/projects")}
          >
            All Projects <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl duration-300 overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all"
              onClick={() => (window.location.href = `/project/${index}`)}
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs text-[#584DFF] font-medium bg-blue-50 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-[#584DFF] transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm">{article.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
