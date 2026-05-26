"use client";
import { useState } from "react";
import OrdersTable from "@/components/dashboard/OrdersTable";
import { ORDERS, OrderStatus } from "@/lib/data";
import clsx from "clsx";

type Filter = "all" | OrderStatus;
const FILTERS: { label: string; value: Filter }[] = [
  { label: "All Orders", value: "all" },
  { label: "Delivered", value: "delivered" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered =
    filter === "all" ? ORDERS : ORDERS.filter((o) => o.status === filter);

  return (
    <>
      <div className="page-title">Orders</div>
      <div className="page-sub">Manage and track all your orders</div>

      {/* Summary stats */}
      <div className="orders-summary">
        <div className="mini-stat">
          <div className="mini-stat-label">Total Orders</div>
          <div className="mini-stat-value">4,821</div>
          <div className="mini-stat-sub stat-change up">↑ +8.2% this month</div>
        </div>
        <div className="mini-stat">
          <div className="mini-stat-label">Delivered</div>
          <div className="mini-stat-value">3,240</div>
          <div
            className="mini-stat-sub"
            style={{ fontSize: 11, color: "var(--text2)" }}>
            67.2% of total
          </div>
        </div>
        <div className="mini-stat">
          <div className="mini-stat-label">Pending</div>
          <div className="mini-stat-value">892</div>
          <div
            className="mini-stat-sub"
            style={{ fontSize: 11, color: "var(--amber)" }}>
            ↑ 18.5% awaiting
          </div>
        </div>
        <div className="mini-stat">
          <div className="mini-stat-label">Cancelled</div>
          <div className="mini-stat-value">141</div>
          <div className="mini-stat-sub stat-change down">
            ↓ -2.1% this month
          </div>
        </div>
      </div>

      {/* Table with filters */}
      <div className="orders-card">
        <div className="card-header">
          <div className="filter-tabs">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={clsx("filter-tab", filter === f.value && "active")}
                onClick={() => setFilter(f.value)}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="table-actions">
            <button className="btn-sm">
              <i className="ti ti-download" style={{ fontSize: 14 }} /> Export
            </button>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <OrdersTable orders={filtered} showCustomer />
        </div>
      </div>
    </>
  );
}
