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

    // bind
    this._onToggle = this._onToggle.bind(this);
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onOkButtonClick = this._onOkButtonClick.bind(this);
    this._onClearButtonClick = this._onClearButtonClick.bind(this);
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
    this.toggleButton?.removeEventListener("click", this._onToggle);
    this.okButton?.removeEventListener("click", this._onOkButtonClick);
    this.clearButton?.removeEventListener("click", this._onClearButtonClick);

    this.handle?.removeEventListener("mousedown", this._onDragStart);
    document.removeEventListener("mousemove", this._onDragMove);
    document.removeEventListener("mouseup", this._onDragEnd);

    window.removeEventListener("resize", this._onResize);
    this.map?.off("resize", this._onResize);

    this.container?.remove();
    this.panel?.remove();

    this.map = undefined;
  }

  // -------------------------
  // Event Handlers
  // -------------------------

  _onToggle() {
    const container = this.map.getContainer();

    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      const panelHeight = this._getInitialHeight(container);

      this.panel.style.height = panelHeight + "px";
      container.style.marginBottom = panelHeight + "px";

      this._syncPanelToMap();
    } else {
      this.panel.style.height = "0px";
      container.style.marginBottom = "0px";
    }

    this.map.resize();
  }

  _onOkButtonClick() {
    alert(this.textarea.value);
  }

  _onClearButtonClick() {
    this.textarea.value = "";
  }

  _onResize() {
    if (!this.map || !this.isOpen) return;
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
    let newHeight = this.startHeight + dy;

    const container = this.map.getContainer();
    const maxHeight =
      container.getBoundingClientRect().height * this.options.maxHeightRate;

    newHeight = Math.max(
      this.options.minHeight,
      Math.min(maxHeight, newHeight),
    );

    this.panel.style.height = newHeight + "px";
    container.style.marginBottom = newHeight + "px";

    this.map.resize();
  }

  _onDragEnd() {
    document.body.style.cursor = "";
    document.removeEventListener("mousemove", this._onDragMove);
    document.removeEventListener("mouseup", this._onDragEnd);
  }

  // -------------------------
  // Internal Helpers
  // -------------------------

  _getInitialHeight(container) {
    const rect = container.getBoundingClientRect();
    return rect.height * this.options.heightRate;
  }

  _syncPanelToMap() {
    const rect = this.map.getContainer().getBoundingClientRect();

    this.panel.style.left = rect.left + "px";
    this.panel.style.width = rect.width + "px";
    this.panel.style.bottom = "0px";
  }

  // -------------------------
  // UI
  // -------------------------

  buildUI() {
    this._createDOM();
    this._bindEvents();
  }

  _createDOM() {
    // control button
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    this.toggleButton = document.createElement("button");
    this.toggleButton.textContent = "✎";
    this.toggleButton.title = "Toggle bottom sheet";

    this.container.appendChild(this.toggleButton);

    // panel
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

    // handle
    this.handle = document.createElement("div");

    Object.assign(this.handle.style, {
      height: "2px",
      cursor: "ns-resize",
      background: "#ccc",
    });

    // content
    this.content = document.createElement("div");

    Object.assign(this.content.style, {
      padding: "8px",
      display: "flex",
      flexDirection: "column",
      flex: "1",
      overflow: "hidden",
      minHeight: "0",
    });

    // textarea
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

    // toolbar
    this.toolbar = document.createElement("div");
    Object.assign(this.toolbar.style, {
      marginBottom: "4px",
      flex: "0 0 auto",
      display: "flex",
      gap: "4px",
    });

    // button1
    this.okButton = document.createElement("button");
    this.okButton.textContent = "OK";

    // button2
    this.clearButton = document.createElement("button");
    this.clearButton.textContent = "Clear";

    this.toolbar.appendChild(this.okButton);
    this.toolbar.appendChild(this.clearButton);

    // assemble
    this.content.appendChild(this.toolbar);
    this.content.appendChild(this.textarea);

    this.panel.appendChild(this.handle);
    this.panel.appendChild(this.content);

    document.body.appendChild(this.panel);
  }

  _bindEvents() {
    this.toggleButton.addEventListener("click", this._onToggle);
    this.okButton.addEventListener("click", this._onOkButtonClick);
    this.clearButton.addEventListener("click", this._onClearButtonClick);
    this.handle.addEventListener("mousedown", this._onDragStart);

    window.addEventListener("resize", this._onResize);
  }
}

export default BottomSheetControl;
