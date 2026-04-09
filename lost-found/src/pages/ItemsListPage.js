import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';

// ItemsListPage — shows all items with search & filter
function ItemsListPage({ items }) {
  var navigate = useNavigate();

  // State for search and filters
  var [searchText, setSearchText] = useState('');
  var [filterStatus, setFilterStatus] = useState('All');
  var [filterCategory, setFilterCategory] = useState('All');
  var [filteredItems, setFilteredItems] = useState(items);

  // useEffect to re-filter whenever items, searchText, or filters change
  useEffect(
    function () {
      var result = items;

      // Filter by search text
      if (searchText.trim() !== '') {
        var lowerSearch = searchText.toLowerCase();
        result = result.filter(function (item) {
          return (
            item.name.toLowerCase().includes(lowerSearch) ||
            item.description.toLowerCase().includes(lowerSearch) ||
            item.location.toLowerCase().includes(lowerSearch)
          );
        });
      }

      // Filter by status
      if (filterStatus !== 'All') {
        result = result.filter(function (item) {
          return item.status === filterStatus;
        });
      }

      // Filter by category
      if (filterCategory !== 'All') {
        result = result.filter(function (item) {
          return item.category === filterCategory;
        });
      }

      setFilteredItems(result);
    },
    [items, searchText, filterStatus, filterCategory]
  );

  // Get unique categories from items for the filter dropdown
  var allCategories = ['All'];
  items.forEach(function (item) {
    if (!allCategories.includes(item.category)) {
      allCategories.push(item.category);
    }
  });

  return (
    <div className="page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2>Browse Items</h2>
          <p>{filteredItems.length} item(s) found</p>
        </div>
        <button
          className="btn-primary"
          onClick={function () { navigate('/report'); }}
        >
          + Report Item
        </button>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar">
        <input
          type="text"
          className="filter-input"
          placeholder="🔍 Search by name, description or location..."
          value={searchText}
          onChange={function (e) { setSearchText(e.target.value); }}
        />

        <select
          className="filter-select"
          value={filterStatus}
          onChange={function (e) { setFilterStatus(e.target.value); }}
        >
          <option value="All">All Status</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <select
          className="filter-select"
          value={filterCategory}
          onChange={function (e) { setFilterCategory(e.target.value); }}
        >
          {allCategories.map(function (cat) {
            return (
              <option key={cat} value={cat}>
                {cat}
              </option>
            );
          })}
        </select>
      </div>

      {/* Items Grid */}
      <div className="items-grid">
        {filteredItems.length === 0 ? (
          <div className="no-items">
            <div className="no-items-icon">🕵️</div>
            <h3>No items found</h3>
            <p>Try changing your search or filters.</p>
          </div>
        ) : (
          filteredItems.map(function (item) {
            return <ItemCard key={item.id} item={item} />;
          })
        )}
      </div>
    </div>
  );
}

export default ItemsListPage;
