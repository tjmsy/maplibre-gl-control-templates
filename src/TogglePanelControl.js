class TogglePanelControl {
  constructor() {
    this._onToggle = this._onToggle.bind(this);
  }

  _onToggle() {
    this.isOpen = !this.isOpen;
    this.panel.style.display = this.isOpen ? "block" : "none";
  }

  buildUI() {
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    this.button = document.createElement("button");
    this.button.textContent = "⚙️";
    this.button.title = "Toggle panel";

    this.panel = document.createElement("div");
    this.panel.style.display = "none";
    this.panel.style.padding = "8px";
    this.panel.style.background = "white";
    this.panel.style.minWidth = "200px";

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "8px";

    const label = document.createElement("label");
    label.textContent = "Text:";
    label.style.whiteSpace = "nowrap";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type here...";
    input.style.flex = "1";

    row.appendChild(label);
    row.appendChild(input);

    const select = document.createElement("select");
    select.style.width = "100%";

    ["Option A", "Option B", "Option C"].forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });

    const checkboxLabel = document.createElement("label");
    checkboxLabel.style.display = "block";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkboxLabel.appendChild(checkbox);
    checkboxLabel.append(" Checkbox");

    this.panel.appendChild(row);
    this.panel.appendChild(select);
    this.panel.appendChild(checkboxLabel);

    this.button.addEventListener("click", this._onToggle);

    this.container.appendChild(this.button);
    this.container.appendChild(this.panel);

    this.isOpen = false;
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
    this.panel = undefined;
    this.container = undefined;
    this.map = undefined;
  }
}

export default TogglePanelControl;
