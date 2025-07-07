import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LockClosedIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { Header } from "../components/common";
import type { Course, User } from "../types";
import { getCurrentUser } from "../data/dashboardData";

const VisaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="24"
    viewBox="0 0 38 24"
    role="img"
  >
    <path
      fill="#1a1f71"
      d="M28.8 10.1c-.1-.3-.3-.5-.5-.7-.2-.2-.5-.3-.8-.5-.3-.2-.6-.3-1-.4-.4-.1-.7-.2-1.1-.2h-3c-.1 0-.2.1-.2.2l-2.1 8.4c0 .1 0 .2.1.3.1.1.2.1.3.1h2.3c.1 0 .2-.1.2-.2l.4-1.9c.1-.2.2-.4.3-.6.1-.2.2-.4.2-.6.1-.2.2-.3.3-.4.1-.1.2-.2.3-.2h.1c.1 0 .2.1.2.2l.4 1.9c.1.2.2.3.2.4h2.3c.2 0 .3-.1.3-.3l1.4-5.4c.1-.2.1-.4 0-.6zm-5.5 2.5c.1-.4.2-.7.3-1.1.1-.3.2-.6.3-.8.1-.2.2-.4.2-.5 0 0 0-.1.1-.1h.2c.1.2.2.4.3.6l.3 1.1.2 1.1h-2zm11.2-5.4c-.3-.1-.6 0-.8.3l-2.1 4.7-1.2-3.1c-.1-.4-.4-.6-.8-.6h-2.3c-.3 0-.5.2-.5.5v5.6c0 .3.2.5.5.5h2.3c.3 0 .5-.2.5-.5v-3.1l2.1 4.7c.1.3.4.4.7.4h1.5c.5 0 .8-.4.6-.9l-2.1-4.7 1.7-3.8c.2-.3.1-.7-.2-.8zM5.2 7.2h2.3c.3 0 .5.2.5.5v5.6c0 .3-.2.5-.5.5H5.2c-.3 0-.5-.2-.5-.5V7.7c0-.3.2-.5.5-.5zm6.6 0h2.3c.3 0 .5.2.5.5v5.6c0 .3-.2.5-.5.5h-2.3c-.3 0-.5-.2-.5-.5V7.7c0-.3.2-.5.5-.5zm14.6.4c-.1-.3-.3-.5-.5-.7-.2-.2-.5-.3-.8-.5-.3-.2-.6-.3-1-.4-.4-.1-.7-.2-1.1-.2h-3c-.1 0-.2.1-.2.2l-2.1 8.4c0 .1 0 .2.1.3.1.1.2.1.3.1h2.3c.1 0 .2-.1.2-.2l.4-1.9c.1-.2.2-.4.3-.6.1-.2.2-.4.2-.6.1-.2.2-.3.3-.4.1-.1.2-.2.3-.2h.1c.1 0 .2.1.2.2l.4 1.9c.1.2.2.3.2.4h2.3c.2 0 .3-.1.3-.3l1.4-5.4c.1-.2.1-.4 0-.6zm-5.5 2.5c.1-.4.2-.7.3-1.1.1-.3.2-.6.3-.8.1-.2.2-.4.2-.5 0 0 0-.1.1-.1h.2c.1.2.2.4.3.6l.3 1.1.2 1.1h-2z"
    />
  </svg>
);

const MastercardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="24"
    viewBox="0 0 38 24"
    role="img"
  >
    <circle fill="#EB001B" cx="15" cy="12" r="7" />
    <circle fill="#F79E1B" cx="23" cy="12" r="7" />
    <path
      d="M22 12c0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7 7-3.1 7-7z"
      fill="#FF5F00"
    />
  </svg>
);

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("credit_card");
  const [selectedVirtualAccount, setSelectedVirtualAccount] = useState("bca");

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    const storedCartItems: Course[] = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    setCartItems(storedCartItems);
    const subtotal = storedCartItems.reduce(
      (acc, item) => acc + parseFloat(item.price.replace("$", "")),
      0
    );
    setTotal(subtotal);
  }, []);

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("en-HOSSDDG", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount); // Convert USD to IDR approximation

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    const enrolledCourses: number[] = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]"
    );
    const newCourseIds = cartItems.map((item) => item.id);
    const updatedEnrolledCourses = [
      ...new Set([...enrolledCourses, ...newCourseIds]),
    ];
    localStorage.setItem(
      "enrolledCourses",
      JSON.stringify(updatedEnrolledCourses)
    );
    localStorage.removeItem("cartItems");

    alert("Checkout successful! You are now enrolled in the new courses.");
    navigate("/dashboard");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header currentUser={currentUser} />
      <main className="container mx-auto px-4 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2 flex items-center justify-center">
            <LockClosedIcon className="w-4 h-4 mr-2 text-green-600" /> Secure &
            Encrypted Transaction
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <form onSubmit={handleCheckout} className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Billing Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#584DFF]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#584DFF]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
                <div className="space-y-4">
                  {/* Credit/Debit Card */}
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                        checked={selectedPaymentMethod === "credit_card"}
                        onChange={() => setSelectedPaymentMethod("credit_card")}
                        className="form-radio text-[#584DFF] mr-3"
                      />
                      <span className="font-medium text-gray-900">
                        Credit/Debit Card
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <VisaIcon />
                      <MastercardIcon />
                    </div>
                  </label>

                  {/* Virtual Account */}
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="virtual_account"
                        checked={selectedPaymentMethod === "virtual_account"}
                        onChange={() =>
                          setSelectedPaymentMethod("virtual_account")
                        }
                        className="form-radio text-[#584DFF] mr-3"
                      />
                      <span className="font-medium text-gray-900">
                        Virtual Account
                      </span>
                    </div>
                    <BuildingLibraryIcon className="w-6 h-6 text-gray-400" />
                  </label>

                  {/* Virtual Account Options - Only show when Virtual Account is selected */}
                  {selectedPaymentMethod === "virtual_account" && (
                    <div className="ml-8 space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Payment Methods
                      </h3>

                      {/* BCA Virtual Account */}
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                        <input
                          type="radio"
                          name="virtualAccount"
                          value="bca"
                          checked={selectedVirtualAccount === "bca"}
                          onChange={() => setSelectedVirtualAccount("bca")}
                          className="form-radio text-[#584DFF] mr-3"
                        />
                        <span className="font-medium text-gray-900">
                          BCA Virtual Account
                        </span>
                      </label>

                      {/* Mandiri Virtual Account */}
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                        <input
                          type="radio"
                          name="virtualAccount"
                          value="mandiri"
                          checked={selectedVirtualAccount === "mandiri"}
                          onChange={() => setSelectedVirtualAccount("mandiri")}
                          className="form-radio text-[#584DFF] mr-3"
                        />
                        <div className="flex items-center">
                          <img
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkZEQjAwIi8+CjxwYXRoIGQ9Ik0xMiA2TDEzLjA5IDEwLjI2TDE2IDExTDEzLjA5IDEzLjc0TDEyIDE4TDEwLjkxIDEzLjc0TDggMTFMMTAuOTEgMTAuMjZMMTIgNloiIGZpbGw9IiNGRjk4MDAiLz4KPC9zdmc+"
                            alt="Mandiri"
                            className="w-6 h-6 mr-3"
                          />
                          <span className="font-medium text-gray-900">
                            Mandiri Virtual Account
                          </span>
                        </div>
                      </label>

                      {/* BNI Virtual Account */}
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                        <input
                          type="radio"
                          name="virtualAccount"
                          value="bni"
                          checked={selectedVirtualAccount === "bni"}
                          onChange={() => setSelectedVirtualAccount("bni")}
                          className="form-radio text-[#584DFF] mr-3"
                        />
                        <div className="flex items-center">
                          <div className="w-12 h-6 bg-orange-500 rounded text-white text-xs font-bold flex items-center justify-center mr-3">
                            BNI
                          </div>
                          <span className="font-medium text-gray-900">
                            BNI Virtual Account
                          </span>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#584DFF] text-white font-bold py-3.5 px-5 rounded-lg hover:bg-opacity-90 transition-all duration-200 text-lg"
              >
                Pay Now ({formatRupiah(total)})
              </button>
            </form>
          </div>
          <aside className="lg:col-span-1 sticky top-24">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-3 border-b pb-3 last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-semibold line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-sm">{item.price}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg text-gray-800">
                    <span>Total</span>
                    <span>{formatRupiah(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
