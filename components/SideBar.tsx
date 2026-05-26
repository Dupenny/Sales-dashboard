"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV_MAIN = [
  { href: "/", icon: "ti-layout-dashboard", label: "Overview" },
  { href: "/products", icon: "ti-box", label: "Products" },
  { href: "/customer", icon: "ti-users", label: "Customer" },
  { href: "/orders", icon: "ti-shopping-bag", label: "Orders" },
  { href: "/shipment", icon: "ti-truck", label: "Shipment" },
];
const NAV_SETTINGS = [
  { href: "/store", icon: "ti-settings", label: "Store Setting" },
  { href: "/partner", icon: "ti-affiliate", label: "Platform Partner" },
  { href: "/feedback", icon: "ti-message-circle", label: "Feedback" },
  { href: "/help", icon: "ti-help-circle", label: "Help & Support" },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className={clsx("overlay", open && "open")} onClick={onClose} />
      <nav className={clsx("sidebar", open && "open")}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <rect x="3" y="3" width="8" height="8" rx="2" fill="#0e0e0e" />
              <rect x="13" y="3" width="8" height="8" rx="2" fill="#0e0e0e" />
              <rect x="3" y="13" width="8" height="8" rx="2" fill="#0e0e0e" />
              <rect x="13" y="13" width="8" height="8" rx="2" fill="#5b5bd6" />
            </svg>
          </div>
          <span className="logo-text">Salleist</span>
        </div>

        {/* Main nav */}
        <div className="sidebar-section">Main</div>
        {NAV_MAIN.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={clsx("nav-item", pathname === href && "active")}>
            <i className={`ti ${icon}`} />
            <span>{label}</span>
          </Link>
        ))}

        {/* Settings nav */}
        <div className="sidebar-section">Settings</div>
        {NAV_SETTINGS.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={clsx("nav-item", pathname === href && "active")}>
            <i className={`ti ${icon}`} />
            <span>{label}</span>
          </Link>
        ))}

        {/* Upgrade card */}
        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">
              <i
                className="ti ti-sparkles"
                style={{ color: "#fff", fontSize: 18 }}
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
