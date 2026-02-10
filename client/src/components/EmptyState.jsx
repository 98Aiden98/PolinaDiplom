export default function EmptyState({ title, description, badge = 'Нет данных' }) {
  return (
    <div className="empty-state">
      <div className="empty-badge">{badge}</div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
