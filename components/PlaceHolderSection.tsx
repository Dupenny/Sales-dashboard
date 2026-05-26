export function PlaceholderSection({
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
