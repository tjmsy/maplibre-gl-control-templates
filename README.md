# maplibre-gl-control-templates

This repository contains simple templates for creating custom controls in [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js/), based on my understanding.  
These templates focus on UI structure only and do not include map interaction logic.

Feel free to use and modify these templates as needed.  
No guarantees on functionality or correctness.  
Feedback and suggestions are welcome.

---

## Demo

[Demo](https://tjmsy.github.io/maplibre-gl-control-templates/)

<img width="492" height="290" alt="image" src="https://github.com/user-attachments/assets/cd0df139-257a-4407-a7af-e0656cb46d1f" />

---

## Usage

Clone this repository:

```
git clone https://github.com/tjmsy/maplibre-gl-control-templates.git
cd maplibre-gl-control-templates
```

Then copy a template from the `src/` directory and modify it as needed.  
Or just download individual files from the repository.

---

## Basic Structure

All controls follow the same pattern:

```javascript
class CustomControl {
  constructor() {
    // control initialization
  }

  onAdd(map) {
    this.map = map;

    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    // create UI
    // attach event listeners

    return this.container;
  }

  onRemove() {
    // remove event listeners
    // clean up DOM elements

    this.container.remove();
    this.map = undefined;
  }
}
```

---

## License

This project is licensed under the [Unlicense](http://unlicense.org/).

This software has been released into the public domain. See the [LICENSE](./LICENSE) file for details.
