class BasicButtonControl {
  constructor() {
    this._onClick = this._onClick.bind(this);
  }

  // -------------------------
  // MapLibre Lifecycle
  // -------------------------

  onAdd(map) {
    this.map = map;
    this.buildUI();
    return this.container;
  }

  onRemove() {
    this.button?.removeEventListener("click", this._onClick);
    this.button = undefined;

    this.container?.remove();
    this.map = undefined;
  }

  // -------------------------
  // Event Handlers
  // -------------------------

  _onClick() {
    alert("Button clicked!");
  }

  // -------------------------
  // UI
  // -------------------------

  buildUI() {
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    this.button = document.createElement("button");
    this.button.textContent = "🔥";
    this.button.addEventListener("click", this._onClick);

    this.container.appendChild(this.button);
  }
}

export default BasicButtonControl;
