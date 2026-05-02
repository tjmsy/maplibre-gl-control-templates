class BottomSheetControl {
  constructor(options = {}) {
    this.options = {
      heightRate: 0.5,
      minHeight: 100,
      maxHeightRate: 0.9,
      ...options,
    };

    // state
    this.isOpen = false;

    // DOM refs
    this.container = null;
    this.panel = null;
    this.handle = null;
    this.content = null;
    this.toolbar = null;
    this.textarea = null;
    this.okButton = null;
    this.clearButton = null;

    // drag state
    this.startY = 0;
    this.startHeight = 0;

    // bind
    this._onToggle = this._onToggle.bind(this);
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onOkClick = this._onOkClick.bind(this);
    this._onClearClick = this._onClearClick.bind(this);
  }

  // -------------------------
  // MapLibre Lifecycle
  // -------------------------

  onAdd(map) {
    this.map = map;
    this.map.on("resize", this._onResize);

    this.buildUI();
    return this.container;
  }

  onRemove() {
    this._close();

    this.toggleButton?.removeEventListener("click", this._onToggle);
    this.okButton?.removeEventListener("click", this._onOkClick);
    this.clearButton?.removeEventListener("click", this._onClearClick);

    this.handle?.removeEventListener("mousedown", this._onDragStart);
    document.removeEventListener("mousemove", this._onDragMove);
    document.removeEventListener("mouseup", this._onDragEnd);

    this.map?.off("resize", this._onResize);

    this.container?.remove();
    this.panel?.remove();

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

    const container = this.map.getContainer();
    const height = this._getInitialHeight(container);

    this.panel.style.height = `${height}px`;
    container.style.marginBottom = `${height}px`;

    this._syncPanelToMap();
    this.map.resize();
  }

  _close() {
    if (!this.isOpen) return;

    this.isOpen = false;

    this.panel.style.height = "0px";
    this.map.getContainer().style.marginBottom = "0px";

    this.map.resize();
  }

  // -------------------------
  // Event handlers
  // -------------------------

  _onOkClick() {
    const data = this.getValue().text;
    alert(data);
  }

  _onClearClick() {
    this.setValue({ text: "" });
  }

  _onResize() {
    if (!this.isOpen) return;
    this._syncPanelToMap();
  }

  _onDragStart(e) {
    e.preventDefault();

    document.body.style.cursor = "ns-resize";

    this.startY = e.clientY;
    this.startHeight = this.panel.offsetHeight;

    document.addEventListener("mousemove", this._onDragMove);
    document.addEventListener("mouseup", this._onDragEnd);
  }

  _onDragMove(e) {
    const dy = this.startY - e.clientY;
    this._setHeightFromDrag(dy);

    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => {
      this.map.resize();
    }, 16);
  }

  _onDragEnd() {
    document.body.style.cursor = "";

    document.removeEventListener("mousemove", this._onDragMove);
    document.removeEventListener("mouseup", this._onDragEnd);

    clearTimeout(this._resizeTimer);
    this._resizeTimer = null;
  }

  // -------------------------
  // Layout helpers
  // -------------------------

  _getInitialHeight(container) {
    const rect = container.getBoundingClientRect();
    return rect.height * this.options.heightRate;
  }

  _syncPanelToMap() {
    const container = this.map.getContainer();

    this.panel.style.left = "0px";
    this.panel.style.width = `${container.clientWidth}px`;
  }

  _setHeightFromDrag(dy) {
    const height = this._getClampedHeight(dy);
    this._applyHeight(height);
  }

  _getClampedHeight(dy) {
    const container = this.map.getContainer();

    const maxHeight =
      container.getBoundingClientRect().height * this.options.maxHeightRate;

    const raw = this.startHeight + dy;

    return Math.max(this.options.minHeight, Math.min(maxHeight, raw));
  }

  _applyHeight(height) {
    const container = this.map.getContainer();

    this.panel.style.height = `${height}px`;
    container.style.marginBottom = `${height}px`;
  }

  // -------------------------
  // Value Interface
  // -------------------------

  getValue() {
    return {
      text: this.textarea.value,
    };
  }

  setValue(value = {}) {
    if (value.text !== undefined) {
      this.textarea.value = value.text;
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

    this._createHandle();
    this._createContent();
    this._createToolbar();
    this._createTextarea();

    this._assemble();
  }

  _assemble() {
    this.container.appendChild(this.toggleButton);

    // bottom sheet is rendered outside map container to avoid attribution overlap
    document.body.appendChild(this.panel);

    this.panel.appendChild(this.handle);
    this.panel.appendChild(this.content);

    this.content.appendChild(this.toolbar);
    this.content.appendChild(this.textarea);

    this.toolbar.appendChild(this.okButton);
    this.toolbar.appendChild(this.clearButton);
  }

  _bindEvents() {
    this.toggleButton.addEventListener("click", this._onToggle);
    this.okButton.addEventListener("click", this._onOkClick);
    this.clearButton.addEventListener("click", this._onClearClick);
    this.handle.addEventListener("mousedown", this._onDragStart);
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
    this.toggleButton.textContent = "✎";
    this.toggleButton.title = "BottomSheet";
  }

  _createPanel() {
    this.panel = document.createElement("div");

    Object.assign(this.panel.style, {
      position: "fixed",
      bottom: "0",
      left: "0",
      width: "100%",
      height: "0px",
      background: "white",
      borderTop: "1px solid #ccc",
      zIndex: "1000",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
    });
  }

  _createHandle() {
    this.handle = document.createElement("div");

    Object.assign(this.handle.style, {
      height: "6px",
      cursor: "ns-resize",
      background: "#ccc",
    });
  }

  _createContent() {
    this.content = document.createElement("div");

    Object.assign(this.content.style, {
      padding: "8px",
      display: "flex",
      flexDirection: "column",
      flex: "1",
      overflow: "hidden",
      minHeight: "0",
    });
  }

  _createToolbar() {
    this.toolbar = document.createElement("div");

    Object.assign(this.toolbar.style, {
      marginBottom: "4px",
      display: "flex",
      gap: "4px",
      flex: "0 0 auto",
    });

    this.okButton = document.createElement("button");
    this.okButton.textContent = "OK";

    this.clearButton = document.createElement("button");
    this.clearButton.textContent = "Clear";
  }

  _createTextarea() {
    this.textarea = document.createElement("textarea");
    this.textarea.placeholder = "Enter text...";

    Object.assign(this.textarea.style, {
      flex: "1",
      width: "100%",
      height: "100%",
      resize: "none",
      overflow: "auto",
      minHeight: "0",
      boxSizing: "border-box",
      margin: "0",
    });
  }
}

export default BottomSheetControl;
