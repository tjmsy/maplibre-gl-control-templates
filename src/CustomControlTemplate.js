class CustomControl {
  constructor() {
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    alert("Button clicked!");
  }

  buildUI() {
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    this.button = document.createElement("button");
    this.button.textContent = "🔥";
    this.button.addEventListener("click", this._onClick);

    this.container.appendChild(this.button);
  }

  onAdd(map) {
    this.map = map;
    this.buildUI();
    return this.container;
  }

  onRemove() {
    this.button?.removeEventListener("click", this._onClick);
    this.container?.remove();

    this.button = undefined;
    this.container = undefined;
    this.map = undefined;
  }
}

export default CustomControl;
