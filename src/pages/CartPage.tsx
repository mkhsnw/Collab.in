import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrashIcon,
  ShoppingCartIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Header } from "../components/common";
import type { Course, User } from "../types";
import { getCurrentUser } from "../data/dashboardData";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    const storedCartItems: Course[] = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    setCartItems(storedCartItems);
  }, []);

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + parseFloat(item.price.replace("$", "")),
      0
    );
  }, [cartItems]);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header currentUser={currentUser} />
        <div
          className="flex items-center justify-center"
          style={{ minHeight: "calc(100vh - 64px)" }}
        >
          <div className="text-center">
            <ShoppingCartIcon className="w-20 h-20 mx-auto text-gray-300" />
            <h1 className="text-3xl font-bold text-gray-800 mt-6">
              Your Cart is Empty
            </h1>
            <p className="text-gray-500 mt-2">
              Looks like you haven't added any courses yet.
            </p>
            <Link
              to="/courses"
              className="mt-8 inline-flex items-center bg-[#584DFF] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-opacity-90 transition"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header currentUser={currentUser} />
      <main className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold mb-2">
              Items ({cartItems.length})
            </h2>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start gap-4 border-b pb-4 last:border-b-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full sm:w-32 h-20 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">By: {item.instructor}</p>
                </div>
                <div className="flex-shrink-0 text-left sm:text-right">
                  <p className="font-bold text-lg text-[#584DFF]">
                    {item.price}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center mt-1"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <aside className="lg:col-span-1 sticky top-24">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg text-gray-800">
                    <span>Total</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full mt-6 block text-center bg-[#584DFF] text-white font-bold py-3 px-5 rounded-lg hover:bg-opacity-90 transition-all duration-200"
              >
                Proceed to Checkout
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
