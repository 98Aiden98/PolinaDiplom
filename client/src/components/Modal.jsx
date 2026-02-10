export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="modal-close" onClick={onClose} aria-label="Закрыть">×</button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
