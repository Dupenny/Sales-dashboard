import { Order, OrderStatus } from "@/lib/data";
import clsx from "clsx";

const STATUS_LABEL: Record<OrderStatus, string> = {
  delivered: "Delivered",
  completed: "Completed",
  pending: "Pending",
  cancelled: "Cancelled",
};

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={clsx("status-badge", status)}>{STATUS_LABEL[status]}</span>
  );
}

interface Props {
  orders: Order[];
  showCustomer?: boolean;
}

export default function OrdersTable({ orders, showCustomer = false }: Props) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            {showCustomer && <th>Customer</th>}
            <th>Product</th>
            <th>Order Date</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>
                <span className="order-id">{o.id}</span>
              </td>
              {showCustomer && <td>{o.customer}</td>}
              <td>{o.product}</td>
              <td style={{ color: "var(--text2)" }}>{o.date}</td>
              <td style={{ fontWeight: 500 }}>{o.price}</td>
              <td style={{ color: "var(--text2)" }}>{o.payment}</td>
              <td>
                <StatusBadge status={o.status} />
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
  );
}
