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
    this.clearButton = null;
    this.radioGroup = null;
    this.radioInputs = [];

    // bind
    this._onToggle = this._onToggle.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._onOkClick = this._onOkClick.bind(this);
    this._onClearClick = this._onClearClick.bind(this);
  }

  // -------------------------
  // Lifecycle
  // -------------------------

  onAdd(map) {
    this.map = map;

    this._createUI();
    this._bindUIEvents();

    return this.container;
  }

  onRemove() {
    this._close();
    this._unbindUIEvents();

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
  // Events (UI)
  // -------------------------

  _bindUIEvents() {
    this.toggleButton.addEventListener("click", this._onToggle);
    this.okButton.addEventListener("click", this._onOkClick);
    this.clearButton.addEventListener("click", this._onClearClick);
  }

  _unbindUIEvents() {
    this.toggleButton?.removeEventListener("click", this._onToggle);
    this.okButton?.removeEventListener("click", this._onOkClick);
    this.clearButton?.removeEventListener("click", this._onClearClick);

    document.removeEventListener("click", this._onDocumentClick);
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
      mode: null,
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
      mode: this.radioInputs.find((r) => r.checked)?.value || null,
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

    if (value.mode !== undefined) {
      this.radioInputs.forEach((r) => {
        r.checked = r.value === value.mode;
      });
    }
  }

  // -------------------------
  // UI
  // -------------------------

  _createUI() {
    this._createContainer();
    this._createToggleButton();
    this._createPanel();

    this._createTextboxGroup();
    this._createSelect();
    this._createCheckbox();
    this._createRadioGroup();
    this._createToolbar();

    this._assemble();
  }

  _assemble() {
    this.container.appendChild(this.toggleButton);
    this.container.appendChild(this.panel);

    this.panel.appendChild(this.textboxGroup);
    this.panel.appendChild(this.select);
    this.panel.appendChild(this.checkboxGroup);
    this.panel.appendChild(this.radioGroup);
    this.panel.appendChild(this.toolbar);
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

  _createRadioGroup() {
    const OPTIONS = ["Mode A", "Mode B", "Mode C"];

    this.radioGroup = document.createElement("div");

    Object.assign(this.radioGroup.style, {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      marginTop: "8px",
    });

    this.radioInputs = [];

    OPTIONS.forEach((opt, i) => {
      const label = document.createElement("label");

      Object.assign(label.style, {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        cursor: "pointer",
      });

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "toggle-panel-mode";
      input.value = opt;

      if (i === 0) input.checked = true;

      const span = document.createElement("span");
      span.textContent = opt;

      label.appendChild(input);
      label.appendChild(span);

      this.radioGroup.appendChild(label);
      this.radioInputs.push(input);
    });
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
