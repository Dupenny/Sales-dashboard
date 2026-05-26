"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
);

// ─── Types ────────────────────────────────────────────────────────────────────

type Page =
  | "overview"
  | "products"
  | "customer"
  | "orders"
  | "shipment"
  | "store"
  | "partner"
  | "feedback"
  | "help";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHART_LABELS = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const REVENUE = [8200, 9400, 11800, 10200, 13500, 14800, 18900];
const ORDERS_DATA = [5100, 6800, 8200, 7400, 9800, 11200, 15600];

const TOP_PRODUCTS = [
  {
    name: "New Balance FuelCell Men's Running Shoes",
    sales: "12,429 Sales",
    stock: "132 stocks remaining",
    available: true,
    img: "/rednike.webp",
  },
  {
    name: "Jaket Utilitas (Denim)",
    sales: "11,021 Sales",
    stock: "92 stocks remaining",
    available: true,
    img: "/denim.avif",
  },
  {
    name: "605's Black Shirt Limited Edition",
    sales: "10,321 Sales",
    stock: "72 stocks remaining",
    available: true,
    img: "/black.avif",
  },
];

const ORDERS = [
  {
    id: "#A38829KL",
    product: "Nike Sportwear",
    date: "Jan 12, 12:23 pm",
    price: "$189.00",
    payment: "Transfer",
    status: "Delivered",
  },
  {
    id: "#A73289JH",
    product: "New Balance Sneakers",
    date: "Jan 12, 08:39 am",
    price: "$210.00",
    payment: "Credit Card",
    status: "Completed",
  },
  {
    id: "#B12034PQ",
    product: "Adidas Ultraboost",
    date: "Jan 11, 03:14 pm",
    price: "$160.00",
    payment: "Transfer",
    status: "Pending",
  },
  {
    id: "#C98271MN",
    product: "Puma RS-X Sneakers",
    date: "Jan 11, 10:05 am",
    price: "$95.00",
    payment: "Credit Card",
    status: "Delivered",
  },
  {
    id: "#D45512XZ",
    product: "Jordan Air Max 1",
    date: "Jan 10, 07:50 pm",
    price: "$230.00",
    payment: "Transfer",
    status: "Cancelled",
  },
];

const CUSTOMERS = [
  {
    name: "Amara Osei",
    email: "amara@example.com",
    orders: 12,
    spent: "$1,024",
    joined: "Jan 2024",
    status: "Active",
  },
  {
    name: "Chidi Eze",
    email: "chidi@example.com",
    orders: 7,
    spent: "$680",
    joined: "Mar 2024",
    status: "Active",
  },
  {
    name: "Fatima Bello",
    email: "fatima@example.com",
    orders: 3,
    spent: "$135",
    joined: "Apr 2024",
    status: "Inactive",
  },
  {
    name: "Kofi Mensah",
    email: "kofi@example.com",
    orders: 9,
    spent: "$820",
    joined: "Feb 2024",
    status: "Active",
  },
  {
    name: "Ngozi Adeyemi",
    email: "ngozi@example.com",
    orders: 5,
    spent: "$310",
    joined: "May 2024",
    status: "Active",
  },
  {
    name: "Emeka Nwosu",
    email: "emeka@example.com",
    orders: 2,
    spent: "$90",
    joined: "May 2024",
    status: "Inactive",
  },
];

const PRODUCTS_LIST = [
  {
    name: "Wireless Earbuds",
    sku: "SKU-001",
    category: "Audio",
    price: "$89.99",
    stock: 142,
    status: "In Stock",
  },
  {
    name: "Smart Watch",
    sku: "SKU-002",
    category: "Wearables",
    price: "$199.00",
    stock: 58,
    status: "In Stock",
  },
  {
    name: "Laptop Stand",
    sku: "SKU-003",
    category: "Accessories",
    price: "$45.00",
    stock: 0,
    status: "Out of Stock",
  },
  {
    name: "USB-C Hub",
    sku: "SKU-004",
    category: "Accessories",
    price: "$62.50",
    stock: 23,
    status: "Low Stock",
  },
  {
    name: "Phone Case",
    sku: "SKU-005",
    category: "Accessories",
    price: "$24.99",
    stock: 310,
    status: "In Stock",
  },
  {
    name: "Bluetooth Speaker",
    sku: "SKU-006",
    category: "Audio",
    price: "$119.00",
    stock: 76,
    status: "In Stock",
  },
];

