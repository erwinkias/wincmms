export function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="card">
      <div className="muted">{title}</div>
      <div className="metric">{value}</div>
      <div className="muted">{subtitle}</div>
    </div>
  );
}
