import { TOP_PRODUCTS } from "@/lib/data";

export default function TopProducts() {
  return (
    <div className="top-products">
      <div className="card-header">
        <span className="card-title">Top Selling Product</span>
        <a
          href="#"
          style={{
            fontSize: 12,
            color: "var(--accent)",
            fontWeight: 500,
            textDecoration: "none",
          }}>
          See All Product
        </a>
      </div>

      {TOP_PRODUCTS.map((p) => (
        <div className="product-item" key={p.name}>
          {/* <div className="product-img">{p.emoji}</div>
          <div className="product-info">
            <div className="product-name">{p.name}</div>
            <div className="product-sales">{p.sales} Sales</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            {p.status === "available" ? (
              <div className="product-badge">● Available</div>
            ) : (
              <div
                className="product-badge"
                style={{ color: "#d97706", background: "#fffbeb" }}>
                ● Low Stock
              </div>
            )}
            <div className="product-stock">{p.stock} stocks remaining</div>
          </div> */}
        </div>
      ))}
    </div>
  );
}
