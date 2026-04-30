# maplibre-gl-control-templates

This repository contains simple templates for creating custom controls in [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js/), based on my understanding.  
Feel free to use and modify these templates as needed.  
No guarantees on functionality or correctness.  
Feedback and suggestions are welcome.

---

## Demo

[Demo](https://tjmsy.github.io/maplibre-gl-control-templates/)


---

## Usage
Clone this repository:
```
git clone https://github.com/tjmsy/maplibre-gl-control-templates.git
cd maplibre-gl-control-templates
```

Then copy a template from the `src/` directory and modify it as needed.

---

## Basic Structure
All controls follow the same pattern:

```javascript
class CustomControl {
  onAdd(map) {
    // create DOM
    // attach events
    return this.container;
  }

  onRemove() {
    // remove events
    // clean up DOM
  }
}
```

---

## License
This project is licensed under the [Unlicense](http://unlicense.org/).

This software has been released into the public domain. See the [LICENSE](./LICENSE) file for details.
