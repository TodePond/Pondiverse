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
- [Create your own client](#client)
- [Using other stores](#stores)
- [Using your own store](#store)

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

<h2 id="client">Create your own client</h2>

Pondiverse.com is a client for exploring pondiverse creations. You can create your own client too by using the `fetchPondiverseCreations` function.

```js
import { fetchPondiverseCreations } from "https://www.pondiverse.com/pondiverse.js";

const creations = await fetchPondiverseCreations();

// Then display the creations in some way...
```

<br />

<h2 id="stores">Using other stores</h2>

By default, the pondiverse stores creations in the [todepondiverse](https://todepond.com/pondiverse) store. Your client or tool can use other stores too. You can specify this by using the `instance` option. (This will eventually be renamed to `store`.)

This example shows how to use the [puddle](https://iliazeus.lol/puddle/) store.

```js
import { fetchPondiverseCreations } from "https://www.pondiverse.com/pondiverse.js";

const instance = {
  name: "puddle",
  home: "https://iliazeus.lol/puddle/",
  addCreation: "https://api.iliazeus.lol/puddle/creations",
  getCreation: "https://api.iliazeus.lol/puddle/creations/",
  getCreations: "https://api.iliazeus.lol/puddle/creations",
};

const creations = await fetchPondiverseCreations({ instance });
```

<h2 id="store">Using your own store</h2>

You can create your own store by creating all the endpoints that a store needs. Check out the [reference](/reference/) for the full details.

<br />
<br />
<br />
<br />
<br />
<br />