const SHIPMENTS = [
  {
    id: "#SHP-001",
    order: "#ORD-001",
    carrier: "DHL",
    tracking: "1Z999AA10123456784",
    status: "Delivered",
    eta: "May 22",
  },
  {
    id: "#SHP-002",
    order: "#ORD-002",
    carrier: "FedEx",
    tracking: "7489234895",
    status: "In Transit",
    eta: "May 27",
  },
  {
    id: "#SHP-003",
    order: "#ORD-003",
    carrier: "UPS",
    tracking: "1Z9999999999999999",
    status: "In Transit",
    eta: "May 28",
  },
  {
    id: "#SHP-004",
    order: "#ORD-004",
    carrier: "DHL",
    tracking: "1Z111AA10123456780",
    status: "Cancelled",
    eta: "—",
  },
  {
    id: "#SHP-005",
    order: "#ORD-005",
    carrier: "FedEx",
    tracking: "3489234896",
    status: "Delivered",
    eta: "May 24",
  },
  {
    id: "#SHP-006",
    order: "#ORD-006",
    carrier: "Aramex",
    tracking: "ARX-998877",
    status: "Pending",
    eta: "May 30",
  },
];

const NAV_MAIN: { id: Page; icon: string; label: string }[] = [
  { id: "overview", icon: "ti-layout-dashboard", label: "Overview" },
  { id: "products", icon: "ti-box", label: "Products" },
  { id: "customer", icon: "ti-users", label: "Customer" },
  { id: "orders", icon: "ti-shopping-bag", label: "Orders" },
  { id: "shipment", icon: "ti-truck", label: "Shipment" },
];

const NAV_SETTINGS: { id: Page; icon: string; label: string }[] = [
  { id: "store", icon: "ti-settings", label: "Store Setting" },
  { id: "partner", icon: "ti-affiliate", label: "Platform Partner" },
  { id: "feedback", icon: "ti-message-circle", label: "Feedback" },
  { id: "help", icon: "ti-help-circle", label: "Help & Support" },
];

