import React from 'react';
import { useNavigate } from 'react-router-dom';

// Category icons mapping
var CATEGORY_ICONS = {
  'Electronics': '📱',
  'Bags': '🎒',
  'Personal Items': '👜',
  'Documents': '📄',
  'Keys': '🔑',
  'Clothing': '👕',
  'Books': '📚',
  'Sports': '⚽',
  'Other': '📦',
};

// ItemCard is a functional component
function ItemCard({ item }) {
  var navigate = useNavigate();

  // Navigate to item detail page
  function handleClick() {
    navigate('/items/' + item.id);
  }

  var icon = CATEGORY_ICONS[item.category] || '📦';

  return (
    <div className="item-card" onClick={handleClick}>
      {/* Top row: name + status badge */}
      <div className="item-card-top">
        <span className="item-card-name">{item.name}</span>
        <span className={'badge ' + (item.status === 'Lost' ? 'badge-lost' : 'badge-found')}>
          {item.status === 'Lost' ? '⚠ Lost' : '✓ Found'}
        </span>
      </div>

      {/* Category */}
      <div className="item-card-category">
        <span className="cat-icon">{icon}</span>
        {item.category}
      </div>

      {/* Description preview */}
      <p className="item-card-desc">{item.description}</p>

      {/* Footer */}
      <div className="item-card-footer">
        <span className="item-card-location">📍 {item.location}</span>
        <span className="item-card-date">{item.date}</span>
      </div>
    </div>
  );
}

export default ItemCard;
