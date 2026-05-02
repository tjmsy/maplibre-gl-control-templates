class TogglePanelControl {
  constructor() {
    // state
    this.isOpen = false;

    // DOM refs
    this.container = null;
    this.toggleButton = null;
    this.panel = null;
    this.toolbar = null;
    this.input = null;
    this.select = null;
    this.checkbox = null;
    this.okButton = null;

    // bind
    this._onToggle = this._onToggle.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._onOkClick = this._onOkClick.bind(this);
    this._onClearClick = this._onClearClick.bind(this);
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
    this._close();
    document.removeEventListener("click", this._onDocumentClick);

    this.toggleButton?.removeEventListener("click", this._onToggle);
    this.okButton?.removeEventListener("click", this._onOkClick);
    this.clearButton?.removeEventListener("click", this._onClearClick);


    this.container?.remove();

    this.map = undefined;
  }

  // -------------------------
  // State control
  // -------------------------

  _onToggle() {
    this.isOpen ? this._close() : this._open();
  }

  _open() {
    if (this.isOpen) return;

    this.isOpen = true;
    this.panel.style.display = "block";

    document.addEventListener("click", this._onDocumentClick);
  }

  _close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.panel.style.display = "none";

    document.removeEventListener("click", this._onDocumentClick);
  }

  _onDocumentClick(e) {
    if (!this.isOpen) return;

    if (this.container.contains(e.target) || this.panel.contains(e.target)) {
      return;
    }

    this._close();
  }

  // -------------------------
  // Event Handlers
  // -------------------------

  _onOkClick() {
    const data = this.getValue();

    alert(JSON.stringify(data, null, 2));
  }

  _onClearClick() {
    this.setValue({
      text: "",
      option: "",
      checked: false,
    });
  }

  // -------------------------
  // Value Interface
  // -------------------------

  getValue() {
    return {
      text: this.input.value,
      option: this.select.value,
      checked: this.checkbox.checked,
    };
  }

  setValue(value = {}) {
    if (value.text !== undefined) {
      this.input.value = value.text;
    }

    if (value.option !== undefined) {
      this.select.value = value.option;
    }

    if (value.checked !== undefined) {
      this.checkbox.checked = value.checked;
    }
  }

  // -------------------------
  // UI
  // -------------------------

  buildUI() {
    this._createDOM();
    this._bindEvents();
  }

  _createDOM() {
    this._createContainer();
    this._createToggleButton();
    this._createPanel();

    this._createTextboxGroup();
    this._createSelect();
    this._createCheckbox();
    this._createToolbar();

    this.container.appendChild(this.toggleButton);
    this.container.appendChild(this.panel);
    this.panel.appendChild(this.textboxGroup);
    this.panel.appendChild(this.select);
    this.panel.appendChild(this.checkboxGroup);
    this.panel.appendChild(this.toolbar);
  }

  _bindEvents() {
    this.toggleButton.addEventListener("click", this._onToggle);
    this.okButton.addEventListener("click", this._onOkClick);
    this.clearButton.addEventListener("click", this._onClearClick);
  }

  // -------------------------
  // UI Parts
  // -------------------------

  _createContainer() {
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";
  }
  _createToggleButton() {
    this.toggleButton = document.createElement("button");
    this.toggleButton.textContent = "⚙️";
    this.toggleButton.title = "Toggle panel";
  }

  _createPanel() {
    this.panel = document.createElement("div");

    Object.assign(this.panel.style, {
      display: "none",
      padding: "8px",
      background: "white",
      minWidth: "200px",
      boxSizing: "border-box",
    });
  }

  _createTextboxGroup() {
    this.textboxGroup = document.createElement("div");

    Object.assign(this.textboxGroup.style, {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "8px",
    });

    const label = document.createElement("label");
    label.textContent = "Text:";
    label.style.whiteSpace = "nowrap";

    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Type here...";
    this.input.style.flex = "1";

    this.textboxGroup.appendChild(label);
    this.textboxGroup.appendChild(this.input);
  }

  _createSelect() {
    const OPTIONS = ["Option A", "Option B", "Option C"];

    this.select = document.createElement("select");

    Object.assign(this.select.style, {
      width: "100%",
      marginBottom: "8px",
    });

    OPTIONS.forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      this.select.appendChild(option);
    });
  }

  _createCheckbox() {
    this.checkboxGroup = document.createElement("label");
    this.checkboxGroup.style.display = "block";

    this.checkbox = document.createElement("input");
    this.checkbox.type = "checkbox";

    this.checkboxGroup.appendChild(this.checkbox);
    this.checkboxGroup.append(" Checkbox");
  }

  _createToolbar() {
    this.toolbar = document.createElement("div");

    Object.assign(this.toolbar.style, {
      marginTop: "8px",
      display: "flex",
      gap: "4px",
    });

    this.okButton = document.createElement("button");
    this.okButton.textContent = "OK";

    this.clearButton = document.createElement("button");
    this.clearButton.textContent = "Clear";

    this.toolbar.appendChild(this.okButton);
    this.toolbar.appendChild(this.clearButton);
  }
}

export default TogglePanelControl;
