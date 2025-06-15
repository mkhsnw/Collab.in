import React, { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail("");

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          {/* Icon */}
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest courses, tips, and exclusive offers delivered
            straight to your inbox. Join thousands of learners already
            subscribed!
          </p>

          {/* Newsletter Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-lg bg-white/90 backdrop-blur-sm border-0 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white transition-all duration-200 placeholder-gray-600"
                    required
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">
                  Successfully Subscribed!
                </h3>
                <p className="text-green-100 text-sm">
                  Thank you for subscribing. You'll receive our latest updates
                  soon!
                </p>
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">📚</span>
              </div>
              <h4 className="text-white font-semibold mb-2">New Courses</h4>
              <p className="text-blue-100 text-sm">
                Be the first to know about our latest course releases
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">💰</span>
              </div>
              <h4 className="text-white font-semibold mb-2">
                Exclusive Offers
              </h4>
              <p className="text-blue-100 text-sm">
                Get special discounts and early bird pricing
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">💡</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Learning Tips</h4>
              <p className="text-blue-100 text-sm">
                Receive expert tips to enhance your learning journey
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-blue-100 text-sm">
              📧 <strong>10,000+</strong> subscribers • 📊{" "}
              <strong>Weekly</strong> updates • 🔒 <strong>No spam</strong>{" "}
              guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
