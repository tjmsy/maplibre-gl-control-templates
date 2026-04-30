# maplibre-gl-custom-control-template

This repository contains a simple template for creating custom controls in [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js/), based on my current understanding.  
You are free to use it, but please note that there are no guarantees regarding its functionality or content. Feel free to adjust it as needed.

I welcome any feedback or suggestions for improvement!

---

## Usage
Clone this repository:
```
git clone https://github.com/tjmsy/maplibre-gl-custom-control-template.git
cd maplibre-gl-custom-control-template
```

---

## Code Overview
The core implementation is in [src/CustomControlTemplate.js](./src/CustomControlTemplate.js).  
It provides the following basic structure:

```javascript
class CustomControl {
    constructor() {
    }

    onAdd(map) {
        // Logic for when the control is added to the map
    }

    onRemove() {
        // Logic for when the control is removed from the map
    }
}
```

You can extend this to add your desired functionality.

---

## License
This project is licensed under the [Unlicense](http://unlicense.org/).

This software has been released into the public domain, with copyright fully waived in all jurisdictions that recognize copyright laws. For more details, see the [LICENSE](./LICENSE) file.
