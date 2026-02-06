const fallbackContent = {
  projectTitle: "Proyecto Mboi Ka'e",
  shortDescription:
    "Conjunto habitacional de interés social con diez viviendas unifamiliares en un predio cerrado.",
  keyFeatures: [],
  location: "Asunción, Paraguay",
  availabilityStatus: "En desarrollo",
  pricingOrFinancing: "Consulta personalizada",
  contactCta: "Coordinar una visita",
  imageCaptions: [],
};

const placeholderImage =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320">
      <defs>
        <linearGradient id="a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#dfe7f2" />
          <stop offset="100%" stop-color="#f7f7f8" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" fill="url(#a)" />
      <circle cx="120" cy="140" r="48" fill="#c4d1e3" />
      <rect x="200" y="110" width="190" height="100" rx="12" fill="#e9eef5" />
    </svg>`
  );

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
};

const buildHighlights = (features) => {
  const grid = document.getElementById("highlights-grid");
  if (!grid) return;
  grid.innerHTML = "";
  features.forEach((feature, index) => {
    const card = document.createElement("article");
    card.className = "highlight-card";
    card.innerHTML = `<span>Destacado ${String(index + 1).padStart(2, "0")}</span><h3>${feature}</h3>`;
    grid.appendChild(card);
  });
};

const buildGallery = (captions) => {
  const strip = document.getElementById("gallery-strip");
  if (!strip) return;
  strip.innerHTML = "";
  captions.forEach((caption) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-card";
    const img = document.createElement("img");
    img.src = placeholderImage;
    img.alt = caption;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = caption;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    strip.appendChild(figure);
  });
};

const normalizeContent = (content) => ({
  ...fallbackContent,
  ...content,
  keyFeatures: content?.keyFeatures?.length
    ? content.keyFeatures
    : fallbackContent.keyFeatures,
  imageCaptions: content?.imageCaptions?.length
    ? content.imageCaptions
    : fallbackContent.imageCaptions,
});

fetch("content.json")
  .then((response) => response.json())
  .then((content) => {
    const data = normalizeContent(content);
    setText("hero-title", data.projectTitle);
    setText("hero-description", data.shortDescription);
    setText("hero-status", data.availabilityStatus || "Disponible");
    setText("hero-location", data.location || "Ubicación en actualización");
    setText("hero-pricing", data.pricingOrFinancing || "Solicitar información");
    setText(
      "highlights-intro",
      "Una propuesta urbana pensada para el confort, la eficiencia y la identidad barrial."
    );
    setText("location-description", data.location || data.shortDescription);
    setText(
      "contact-description",
      data.contactCta ||
        "Conoce las tipologías, financiamiento y disponibilidad del conjunto."
    );
    setText("hero-cta", data.contactCta || "Agendar visita");
    setText("contact-cta", data.contactCta || "Enviar consulta");

    buildHighlights(data.keyFeatures);
    buildGallery(data.imageCaptions);
  })
  .catch(() => {
    const data = fallbackContent;
    setText("hero-title", data.projectTitle);
    setText("hero-description", data.shortDescription);
    setText("hero-status", data.availabilityStatus);
    setText("hero-location", data.location);
    setText("hero-pricing", data.pricingOrFinancing);
    setText("highlights-intro", "Detalles esenciales del proyecto.");
    setText("location-description", data.shortDescription);
    setText("contact-description", data.contactCta);
    setText("hero-cta", data.contactCta);
    setText("contact-cta", data.contactCta);
    buildHighlights(data.keyFeatures);
    buildGallery(data.imageCaptions);
  });
