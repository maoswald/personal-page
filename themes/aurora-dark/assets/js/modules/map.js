const haversineDistance = (a, b) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const h = sinDLat * sinDLat + sinDLon * sinDLon * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
};

const renderList = (points, container) => {
  if (!container) return;
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();
  points.forEach((point) => {
    const item = document.createElement('article');
    item.className = 'card';
    item.innerHTML = `
      <h3><a href="${point.permalink}">${point.title}</a></h3>
      <p>${point.summary}</p>
      <p class="timeline-meta">${point.city}, ${point.country}</p>
      <div class="tech-badges">${(point.tags || [])
        .map((tag) => `<span class="tag-chip">${tag}</span>`)
        .join('')}</div>
    `;
    fragment.appendChild(item);
  });
  container.appendChild(fragment);
};

const renderNearby = (config) => {
  const container = document.querySelector('[data-nearby-list]');
  if (!container || !config?.active || !config?.nearby?.length) return;
  const base = config.active.gps;
  const entries = config.nearby
    .map((point) => ({
      ...point,
      distance: haversineDistance(base, point.gps),
    }))
    .filter((point) => point.distance > 0.5)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 4);
  container.innerHTML = '';
  entries.forEach((entry) => {
    const item = document.createElement('li');
    item.innerHTML = `<a href="${entry.permalink}">${entry.title}</a> · ${entry.distance.toFixed(1)} km`;
    container.appendChild(item);
  });
};

const initTravelMap = () => {
  const mapEl = document.getElementById('travel-map');
  if (!mapEl || typeof window === 'undefined') return;
  const { L } = window;
  if (!L) return;

  const config = JSON.parse(mapEl.dataset.config || '{}');
  const points = config.points || [];
  const tileUrl = config.tiles;
  const attribution = config.attribution;
  const defaultCenter = config.center || [0, 0];
  const defaultZoom = config.zoom || 2;
  const markers = L.markerClusterGroup ? L.markerClusterGroup() : L.layerGroup();
  const map = L.map(mapEl, { scrollWheelZoom: true }).setView(defaultCenter, defaultZoom);

  L.tileLayer(tileUrl, {
    attribution,
    maxZoom: 19,
  }).addTo(map);

  const countryFilter = document.querySelector('[data-map-filter="country"]');
  const searchFilter = document.querySelector('[data-map-filter="search"]');
  const tagFilter = document.querySelector('[data-map-filter="tags"]');
  const listContainer = document.querySelector('[data-travel-list]');

  const renderMarkers = (items) => {
    markers.clearLayers();
    items.forEach((point) => {
      if (!point.gps) return;
      const marker = L.marker([point.gps.lat, point.gps.lng]);
      marker.bindPopup(`
        <div class="map-popup">
          <h3>${point.title}</h3>
          <p>${point.summary}</p>
          <p class="timeline-meta">${point.city}, ${point.country}</p>
          <a class="button button-ghost" href="${point.permalink}">Read article</a>
        </div>
      `);
      markers.addLayer(marker);
    });
    markers.addTo(map);
    if (items.length > 1) {
      const bounds = items
        .filter((p) => p.gps)
        .map((p) => [p.gps.lat, p.gps.lng]);
      if (bounds.length) {
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    } else if (items.length === 1 && items[0].gps) {
      map.setView([items[0].gps.lat, items[0].gps.lng], items[0].map_zoom || 8);
    } else {
      map.setView(defaultCenter, defaultZoom);
    }
    renderList(items, listContainer);
  };

  if (config.mode === 'detail') {
    renderMarkers(points);
    renderNearby(config);
    return;
  }

  const applyFilters = () => {
    const text = searchFilter?.value.toLowerCase() || '';
    const country = countryFilter?.value || 'all';
    const activeTags = Array.from(tagFilter?.querySelectorAll('input[type="checkbox"]:checked') || []).map(
      (el) => el.value,
    );

    let filtered = points;
    if (country !== 'all') {
      filtered = filtered.filter((point) => point.country === country);
    }
    if (text) {
      filtered = filtered.filter((point) =>
        `${point.title} ${point.summary} ${(point.tags || []).join(' ')}`.toLowerCase().includes(text),
      );
    }
    if (activeTags.length) {
      filtered = filtered.filter((point) => activeTags.every((tag) => (point.tags || []).includes(tag)));
    }
    renderMarkers(filtered);
  };

  if (countryFilter) countryFilter.addEventListener('change', applyFilters);
  if (searchFilter) searchFilter.addEventListener('input', applyFilters);
  tagFilter?.addEventListener('change', applyFilters);

  const params = new URLSearchParams(window.location.search);
  const near = params.get('near');
  if (near) {
    const [lat, lng] = near.split(',').map(Number);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      points.sort((a, b) =>
        haversineDistance({ lat, lng }, a.gps) - haversineDistance({ lat, lng }, b.gps),
      );
    }
  }

  renderMarkers(points);
};

if (typeof window !== 'undefined') {
  if (document.readyState !== 'loading') {
    initTravelMap();
  } else {
    document.addEventListener('DOMContentLoaded', initTravelMap);
  }
}

export { haversineDistance };
