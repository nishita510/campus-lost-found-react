import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Category icons mapping (same as in ItemCard)
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

// ItemDetailPage — shows full details of a single item
function ItemDetailPage({ items }) {
  var { id } = useParams(); // Get item id from URL
  var navigate = useNavigate();

  // State to store the found item
  var [item, setItem] = useState(null);
  var [showContact, setShowContact] = useState(false); // Toggle contact info

  // useEffect to find the item when the page loads
  useEffect(
    function () {
      var found = items.find(function (i) {
        return String(i.id) === String(id);
      });
      setItem(found || null);
    },
    [id, items]
  );

  // If item not found
  if (!item) {
    return (
      <div className="page">
        <div className="not-found-page">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h2>Item Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            This item does not exist or was removed.
          </p>
          <button
            className="btn-primary"
            onClick={function () { navigate('/items'); }}
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  var icon = CATEGORY_ICONS[item.category] || '📦';

  return (
    <div className="page">
      {/* Back Button */}
      <button
        className="back-btn"
        onClick={function () { navigate(-1); }}
      >
        ← Back to Items
      </button>

      <div className="detail-layout">
        {/* Main Detail Card */}
        <div className="detail-card">
          {/* Header */}
          <div className="detail-header">
            <h1 className="detail-name">{item.name}</h1>
            <span className={'badge ' + (item.status === 'Lost' ? 'badge-lost' : 'badge-found')}>
              {item.status === 'Lost' ? '⚠ Lost' : '✓ Found'}
            </span>
          </div>

          {/* Meta Info Grid */}
          <div className="detail-meta">
            <div className="detail-meta-item">
              <div className="detail-meta-label">Category</div>
              <div className="detail-meta-value">{icon} {item.category}</div>
            </div>
            <div className="detail-meta-item">
              <div className="detail-meta-label">Date Reported</div>
              <div className="detail-meta-value">{item.date}</div>
            </div>
            <div className="detail-meta-item">
              <div className="detail-meta-label">Location</div>
              <div className="detail-meta-value">📍 {item.location}</div>
            </div>
            <div className="detail-meta-item">
              <div className="detail-meta-label">Reported By</div>
              <div className="detail-meta-value">👤 {item.reportedBy}</div>
            </div>
          </div>

          {/* Description */}
          <div className="detail-section">
            <h4>Description</h4>
            <p>{item.description}</p>
          </div>

          {/* Map Placeholder */}
          <div className="detail-section">
            <h4>Location on Campus</h4>
            <div className="map-placeholder">
              <span>🗺️</span>
              <strong>{item.location}</strong>
              <br />
              <span style={{ fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                Campus map integration not enabled
              </span>
            </div>
          </div>
        </div>

        {/* Contact Sidebar */}
        <div className="contact-card">
          <h3>Contact Information</h3>

          {!showContact ? (
            // Before clicking — show button
            <div className="contact-hidden">
              <p>
                {item.status === 'Lost'
                  ? 'Did you find this item? Click below to see the owner\'s contact details.'
                  : 'Is this your item? Click below to contact the person who found it.'}
              </p>
              <button
                className="btn-contact"
                onClick={function () { setShowContact(true); }}
              >
                📞 Contact Finder
              </button>
            </div>
          ) : (
            // After clicking — show contact info
            <div className="contact-info">
              <div className="contact-row">
                <span className="contact-row-icon">👤</span>
                <div className="contact-row-details">
                  <div className="contact-row-label">Name</div>
                  <div className="contact-row-value">{item.reportedBy}</div>
                </div>
              </div>

              <div className="contact-row">
                <span className="contact-row-icon">✉️</span>
                <div className="contact-row-details">
                  <div className="contact-row-label">Email</div>
                  <div className="contact-row-value">{item.contactEmail}</div>
                </div>
              </div>

              <div className="contact-row">
                <span className="contact-row-icon">📱</span>
                <div className="contact-row-details">
                  <div className="contact-row-label">Phone</div>
                  <div className="contact-row-value">{item.contactPhone}</div>
                </div>
              </div>

              <p className="contact-note">
                Please be respectful when reaching out.
                Arrange to meet in a public campus location.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;
