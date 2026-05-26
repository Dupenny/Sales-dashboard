interface Props {
  icon: string;
  title: string;
  description: string;
}

export default function ComingSoon({ icon, title, description }: Props) {
  return (
    <div className="coming-soon">
      <div className="cs-icon">
        <i className={`ti ${icon}`} />
      </div>
      <div className="cs-title">{title}</div>
      <div className="cs-sub">{description}</div>
      <div className="cs-tag">
        <i className="ti ti-clock" style={{ fontSize: 14 }} />
        Coming soon
      </div>
    </div>
  );
}
