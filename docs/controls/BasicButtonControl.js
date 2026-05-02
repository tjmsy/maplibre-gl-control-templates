class BasicButtonControl {
  constructor() {
    // bind
    this._onClick = this._onClick.bind(this);

    // DOM refs
    this.container = null;
    this.button = null;
  }

  // -------------------------
  // MapLibre Lifecycle
  // -------------------------

  onAdd(map) {
    this.map = map;

    this._createUI();
    this._bindUIEvents();

    return this.container;
  }

  onRemove() {
    this._unbindUIEvents();

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
  // UI lifecycle
  // -------------------------

  _createUI() {
    this._createContainer();
    this._createButton();

    this._assemble();
  }

  _bindUIEvents() {
    this.button.addEventListener("click", this._onClick);
  }

  _unbindUIEvents() {
    this.button?.removeEventListener("click", this._onClick);
  }

  _assemble() {
    this.container.appendChild(this.button);
  }

  // -------------------------
  // UI Parts
  // -------------------------

  _createContainer() {
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";
  }

  _createButton() {
    this.button = document.createElement("button");
    this.button.textContent = "🔥";
  }
}

export default BasicButtonControl;
