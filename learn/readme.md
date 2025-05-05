<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Pondiverse - Learn</title>
<link rel="stylesheet" href="/style.css" />
<header
  id="view-source"
  style="position: absolute; top: 0; right: 0; padding: 16px"
>
  <a href="https://github.com/TodePond/Pondiverse" target="_blank">View source</a>
</header>

<h1><a href="/" class="breadcrumb">Pondiverse</a> - Learn</h1>

## How to connect your tool to the pondiverse

Import the pondiverse script and run the `addPondiverseButton` function somewhere in your tool's code.

```js
import { addPondiverseButton } from "https://www.pondiverse.com/pondiverse.js";

addPondiverseButton(() => {
  return {
    type: "example",
    data: "example data",
    image: canvas?.toDataURL("image/png"),
  };
});
```

It takes one function as an argument. The function should return an object with the following three properties. All properties are optional.

- `type` - A string identifying what type of creation this is. This can be anything.
- `data` - A string containing the data for the creation. This can be anything.
- `image` - A string containing a base64 encoded image. This can be anything.

<br />

<hr />

<br />

Alternatively, you can programmatically open the pondiverse dialog by calling the `openPondiverseDialog` function.

```js
import { openPondiverseDialog } from "https://www.pondiverse.com/pondiverse.js";

openPondiverseDialog(() => {
  return {
    type: "example",
    data: "example data",
    image: canvas?.toDataURL("image/png"),
  };
});
```

For full documentation of the pondiverse script, read the [docs](/docs).
