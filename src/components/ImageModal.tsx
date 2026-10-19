import React from 'react';

export interface ImageModalProps {
  imageUrl: string | null;
  breedName: string;
  onClose: () => void;
}

export default function ImageModal({
  imageUrl,
  breedName,
  onClose,
}: ImageModalProps): React.JSX.Element | null {
  if (!imageUrl) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="׳³ֲ¡׳³ג€™׳³ג€¢׳³ֲ¨ ׳³ג€”׳³ֲ׳³ג€¢׳³ֲ ׳³ג„¢׳³ֳ—">
          ׳’ֲג€¢
        </button>
        <img src={imageUrl} alt={breedName} className="modal-image" />
        <div className="modal-footer">
          <h3>{breedName.toUpperCase()}</h3>
          <a
            href={imageUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            ׳³ג‚×׳³ֳ—׳³ג„¢׳³ג€”׳³ֳ— ׳³ֳ—׳³ֲ׳³ג€¢׳³ֲ ׳³ג€ ׳³ֲ׳³ֲ§׳³ג€¢׳³ֲ¨׳³ג„¢׳³ֳ— ׳’ג€ ג€”
          </a>
        </div>
      </div>
    </div>
  );
}