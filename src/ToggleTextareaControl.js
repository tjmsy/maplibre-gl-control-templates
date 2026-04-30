class ToggleTextareaControl {
  constructor() {
    this._onToggle = this._onToggle.bind(this);
  }

  _onToggle() {
    const isVisible = this.input.style.display === "block";
    this.input.style.display = isVisible ? "none" : "block";
  }

  buildUI() {
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    this.button = document.createElement("button");
    this.button.textContent = "✏️";
    this.button.title = "Toggle input";

    this.input = document.createElement("textarea");
    this.input.placeholder = "Type here...";
    this.input.style.display = "none";
    this.input.style.width = "200px";
    this.input.style.height = "100px";

    this.button.addEventListener("click", this._onToggle);

    this.container.appendChild(this.button);
    this.container.appendChild(this.input);
  }

  onAdd(map) {
    this.map = map;
    this.buildUI();
    return this.container;
  }

  onRemove() {
    this.button?.removeEventListener("click", this._onToggle);
    this.container?.remove();

    this.button = undefined;
    this.input = undefined;
    this.container = undefined;
    this.map = undefined;
  }
}

export default ToggleTextareaControl;