const PAGE_META: Record<Page, { title: string; subtitle: string }> = {
  overview: {
    title: "Overview",
    subtitle: "Here's your current sales overview",
  },
  products: { title: "Products", subtitle: "Manage your product catalogue" },
  customer: {
    title: "Customers",
    subtitle: "View and manage your customer base",
  },
  orders: { title: "Orders", subtitle: "Track and manage all customer orders" },
  shipment: {
    title: "Shipments",
    subtitle: "Monitor delivery status and tracking",
  },
  store: {
    title: "Store Settings",
    subtitle: "Configure your store preferences and details",
  },
  partner: {
    title: "Platform Partner",
    subtitle: "Manage partner integrations and affiliate links",
  },
  feedback: {
    title: "Feedback",
    subtitle: "Review customer feedback and product reviews",
  },
  help: {
    title: "Help & Support",
    subtitle: "Browse documentation or contact our support team",
  },
};

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="topbar">
      <button
        className="menu-toggle"
        onClick={onMenuClick}
        aria-label="Toggle menu">
        <i className="ti ti-menu-2" />
      </button>

      <div className={clsx("search-wrap", searchFocused && "focused")}>
        <i className="ti ti-search" />
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <span className="kbd">⌘K</span>
      </div>

      <div className="header-spacer" />

      <div className="topbar-right">
        <div className="notif-btn">
          <i className="ti ti-bell" style={{ fontSize: 18 }} />
          <div className="notif-dot" />
        </div>
        <div className="user-pill">
          <img
            className="user-avatar-img"
            src="https://i.pravatar.cc/40?img=11"
            alt="Abosede's Jewel"
          />
          <div>
            <div className="user-name">Abosede's Jewel</div>
            <div className="user-email">ajewel77@gmail.com</div>
          </div>
          <i className="ti ti-chevron-down" style={{ fontSize: 14 }} />
        </div>
      </div>
    </header>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({
  open,
  onClose,
  activePage,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  activePage: Page;
  onNavigate: (page: Page) => void;
}) {
  function handleNav(page: Page) {
    onNavigate(page);
    onClose();
  }

  return (
    <>
      <div className={clsx("overlay", open && "open")} onClick={onClose} />
      <nav className={clsx("sidebar", open && "open")}>
        <div className="sidebar-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <rect x="3" y="3" width="9" height="9" rx="2.5" fill="white" />
              <rect x="13" y="3" width="8" height="8" rx="2" fill="white" />
              <rect x="3" y="13" width="8" height="8" rx="2" fill="white" />
              <rect x="13" y="13" width="8" height="8" rx="2" fill="#a78bfa" />
            </svg>
          </div>
          <span className="logo-text">Abosede's Jewel</span>
        </div>

        {NAV_MAIN.map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => handleNav(id)}
            className={clsx("nav-item", activePage === id && "active")}>
            <i className={`ti ${icon}`} />
            <span>{label}</span>
          </button>
        ))}

        <div className="sidebar-divider" />

        {NAV_SETTINGS.map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => handleNav(id)}
            className={clsx("nav-item", activePage === id && "active")}>
            <i className={`ti ${icon}`} />
            <span>{label}</span>
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">
              <i
                className="ti ti-sparkles"
                style={{ color: "#fff", fontSize: 20 }}
              />
            </div>
            <div className="upgrade-title">Upgrade Pro</div>
            <div className="upgrade-desc">
              Discover new features to detailed report and analysis
            </div>
            <button className="upgrade-btn">Upgrade Now</button>
          </div>
        </div>
      </nav>
    </>
  );
}

// ─── SalesChart ───────────────────────────────────────────────────────────────

function SalesChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: CHART_LABELS,
        datasets: [
          {
            label: "Revenue",
            data: REVENUE,
            borderColor: "#5b5bd6",
            backgroundColor: "rgba(91,91,214,0.10)",
            fill: true,
            tension: 0.45,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#5b5bd6",
            borderWidth: 2,
          },
          {
            label: "Order",
            data: ORDERS_DATA,
            borderColor: "#93c5fd",
            backgroundColor: "rgba(147,197,253,0.10)",
            fill: true,
            tension: 0.45,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#93c5fd",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1a1a1a",
            titleColor: "#888",
            bodyColor: "#fff",
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              title: (items) => `Average\n· ${items[0].label} 2023`,
              label: (ctx) =>
                `· ${ctx.label} 2023   $${Number(ctx.raw).toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#9e9e9a", font: { size: 11 } },
          },
          y: {
            grid: { color: "rgba(0,0,0,.05)" },
            ticks: {
              color: "#9e9e9a",
              font: { size: 11 },
              callback: (v) => {
                const num = Number(v);
                if (isNaN(num)) return "$0K";
                return `$${(num / 1000).toFixed(0)}K`;
              },
            },
            border: { display: false },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="chart-card">
      <div className="card-header">
        <span className="card-title">Sales Overtime</span>
        <div className="card-actions">
          <span className="legend-label">
            <span className="legend-dot" style={{ background: "#5b5bd6" }} />
            Revenue
          </span>
          <span className="legend-label">
            <span className="legend-dot" style={{ background: "#93c5fd" }} />
            Order
          </span>
          <button className="more-btn">
            <i className="ti ti-dots" />
          </button>
        </div>
      </div>
      <div className="chart-area">
        <canvas ref={canvasRef} role="img" aria-label="Sales chart" />
      </div>
    </div>
  );
}

// ─── Page sections ────────────────────────────────────────────────────────────

function OverviewSection() {
  return (
    <>
      {/* Page heading inside content area */}
      <div className="ov-heading">
        <h1 className="ov-title">Welcome back, Blessing!</h1>
        <p className="ov-sub">Here&apos;s you current sales overview</p>
      </div>

      {/* Stat cards */}
      <div className="stats-row">
        <div className="stat-card dark">
          <div className="stat-top">
            <div className="stat-label">Avg. Order Value</div>
            <div className="stat-icon-box dark-icon">
              <i className="ti ti-database" />
            </div>
          </div>
          <div className="stat-value">$72.98</div>
          <div className="stat-change">
            <span className="change-pct up">+3.16%</span> from last month
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-label">Total Orders</div>
            <div className="stat-icon-box">
              <i className="ti ti-receipt" />
            </div>
          </div>
          <div className="stat-value">$2,219</div>
          <div className="stat-change">
            <span className="change-pct up">+1.18%</span> from last month
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-label">Lifetime Value</div>
            <div className="stat-icon-box round">
              <i className="ti ti-coin" />
            </div>
          </div>
          <div className="stat-value">$560</div>
          <div className="stat-change">
            <span className="change-pct up">+2.42%</span> from last month
          </div>
        </div>
      </div>

      {/* Chart + Top Selling Product */}
      <div className="dash-grid">
        <SalesChart />
        <div className="products-card">
          <div className="card-header">
            <span className="card-title">Top Selling Product</span>
            <button className="see-all-btn">See All Product</button>
          </div>
          {TOP_PRODUCTS.map((p) => (
            <div key={p.name} className="product-row">
              <img src={p.img} alt={p.name} className="product-img" />
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-sales">{p.sales}</div>
              </div>
              <div className="product-right">
                <div
                  className={clsx("avail-badge", p.available && "available")}>
                  {p.available ? "+ Available" : "Out of Stock"}
                </div>
                <div className="product-stock">{p.stock}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Orders */}
      <div className="orders-card">
        <div className="card-header">
          <span className="card-title">Latest Orders</span>
          <div className="table-actions">
            <button className="btn-sm">
              <i className="ti ti-adjustments" style={{ fontSize: 13 }} />{" "}
              Customize
            </button>
            <button className="btn-sm">
              <i className="ti ti-filter" style={{ fontSize: 13 }} /> Filter
            </button>
            <button className="btn-sm">
              <i className="ti ti-download" style={{ fontSize: 13 }} /> Export
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Order Date</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id}>
                <td className="order-id">{o.id}</td>
                <td>{o.product}</td>
                <td style={{ color: "#9e9e9a" }}>{o.date}</td>
                <td>{o.price}</td>
                <td>{o.payment}</td>
                <td>
                  <span
                    className={clsx(
                      "status-txt",
                      o.status === "Delivered"
                        ? "delivered"
                        : o.status === "Completed"
                          ? "completed"
                          : o.status === "Pending"
                            ? "pending"
                            : "cancelled",
                    )}>
                    {o.status}
                  </span>
                </td>
                <td>
                  <button className="more-btn">
                    <i className="ti ti-dots" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ProductsSection() {
  return (
    <>
      <div className="ov-heading">
        <h1 className="ov-title">Products</h1>
        <p className="ov-sub">Manage your product catalogue</p>
      </div>
      <div className="orders-card">
        <div className="card-header">
          <span className="card-title">All Products</span>
          <div className="table-actions">
            <button className="btn-sm">
              <i className="ti ti-plus" style={{ fontSize: 13 }} /> Add Product
            </button>
            <button className="btn-sm">
              <i className="ti ti-filter" style={{ fontSize: 13 }} /> Filter
            </button>
            <button className="btn-sm">
              <i className="ti ti-download" style={{ fontSize: 13 }} /> Export
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS_LIST.map((p) => (
              <tr key={p.sku}>
                <td>{p.name}</td>
                <td style={{ color: "#9e9e9a" }}>{p.sku}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <span
                    className={clsx(
                      "status-txt",
                      p.status === "In Stock"
                        ? "delivered"
                        : p.status === "Low Stock"
                          ? "pending"
                          : "cancelled",
                    )}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function CustomerSection() {
  return (
    <>
      <div className="ov-heading">
        <h1 className="ov-title">Customers</h1>
        <p className="ov-sub">View and manage your customer base</p>
      </div>
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-label">Total Customers</div>
            <div className="stat-icon-box">
              <i className="ti ti-users" />
            </div>
          </div>
          <div className="stat-value">6</div>
          <div className="stat-change">
            <span className="change-pct up">+4</span> this month
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-label">Active</div>
            <div className="stat-icon-box">
              <i className="ti ti-user-check" />
            </div>
          </div>
          <div className="stat-value">4</div>
          <div className="stat-change">
            <span className="change-pct up">66.7%</span> of total
          </div>
        </div>
        <div className="stat-card dark">
          <div className="stat-top">
            <div className="stat-label">Inactive</div>
            <div className="stat-icon-box dark-icon">
              <i className="ti ti-user-off" />
            </div>
          </div>
          <div className="stat-value">2</div>
          <div className="stat-change" style={{ color: "#888" }}>
            33.3% of total
          </div>
        </div>
      </div>
      <div className="orders-card">
        <div className="card-header">
          <span className="card-title">All Customers</span>
          <div className="table-actions">
            <button className="btn-sm">
              <i className="ti ti-filter" style={{ fontSize: 13 }} /> Filter
            </button>
            <button className="btn-sm">
              <i className="ti ti-download" style={{ fontSize: 13 }} /> Export
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.email}>
                <td>{c.name}</td>
                <td style={{ color: "#9e9e9a" }}>{c.email}</td>
                <td>{c.orders}</td>
                <td>{c.spent}</td>
                <td>{c.joined}</td>
                <td>
                  <span
                    className={clsx(
                      "status-txt",
                      c.status === "Active" ? "delivered" : "cancelled",
                    )}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function OrdersSection() {
  return (
    <>
      <div className="ov-heading">
        <h1 className="ov-title">Orders</h1>
        <p className="ov-sub">Track and manage all customer orders</p>
      </div>
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-label">Total Orders</div>
            <div className="stat-icon-box">
              <i className="ti ti-shopping-bag" />
            </div>
          </div>
          <div className="stat-value">6</div>
          <div className="stat-change">
            <span className="change-pct up">+1.18%</span> from last month
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-label">Completed</div>
            <div className="stat-icon-box">
              <i className="ti ti-check" />
            </div>
          </div>
          <div className="stat-value">3</div>
          <div className="stat-change">
            <span className="change-pct up">50%</span> completion rate
          </div>
        </div>
        <div className="stat-card dark">
          <div className="stat-top">
            <div className="stat-label">Pending</div>
            <div className="stat-icon-box dark-icon">
              <i className="ti ti-clock" />
            </div>
          </div>
          <div className="stat-value">2</div>
          <div className="stat-change" style={{ color: "#EF9F27" }}>
            Awaiting fulfilment
          </div>
        </div>
      </div>
      <div className="orders-card">
        <div className="card-header">
          <span className="card-title">All Orders</span>
          <div className="table-actions">
            <button className="btn-sm">
              <i className="ti ti-adjustments" style={{ fontSize: 13 }} />{" "}
              Customize
            </button>
            <button className="btn-sm">
              <i className="ti ti-filter" style={{ fontSize: 13 }} /> Filter
            </button>
            <button className="btn-sm">
              <i className="ti ti-download" style={{ fontSize: 13 }} /> Export
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Order Date</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id}>
                <td className="order-id">{o.id}</td>
                <td>{o.product}</td>
                <td style={{ color: "#9e9e9a" }}>{o.date}</td>
                <td>{o.price}</td>
                <td>{o.payment}</td>
                <td>
                  <span
                    className={clsx(
                      "status-txt",
                      o.status === "Delivered"
                        ? "delivered"
                        : o.status === "Completed"
                          ? "completed"
                          : o.status === "Pending"
                            ? "pending"
                            : "cancelled",
                    )}>
                    {o.status}
                  </span>
                </td>
                <td>
                  <button className="more-btn">
                    <i className="ti ti-dots" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ShipmentSection() {
  return (
    <>
      <div className="ov-heading">
        <h1 className="ov-title">Shipments</h1>
        <p className="ov-sub">Monitor delivery status and tracking</p>
      </div>
      <div className="orders-card">
        <div className="card-header">
          <span className="card-title">All Shipments</span>
          <div className="table-actions">
            <button className="btn-sm">
              <i className="ti ti-filter" style={{ fontSize: 13 }} /> Filter
            </button>
            <button className="btn-sm">
              <i className="ti ti-download" style={{ fontSize: 13 }} /> Export
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Order</th>
              <th>Carrier</th>
              <th>Tracking No.</th>
              <th>Status</th>
              <th>ETA</th>
            </tr>
          </thead>
          <tbody>
            {SHIPMENTS.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td style={{ color: "#9e9e9a" }}>{s.order}</td>
                <td>{s.carrier}</td>
                <td style={{ fontFamily: "monospace", fontSize: 12 }}>
                  {s.tracking}
                </td>
                <td>
                  <span
                    className={clsx(
                      "status-txt",
                      s.status === "Delivered"
                        ? "delivered"
                        : s.status === "Pending"
                          ? "pending"
                          : s.status === "In Transit"
                            ? "completed"
                            : "cancelled",
                    )}>
                    {s.status}
                  </span>
                </td>
                <td>{s.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PlaceholderSection({
  title,
  sub,
  icon,
}: {
  title: string;
  sub: string;
  icon: string;
}) {
  return (
    <>
      <div className="ov-heading">
        <h1 className="ov-title">{title}</h1>
        <p className="ov-sub">{sub}</p>
      </div>
      <div className="placeholder-section">
        <div className="placeholder-icon">
          <i className={`ti ${icon}`} />
        </div>
        <div className="placeholder-title">{title}</div>
        <div className="placeholder-sub">{sub}</div>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OverviewPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>("overview");

  function renderSection() {
    switch (activePage) {
      case "overview":
        return <OverviewSection />;
      case "products":
        return <ProductsSection />;
      case "customer":
        return <CustomerSection />;
      case "orders":
        return <OrdersSection />;
      case "shipment":
        return <ShipmentSection />;
      case "store":
        return (
          <PlaceholderSection
            title="Store Settings"
            sub="Configure your store preferences and details."
            icon="ti-settings"
          />
        );
      case "partner":
        return (
          <PlaceholderSection
            title="Platform Partner"
            sub="Manage partner integrations and affiliate links."
            icon="ti-affiliate"
          />
        );
      case "feedback":
        return (
          <PlaceholderSection
            title="Feedback"
            sub="Review customer feedback and product reviews."
            icon="ti-message-circle"
          />
        );
      case "help":
        return (
          <PlaceholderSection
            title="Help & Support"
            sub="Browse documentation or contact our support team."
            icon="ti-help-circle"
          />
        );
    }
  }

  return (
    <div className="shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage={activePage}
        onNavigate={setActivePage}
      />
      <div className="page-wrapper">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="main">{renderSection()}</main>
      </div>
    </div>
  );
}
