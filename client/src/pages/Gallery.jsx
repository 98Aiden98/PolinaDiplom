import { useEffect, useState } from 'react';
import { galleryApi } from '../api/gallery';
import { API_BASE } from '../api/axios';
import Modal from '../components/Modal';
import EmptyState from '../components/EmptyState';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    galleryApi.list().then((res) => setItems(res.data));
  }, []);

  return (
    <div className="container page">
      <h1>Фотогалерея</h1>
      {items.length > 0 ? (
        <div className="gallery-grid mosaic">
          {items.map((item) => (
            <button
              key={item._id}
              className="gallery-item"
              onClick={() => setSelected(item)}
            >
              <img src={`${API_BASE}${item.filePath}`} alt={item.title || 'Фото'} />
            </button>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Фотографий пока нет"
          description="Снимки с тренировок и матчей появятся здесь."
          badge="Галерея"
        />
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <img className="modal-image" src={`${API_BASE}${selected.filePath}`} alt={selected.title || 'Фото'} />
            {selected.title && <p>{selected.title}</p>}
          </div>
        )}
      </Modal>
    </div>
  );
}
