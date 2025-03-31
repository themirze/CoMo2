// Load existing categories from consent-manager.js
let categories = {
  necessary: {
    name: "Necessary",
    description: "Essential cookies that enable basic functionality and security features.",
    required: true,
    storage: ["ad_storage", "analytics_storage"],
    cookies: [
      {
        name: "Google Recaptcha",
        duration: "6 months",
        description:
          "Google Recaptcha service sets this cookie to identify bots to protect the website against malicious spam attacks.",
      },
      {
        name: "XSRF-TOKEN",
        duration: "2 hours",
        description: "This cookie enhances visitor browsing security by preventing cross-site request forgery.",
      },
      {
        name: "Cloudflare Bot Management",
        duration: "1 hour",
        description: "This cookie, set by Cloudflare, is used to support Cloudflare Bot Management.",
      },
      {
        name: "Cloudflare Visitor ID",
        duration: "session",
        param: "__cfruid",
        description: "Cloudflare sets this cookie to identify trusted web traffic.",
      },
    ],
  },
  analytics: {
    name: "Analtical",
    description: "Cookies that help us understand how visitors interact with our website.",
    required: false,
    storage: ["analytics_storage"],
    cookies: [
      {
        name: "ajs_anonymous_id",
        duration: "Never Expires",
        description:
          "This cookie is set by Segment to count the number of people who visit a certain site by tracking if they have visited before.",
      },
      {
        name: "ajs_user_id",
        duration: "Never Expires",
        description:
          "This cookie is set by Segment to help track visitor usage, events, target marketing, and also measure application performance and stability.",
      },
    ],
  },
  functional: {
    name: "Functional",
    description: "Cookies that help us understand how visitors interact with our website.",
    required: false,
    storage: ["analytics_storage"],
    cookies: [
      {
        name: "ajs_anonymous_id",
        duration: "Never Expires",
        description:
          "This cookie is set by Segment to count the number of people who visit a certain site by tracking if they have visited before.",
      },
      {
        name: "ajs_user_id",
        duration: "Never Expires",
        description:
          "This cookie is set by Segment to help track visitor usage, events, target marketing, and also measure application performance and stability.",
      },
    ],
  },
  marketing: {
    name: "Marketing",
    description: "Cookies used to track visitors across websites to display relevant advertisements.",
    required: false,
    storage: ["ad_storage", "ad_user_data", "ad_personalization"],
    cookies: [
      {
        name: "m",
        duration: "2 years",
        description:
          "Stripe sets this cookie for fraud prevention purposes. It identifies the device used to access the website, allowing the website to be formatted accordingly.",
      },
    ],
  },
  unclassified: {
    name: "Unclassifed",
    description: "Cookies that help us understand how visitors interact with our website.",
    required: false,
    storage: ["analytics_storage"],
    cookies: [
      {
        name: "ajs_anonymous_id",
        duration: "Never Expires",
        description:
          "This cookie is set by Segment to count the number of people who visit a certain site by tracking if they have visited before.",
      },
      {
        name: "ajs_user_id",
        duration: "Never Expires",
        description:
          "This cookie is set by Segment to help track visitor usage, events, target marketing, and also measure application performance and stability.",
      },
    ],
  },
};

let currentCategory = null;
let currentCookie = null;

