const grid = document.querySelector("#widgets");
const status = document.querySelector("#status");
const search = document.querySelector("#search");
const template = document.querySelector("#widget-template");
let widgets = [];

function render() {
  const query = search.value.trim().toLocaleLowerCase();
  const visible = widgets.filter(widget => {
    const haystack = [
      widget.name,
      widget.summary,
      widget.publisher,
      ...(widget.tags || [])
    ].join(" ").toLocaleLowerCase();
    return haystack.includes(query);
  });

  grid.replaceChildren(...visible.map(widget => {
    const card = template.content.firstElementChild.cloneNode(true);
    const icon = card.querySelector(".widget-icon");
    icon.src = widget.iconUrl;
    icon.alt = `${widget.name} icon`;
    card.querySelector("h3").textContent = widget.name;
    card.querySelector(".publisher").textContent = widget.publisher;
    card.querySelector(".summary").textContent = widget.summary;
    card.querySelector(".tags").replaceChildren(
      ...(widget.tags || []).slice(0, 4).map(tag => {
        const chip = document.createElement("span");
        chip.textContent = tag;
        return chip;
      })
    );
    card.querySelector(".store-link").href =
      `https://apps.microsoft.com/detail/${widget.storeProductId.toLowerCase()}`;
    return card;
  }));

  status.textContent = visible.length === 1
    ? "1 widget available"
    : `${visible.length} widgets available`;
}

fetch("catalog.json", { cache: "no-cache" })
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(catalog => {
    widgets = Array.isArray(catalog.widgets) ? catalog.widgets : [];
    render();
  })
  .catch(error => {
    status.textContent = "The catalog is temporarily unavailable.";
    console.error(error);
  });

search.addEventListener("input", render);
