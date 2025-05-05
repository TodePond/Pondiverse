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

This page contains guides on how to build things for the pondiverse.

For full reference of the pondiverse script, read the [reference](/reference/).\
For an example of a pondiverse tool, check out the basic [tool](/tool/).

- [Connect your tool to the pondiverse](#connect)
- [Let people open creations in your tool](#tools)
- [Programmatically open the pondiverse dialog](#open)

<h2 id="connect">Connect your tool to the pondiverse</h2>

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

<br>

<h2 id="tools">Let people open creations in your tool</h2>

Add your tools to the [list of tools](https://github.com/TodePond/Pondiverse/blob/main/tools.js).

```js
{
  name: "Example tool",
  types: ["example"],
  url: "https://example.com/?id=",
}
```

Then you need to make sure your tool can open the creation. Get the creation's data by using the `fetchPondiverseCreation` function.

```js
import { fetchPondiverseCreation } from "https://www.pondiverse.com/pondiverse.js";

const creationParam = new URL(window.location).searchParams.get("id");
if (creationParam) {
  const creation = await fetchPondiverseCreation(creationParam);
}
```

<br />

<h2 id="open">Programmatically open the pondiverse dialog</h2>

You can programmatically open the pondiverse dialog by calling the `openPondiverseDialog` function. This is useful if you don't want to use the default button.

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

<br />
<br />
<br />
<br />
<br />
<br />
