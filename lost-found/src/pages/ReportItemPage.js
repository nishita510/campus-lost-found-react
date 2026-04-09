import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

// Available categories list
var CATEGORIES = [
  'Electronics',
  'Bags',
  'Personal Items',
  'Documents',
  'Keys',
  'Clothing',
  'Books',
  'Sports',
  'Other',
];

// ReportItemPage — form to report a new lost or found item
function ReportItemPage({ onAddItem }) {
  var navigate = useNavigate();

  // Form field states
  var [name, setName] = useState('');
  var [description, setDescription] = useState('');
  var [category, setCategory] = useState('');
  var [status, setStatus] = useState('Lost'); // Default: Lost
  var [location, setLocation] = useState('');

  // Toast state
  var [showToast, setShowToast] = useState(false);

  // Check if form is complete enough to submit
  var isFormValid = name.trim() !== '' && description.trim() !== '' && category !== '' && location.trim() !== '';

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid) return;

    // Build new item object
    var newItem = {
      id: Date.now(), // unique id using timestamp
      name: name.trim(),
      description: description.trim(),
      category: category,
      status: status,
      location: location.trim(),
      date: new Date().toISOString().split('T')[0], // today's date
      reportedBy: 'Nishita',
      contactEmail: 'nishita@college.edu',
      contactPhone: '+91 98765 43210',
    };

    // Pass new item up to App.js
    onAddItem(newItem);

    // Show success toast
    setShowToast(true);

    // Clear form
    setName('');
    setDescription('');
    setCategory('');
    setStatus('Lost');
    setLocation('');

    // Navigate to items list after short delay
    setTimeout(function () {
      navigate('/items');
    }, 1500);
  }

  return (
    <div className="page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2>Report an Item</h2>
          <p>Fill in the details below to report a lost or found item.</p>
        </div>
      </div>

      <div className="report-layout">
        {/* Form */}
        <div className="form-card">
          <h2>Item Details</h2>

          <form onSubmit={handleSubmit}>
            {/* Item Name */}
            <div className="form-group">
              <label htmlFor="item-name">Item Name</label>
              <input
                id="item-name"
                type="text"
                className="form-control"
                placeholder="e.g. Blue Water Bottle"
                value={name}
                onChange={function (e) { setName(e.target.value); }}
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="item-desc">Description</label>
              <textarea
                id="item-desc"
                className="form-control"
                placeholder="Describe the item — color, brand, any unique features..."
                value={description}
                onChange={function (e) { setDescription(e.target.value); }}
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="item-category">Category</label>
              <select
                id="item-category"
                className="form-control"
                value={category}
                onChange={function (e) { setCategory(e.target.value); }}
              >
                <option value="">-- Select a Category --</option>
                {CATEGORIES.map(function (cat) {
                  return (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Status Toggle */}
            <div className="form-group">
              <label>Status</label>
              <div className="status-toggle">
                <button
                  type="button"
                  className={'status-btn ' + (status === 'Lost' ? 'active-lost' : '')}
                  onClick={function () { setStatus('Lost'); }}
                >
                  ⚠️ I Lost this Item
                </button>
                <button
                  type="button"
                  className={'status-btn ' + (status === 'Found' ? 'active-found' : '')}
                  onClick={function () { setStatus('Found'); }}
                >
                  ✅ I Found this Item
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="item-location">Last Known Location</label>
              <div className="location-placeholder">
                <span>📍</span>
                Enter the campus location below
              </div>
              <input
                id="item-location"
                type="text"
                className="form-control"
                placeholder="e.g. Central Library, Room 204, Cafeteria..."
                value={location}
                onChange={function (e) { setLocation(e.target.value); }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-submit"
              disabled={!isFormValid}
            >
              {status === 'Lost' ? '📋 Report Lost Item' : '📋 Report Found Item'}
            </button>
          </form>
        </div>

        {/* Tips Sidebar */}
        <div className="tips-card">
          <h3>💡 Reporting Tips</h3>

          <div className="tip-item">
            <div className="tip-num">1</div>
            <div className="tip-text">
              Be as specific as possible in your description —
              color, brand, size, any stickers or markings.
            </div>
          </div>
          <div className="tip-item">
            <div className="tip-num">2</div>
            <div className="tip-text">
              Mention the exact location where the item was
              lost or found, like a classroom number.
            </div>
          </div>
          <div className="tip-item">
            <div className="tip-num">3</div>
            <div className="tip-text">
              Check the Browse Items page first — someone may
              have already reported your item as found.
            </div>
          </div>
          <div className="tip-item">
            <div className="tip-num">4</div>
            <div className="tip-text">
              For valuable items like wallets or IDs, also
              inform the campus security office.
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <Toast
          message="Item reported successfully! Redirecting..."
          onClose={function () { setShowToast(false); }}
        />
      )}
    </div>
  );
}

export default ReportItemPage;
