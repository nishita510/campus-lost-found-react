import React from 'react';
import { useNavigate } from 'react-router-dom';

// HomePage is a functional component
// It receives items (array) as a prop to calculate stats
function HomePage({ items }) {
  var navigate = useNavigate();

  // Calculate stats from items
  var lostCount = items.filter(function (item) {
    return item.status === 'Lost';
  }).length;

  var foundCount = items.filter(function (item) {
    return item.status === 'Found';
  }).length;

  var totalCount = items.length;

  return (
    <div className="page">
      {/* Hero Section */}
      <div className="home-hero">
        <div className="home-badge">🎓 College Campus System</div>

        <h1>
          Find What You Lost,
          <span className="highlight">Return What You Found</span>
        </h1>

        <p>
          A simple, fast way to report and recover lost items
          across campus. Post a lost item or check if your item
          has been found.
        </p>

        <div className="home-cta-group">
          <button
            className="btn-primary"
            onClick={function () { navigate('/report'); }}
          >
            📋 Report an Item
          </button>
          <button
            className="btn-secondary"
            onClick={function () { navigate('/items'); }}
          >
            🔍 Browse Items
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="home-stats">
        <div className="stat-card">
          <div className="stat-number">{totalCount}</div>
          <div className="stat-label">Total Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{lostCount}</div>
          <div className="stat-label">Items Lost</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{foundCount}</div>
          <div className="stat-label">Items Found</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Always Available</div>
        </div>
      </div>

      {/* Features Section */}
      <div className="home-features">
        <div className="section-label">How it works</div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Report Your Item</h3>
            <p>
              Fill out a quick form with your item details —
              name, category, description and where you last
              saw it.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🗂️</div>
            <h3>Browse the List</h3>
            <p>
              Check all reported items. Filter by status (Lost /
              Found) or by category to quickly find what you are
              looking for.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📞</div>
            <h3>Contact the Finder</h3>
            <p>
              Found your item? Click on the listing and contact
              the person who found it directly via email or
              phone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