function renderCategories() {
  const container = document.getElementById("categoriesContainer");
  container.innerHTML = Object.entries(categories)
    .map(
      ([key, category]) => `
                <div class="category-card">
                    <div class="category-header">
                        <h3 class="category-title">${category.name}</h3>
                        <div class="category-actions">
                            <button class="btn btn-edit" onclick="editCategory('${key}')">Edit</button>
                            <button class="btn btn-delete" onclick="deleteCategory('${key}')">Delete</button>
                            <button class="btn btn-add" onclick="showAddCookieModal('${key}')">Add Cookie</button>
                        </div>
                    </div>
                    <div class="cookies-list">
                        ${category.cookies
                          .map(
                            (cookie) => `
                            <div class="cookie-item">
                                <div class="cookie-name">${cookie.name}</div>
                                <div class="cookie-duration">Duration: ${cookie.duration}</div>
                                <div class="cookie-description">${cookie.description}</div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            `
    )
    .join("");
}

function showAddCategoryModal() {
  currentCategory = null;
  document.getElementById("modalTitle").textContent = "Add New Category";
  document.getElementById("categoryForm").reset();
  document.getElementById("categoryModal").classList.add("show");
}

function editCategory(key) {
  currentCategory = key;
  const category = categories[key];
  document.getElementById("modalTitle").textContent = "Edit Category";
  document.getElementById("categoryName").value = category.name;
  document.getElementById("categoryDescription").value = category.description;
  document.getElementById("categoryRequired").checked = category.required;
  document.getElementById("categoryStorage").value = category.storage.join(", ");
  document.getElementById("categoryModal").classList.add("show");
}

function showAddCookieModal(categoryKey) {
  currentCategory = categoryKey;
  currentCookie = null;
  document.getElementById("cookieModalTitle").textContent = "Add New Cookie";
  document.getElementById("cookieForm").reset();
  document.getElementById("cookieModal").classList.add("show");
}

function saveCategory(event) {
  event.preventDefault();
  const formData = {
    name: document.getElementById("categoryName").value,
    description: document.getElementById("categoryDescription").value,
    required: document.getElementById("categoryRequired").checked,
    storage: document
      .getElementById("categoryStorage")
      .value.split(",")
      .map((s) => s.trim()),
    cookies: [],
  };

  if (currentCategory) {
    formData.cookies = categories[currentCategory].cookies;
    categories[currentCategory] = formData;
  } else {
    const key = formData.name.toLowerCase().replace(/\s+/g, "_");
    categories[key] = formData;
  }

  closeModal();
  renderCategories();
  updatePreview();
}

function saveCookie(event) {
  event.preventDefault();
  const formData = {
    name: document.getElementById("cookieName").value,
    duration: document.getElementById("cookieDuration").value,
    description: document.getElementById("cookieDescription").value,
  };

  if (currentCookie !== null) {
    categories[currentCategory].cookies[currentCookie] = formData;
  } else {
    categories[currentCategory].cookies.push(formData);
  }

  closeModal();
  renderCategories();
  updatePreview();
}

function deleteCategory(key) {
  if (confirm("Are you sure you want to delete this category?")) {
    delete categories[key];
    renderCategories();
    updatePreview();
  }
}

function closeModal() {
  document.getElementById("categoryModal").classList.remove("show");
  document.getElementById("cookieModal").classList.remove("show");
}

function togglePreview() {
  const container = document.getElementById("previewContainer");
  container.classList.toggle("show");
  if (container.classList.contains("show")) {
    updatePreview();
  }
}

function updatePreview() {
  const container = document.getElementById("previewContainer");
  container.innerHTML = `
                <div class="consent-categories">
                    ${Object.entries(categories)
                      .map(
                        ([key, category]) => `
                        <div class="consent-category">
                            <div class="consent-category-header">
                                <div class="consent-category-title">
                                    <svg class="dropdown-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 10L12 15L17 10" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    ${category.name}
                                    <span class="cookie-count">${category.cookies.length} cookies</span>
                                </div>
                                <label class="consent-toggle">
                                    <input type="checkbox" ${category.required ? "checked disabled" : ""}>
                                    <span class="consent-slider"></span>
                                </label>
                            </div>
                            <p class="consent-category-description">${category.description}</p>
                            <div class="cookie-details">
                                ${category.cookies
                                  .map(
                                    (cookie) => `
                                    <div class="cookie-item">
                                        <div class="cookie-name">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 1.5C4.5 1.5 1.5 4.5 1.5 8C1.5 11.5 4.5 14.5 8 14.5C11.5 14.5 14.5 11.5 14.5 8C14.5 4.5 11.5 1.5 8 1.5ZM8 13C5.2 13 3 10.8 3 8C3 5.2 5.2 3 8 3C10.8 3 13 5.2 13 8C13 10.8 10.8 13 8 13Z" fill="#1a73e8"/>
                                                <path d="M8 4.5C6.1 4.5 4.5 6.1 4.5 8C4.5 9.9 6.1 11.5 8 11.5C9.9 11.5 11.5 9.9 11.5 8C11.5 6.1 9.9 4.5 8 4.5ZM8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10Z" fill="#1a73e8"/>
                                            </svg>
                                            ${cookie.name}
                                        </div>
                                        <div class="cookie-duration">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 1.5C4.5 1.5 1.5 4.5 1.5 8C1.5 11.5 4.5 14.5 8 14.5C11.5 14.5 14.5 11.5 14.5 8C14.5 4.5 11.5 1.5 8 1.5ZM8 13C5.2 13 3 10.8 3 8C3 5.2 5.2 3 8 3C10.8 3 13 5.2 13 8C13 10.8 10.8 13 8 13Z" fill="#5f6368"/>
                                                <path d="M8 4.5V8L10.5 9.5" stroke="#5f6368" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            Duration: ${cookie.duration}
                                        </div>
                                        <div class="cookie-description">${cookie.description}</div>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;
}

function generateConsentManager() {
  const consentManagerCode = `
// Google Consent Mode V2 Implementation
(function() {
    // Default consent state
    const defaultConsent = {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'wait_for_update': 500
    };

    // Consent categories with detailed cookie information
    const categories = ${JSON.stringify(categories, null, 4)};

    // ... rest of the consent-manager.js code ...
})();
            `;

  // Create a blob and download the file
  const blob = new Blob([consentManagerCode], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "consent-manager.js";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Initial render
renderCategories();
