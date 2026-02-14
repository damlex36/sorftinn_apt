"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  CalendarDays,
  Users,
  BedDouble,
  Clock,
  AlertCircle,
  Loader2,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Trash2,
  LucideIcon,           // ← added this import
} from "lucide-react";

/* =========================
   TYPES
========================= */
type KPI = {
  total_bookings: number;
  active_guests: number;
  available_rooms: number;
  pending_confirmations: number;
};

type Booking = {
  id: number;
  guest: string;
  room: string;
  check_in: string;
  check_out: string;
  status: string;
};

type Customer = {
  name: string;
  email: string;
  phone: string;
  lastBooking: string | null;
};

type DashboardData = {
  kpi: KPI;
  recent_bookings: Booking[];
  recent_customers: Customer[];
};

/* =========================
   HELPERS
========================= */
const getStatusBadge = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("confirmed") || s.includes("checked in")) {
    return {
      bg: "bg-emerald-100 dark:bg-emerald-950/40",
      text: "text-emerald-800 dark:text-emerald-300",
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    };
  }
  if (s.includes("pending")) {
    return {
      bg: "bg-amber-100 dark:bg-amber-950/40",
      text: "text-amber-800 dark:text-amber-300",
      icon: <Clock className="h-3.5 w-3.5" />,
    };
  }
  if (s.includes("cancelled") || s.includes("rejected")) {
    return {
      bg: "bg-red-100 dark:bg-red-950/40",
      text: "text-red-800 dark:text-red-300",
      icon: <XCircle className="h-3.5 w-3.5" />,
    };
  }
  return {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-800 dark:text-gray-300",
    icon: null,
  };
};

/* =========================
   KPI CARD
========================= */
function KpiCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold mt-1.5">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */
export default function StaffDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setError(null);
      const res = await api.get<DashboardData>("/api/bookings/dashboard/");
      setData(res.data);
    } catch (err: unknown) {
      console.error("Dashboard fetch failed:", err);
      const msg =
        err instanceof Error ? err.message : "Failed to load dashboard data";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    if (
      newStatus === "cancelled" &&
      !confirm("Are you sure you want to cancel this booking?")
    ) {
      return;
    }

    try {
      await api.patch(`/api/bookings/${id}/manage/`, { status: newStatus });
      await fetchDashboard(); // refresh
    } catch (err: unknown) {
      console.error("Status update failed:", err);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this booking permanently?")) return;

    try {
      await api.delete(`/api/bookings/${id}/manage/`);
      await fetchDashboard();
    } catch (err: unknown) {
      console.error("Delete failed:", err);
      alert("Failed to delete booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center border border-red-100 dark:border-red-900/30">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
            Oops!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{error}</p>
          <button
            onClick={fetchDashboard}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { kpi, recent_bookings, recent_customers } = data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10 lg:space-y-14">

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Hotel Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}{" "}
              • Ibadan, Nigeria
            </p>
          </div>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          <KpiCard
            title="Total Bookings"
            value={kpi.total_bookings}
            icon={CalendarDays}
            color="bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300"
          />
          <KpiCard
            title="Active Guests"
            value={kpi.active_guests}
            icon={Users}
            color="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
          />
          <KpiCard
            title="Available Rooms"
            value={kpi.available_rooms}
            icon={BedDouble}
            color="bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300"
          />
          <KpiCard
            title="Pending"
            value={kpi.pending_confirmations}
            icon={Clock}
            color="bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300"
          />
        </div>

        {/* Recent Bookings */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50/70 dark:bg-gray-800/40">
            <h2 className="text-xl lg:text-2xl font-semibold">Recent Bookings</h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-medium">
              View all <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {recent_bookings.length === 0 ? (
            <p className="p-12 text-center text-gray-500 dark:text-gray-400">
              No recent bookings found
            </p>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {recent_bookings.map((b) => {
                const badge = getStatusBadge(b.status);
                return (
                  <div
                    key={b.id}
                    className="px-6 py-5 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {b.guest}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                        {b.room}
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {b.check_in} → {b.check_out}
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full ${badge.bg} ${badge.text}`}
                      >
                        {badge.icon}
                        {b.status}
                      </span>

                      {b.status.toLowerCase().includes("pending") && (
                        <button
                          onClick={() => handleStatusChange(b.id, "confirmed")}
                          className="px-3 py-1.5 text-xs font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition shadow-sm"
                        >
                          Confirm
                        </button>
                      )}

                      {!b.status.toLowerCase().includes("cancelled") && (
                        <button
                          onClick={() => handleStatusChange(b.id, "cancelled")}
                          className="px-3 py-1.5 text-xs font-medium bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition shadow-sm"
                        >
                          Cancel
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(b.id)}
                        className="px-3 py-1.5 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition shadow-sm"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Recent Customers */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50/70 dark:bg-gray-800/40">
            <h2 className="text-xl lg:text-2xl font-semibold">Recent Customers</h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-medium">
              View all <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {recent_customers.length === 0 ? (
            <p className="p-12 text-center text-gray-500 dark:text-gray-400">
              No recent customers found
            </p>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {recent_customers.map((c) => (
                <div
                  key={c.email}
                  className="px-6 py-5 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {c.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {c.email}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Phone: {c.phone} • Last: {c.lastBooking ?? "—"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}