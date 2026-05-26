// ─── Types ────────────────────────────────────────────────────────────────────

export type Page =
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

export const CHART_LABELS = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const REVENUE = [8200, 9400, 11800, 10200, 13500, 14800, 18900];
export const ORDERS_DATA = [5100, 6800, 8200, 7400, 9800, 11200, 15600];

export const TOP_PRODUCTS = [
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

export const ORDERS = [
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

export const CUSTOMERS = [
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

export const PRODUCTS_LIST = [
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

export const SHIPMENTS = [
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

export const NAV_MAIN: { id: Page; icon: string; label: string }[] = [
  { id: "overview", icon: "ti-layout-dashboard", label: "Overview" },
  { id: "products", icon: "ti-box", label: "Products" },
  { id: "customer", icon: "ti-users", label: "Customer" },
  { id: "orders", icon: "ti-shopping-bag", label: "Orders" },
  { id: "shipment", icon: "ti-truck", label: "Shipment" },
];

export const NAV_SETTINGS: { id: Page; icon: string; label: string }[] = [
  { id: "store", icon: "ti-settings", label: "Store Setting" },
  { id: "partner", icon: "ti-affiliate", label: "Platform Partner" },
  { id: "feedback", icon: "ti-message-circle", label: "Feedback" },
  { id: "help", icon: "ti-help-circle", label: "Help & Support" },
];

export const NAV_ROUTES: Record<Page, string> = {
  overview: "/dashboard",
  products: "/dashboard/products",
  customer: "/dashboard/customer",
  orders: "/dashboard/orders",
  shipment: "/dashboard/shipment",
  store: "/dashboard/store",
  partner: "/dashboard/partner",
  feedback: "/dashboard/feedback",
  help: "/dashboard/help",
};
