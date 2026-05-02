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

    this.toggleButton?.removeEventListener("click", this._onToggle);
    this.okButton?.removeEventListener("click", this._onOkClick);
    this.clearButton?.removeEventListener("click", this._onClearClick);

    this.container?.remove();

    this.map = undefined;
  }

  // -------------------------
  // Event Handlers
  // -------------------------

  _onToggle() {
    this.isOpen ? this._close() : this._open();
  }

  // close when clicking outside
  _onDocumentClick(e) {
    if (!this.isOpen) return;

    if (this.container.contains(e.target) || this.panel.contains(e.target)) {
      return;
    }

    this._close();
  }

  _onOkClick() {
    const data = {
      text: this.input.value,
      option: this.select.value,
      checked: this.checkbox.checked,
    };

    alert(JSON.stringify(data, null, 2));
  }

  _onClearClick() {
    this.input.value = "";
    this.select.value = "";
    this.checkbox.checked = false;
  }

  // -------------------------
  // Internal Helpers
  // -------------------------

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

  // -------------------------
  // UI
  // -------------------------

  buildUI() {
    this._createDOM();
    this._bindEvents();
  }

  _createDOM() {
    // container
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    // toggle button
    this.toggleButton = document.createElement("button");
    this.toggleButton.textContent = "⚙️";
    this.toggleButton.title = "Toggle panel";

    // panel
    this.panel = document.createElement("div");

    Object.assign(this.panel.style, {
      display: "none",
      padding: "8px",
      background: "white",
      minWidth: "200px",
      boxSizing: "border-box",
    });

    // parts
    const textRow = this._createTextRow();
    const select = this._createSelect();
    const checkbox = this._createCheckbox();
    const toolbar = this._createToolbar();

    // assemble
    this.panel.appendChild(textRow);
    this.panel.appendChild(select);
    this.panel.appendChild(checkbox);
    this.panel.appendChild(toolbar);

    this.container.appendChild(this.toggleButton);
    this.container.appendChild(this.panel);
  }

  _createTextRow() {
    const textRow = document.createElement("div");

    Object.assign(textRow.style, {
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

    textRow.appendChild(label);
    textRow.appendChild(this.input);

    return textRow;
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

    return this.select;
  }

  _createCheckbox() {
    const wrapper = document.createElement("label");
    wrapper.style.display = "block";

    this.checkbox = document.createElement("input");
    this.checkbox.type = "checkbox";

    const labelText = document.createTextNode(" Checkbox");
    wrapper.appendChild(this.checkbox);
    wrapper.append(labelText);

    return wrapper;
  }

  _createToolbar() {
    const toolbar = document.createElement("div");

    Object.assign(toolbar.style, {
      marginTop: "8px",
      display: "flex",
      gap: "4px",
    });

    this.okButton = document.createElement("button");
    this.okButton.textContent = "OK";

    this.clearButton = document.createElement("button");
    this.clearButton.textContent = "Clear";

    toolbar.appendChild(this.okButton);
    toolbar.appendChild(this.clearButton);

    return toolbar;
  }

  _bindEvents() {
    this.toggleButton.addEventListener("click", this._onToggle);
    this.okButton.addEventListener("click", this._onOkClick);
    this.clearButton.addEventListener("click", this._onClearClick);
  }
}

export default TogglePanelControl;
