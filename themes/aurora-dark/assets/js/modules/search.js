const initSearch = () => {
  const root = document.querySelector('[data-search-root]');
  if (!root || typeof window === 'undefined') return;
  if (typeof window.elasticlunr === 'undefined') return;

  const input = root.querySelector('input[type="search"]');
  const resultsContainer = root.querySelector('[data-search-results]');
  const summary = root.querySelector('[data-search-summary]');
  const indexUrl = root.dataset.indexUrl;
  let index;
  let documents = {};

  const renderResults = (items) => {
    resultsContainer.innerHTML = '';
    if (!items.length) {
      resultsContainer.innerHTML = `<p class="notice">${root.dataset.noResults}</p>`;
      summary.textContent = root.dataset.summaryTemplate.replace('{count}', '0');
      return;
    }

    summary.textContent = root.dataset.summaryTemplate.replace('{count}', String(items.length));
    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
      const doc = documents[item.ref] || item.doc;
      const article = document.createElement('article');
      article.className = 'search-result';
      article.innerHTML = `
        <h3><a href="${doc.permalink}" data-prefetch>${doc.title}</a></h3>
        <p>${doc.summary}</p>
        <p class="timeline-meta">${doc.section}</p>
        <div class="tech-badges">${doc.tags
          .map((tag) => `<span class="tag-chip">${tag}</span>`)
          .join('')}</div>
      `;
      fragment.appendChild(article);
    });
    resultsContainer.appendChild(fragment);
  };

  const buildIndex = (data) => {
    index = window.elasticlunr(function () {
      this.addField('title');
      this.addField('summary');
      this.addField('tags');
      this.addField('section');
      this.setRef('permalink');
    });

    data.forEach((doc) => {
      documents[doc.permalink] = doc;
      index.addDoc(doc);
    });
  };

  fetch(indexUrl)
    .then((response) => response.json())
    .then((data) => {
      buildIndex(data);
      renderResults(data.map((doc) => ({ ref: doc.permalink, doc })));
    })
    .catch(() => {
      summary.textContent = root.dataset.errorLabel;
    });

  input.addEventListener('input', (event) => {
    const term = event.target.value.trim();
    if (!term) {
      renderResults(Object.values(documents).map((doc) => ({ ref: doc.permalink, doc })));
      return;
    }
    const hits = index.search(term, {
      fields: {
        title: { boost: 3 },
        summary: { boost: 2 },
        tags: { boost: 1 },
      },
      expand: true,
    });
    renderResults(hits);
  });
};

if (typeof window !== 'undefined') {
  if (document.readyState !== 'loading') {
    initSearch();
  } else {
    document.addEventListener('DOMContentLoaded', initSearch);
  }
}
