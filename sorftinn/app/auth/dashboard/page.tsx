// app/dashboard/page.tsx
"use client";

import {
  CalendarCheck,
  Clock,
  DoorOpen,
  Users,
  ChevronRight,
  Search,
} from "lucide-react";

export default function StaffDashboard() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const kpiData = [
    { title: "Total Bookings", value: "124", icon: CalendarCheck, color: "blue" },
    { title: "Active Guests", value: "38", icon: Users, color: "emerald" },
    { title: "Available Rooms", value: "12", icon: DoorOpen, color: "violet" },
    { title: "Pending Confirmations", value: "5", icon: Clock, color: "amber" },
  ];

  const recentBookings = [
    {
      id: 1,
      guest: "John Doe",
      room: "Deluxe Suite",
      dates: "Mar 12 – Mar 15, 2026",
      status: "Pending",
    },
    {
      id: 2,
      guest: "Amina Bello",
      room: "Standard Room",
      dates: "Mar 10 – Mar 11, 2026",
      status: "Confirmed",
    },
    {
      id: 3,
      guest: "Sarah Adebayo",
      room: "Executive Twin",
      dates: "Mar 14 – Mar 18, 2026",
      status: "Pending",
    },
  ];

  const recentCustomers = [
    {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "0801 234 5678",
      lastBooking: "March 2026",
    },
    {
      name: "Amina Bello",
      email: "amina.bello@email.com",
      phone: "0809 876 5432",
      lastBooking: "February 2026",
    },
    {
      name: "Sarah Adebayo",
      email: "sarah.ade@email.com",
      phone: "0812 345 6789",
      lastBooking: "January 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10 lg:space-y-12">

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Sorftinn Hotel Dashboard
            </h1>
            <p className="mt-1.5 text-gray-500 dark:text-gray-400">
              {currentDate} • Ibadan, Nigeria
            </p>
          </div>

          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search guests, bookings, rooms..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
            />
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {kpiData.map((item) => {
            const colorStyles = {
              blue: {
                bg: "bg-blue-50 dark:bg-blue-950/30",
                text: "text-blue-700 dark:text-blue-300",
              },
              emerald: {
                bg: "bg-emerald-50 dark:bg-emerald-950/30",
                text: "text-emerald-700 dark:text-emerald-300",
              },
              violet: {
                bg: "bg-violet-50 dark:bg-violet-950/30",
                text: "text-violet-700 dark:text-violet-300",
              },
              amber: {
                bg: "bg-amber-50 dark:bg-amber-950/30",
                text: "text-amber-700 dark:text-amber-300",
              },
            };

            const style = colorStyles[item.color as keyof typeof colorStyles];

            return (
              <div
                key={item.title}
                className={`rounded-xl border border-gray-100 dark:border-gray-800 ${style.bg} p-5 sm:p-6 shadow-sm hover:shadow transition-shadow duration-200`}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>
                  <item.icon className={`h-5 w-5 ${style.text}`} />
                </div>
                <p className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Two-column layout for tables */}
        <div className="grid lg:grid-cols-2 gap-6 xl:gap-8">

          {/* Recent Bookings */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Bookings</h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-medium">
                View all <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                <thead className="bg-gray-50/80 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                        {booking.guest}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                        {booking.room}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                        {booking.dates}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-4">
                        <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium">
                          Confirm
                        </button>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                          Edit
                        </button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Customers */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Customers</h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-medium">
                View all <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                <thead className="bg-gray-50/80 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Last Booking
                    </th>
                    <th className="px-6 py-3.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {recentCustomers.map((customer) => (
                    <tr
                      key={customer.email}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                        {customer.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                        {customer.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                        {customer.lastBooking}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}