<header
  id="view-source"
  style="position: absolute; top: 0; right: 0; padding: 16px">
  <a href="https://github.com/TodePond/Pondiverse" target="_blank"
    >View source</a
  >
</header>

<h1><a href="/" class="breadcrumb">Pondiverse</a> - Reference</h1>

This page lists all of the functions that are available to use from the pondiverse script.

For guides, go to the <a href="/learn">learn</a> page.\
For an example tool, look at the basic <a href="/tool">tool</a> page.

<br />

## `addPondiverseButton(getCreation, { instance? })`

Add the pondiverse button to your tool.

```js
import { addPondiverseButton } from "https://www.pondiverse.com/pondiverse.js";

addPondiverseButton(() => {
  return {
    title: "My example creation",
    type: "example",
    data: "example data",
    image: canvas?.toDataURL("image/png"),
  };
});
```

- `getCreation` - A function that returns your tool's creation. All properties are optional.
  - `title` - The title of the creation. Used to prefill the pondiverse dialog.
  - `type` - A string identifying what type of creation this is. This can be anything.
  - `data` - A string containing the data for the creation. This can be anything.
  - `image` - A string containing a base64 encoded image. This can be anything.
- `instance` - The instance to publish the creation to. Defaults to the todepondiverse.

<br />

## `openPondiverseDialog(getCreation, { instance? })`

Programmatically open the pondiverse dialog.

```js
import { openPondiverseDialog } from "https://www.pondiverse.com/pondiverse.js";

openPondiverseDialog(() => {
  return {
    title: "My example creation",
    type: "example",
    data: "example data",
    image: canvas?.toDataURL("image/png"),
  };
});
```

- `getCreation` - A function that returns your tool's creation. All properties are optional.
  - `title` - The title of the creation. Used to prefill the pondiverse dialog.
  - `type` - A string identifying what type of creation this is. This can be anything.
  - `data` - A string containing the data for the creation. This can be anything.
  - `image` - A string containing a base64 encoded image. This can be anything.
- `instance` - The instance to publish the creation to. Defaults to the todepondiverse.

<br />

## `fetchPondiverseCreations({ instance? })`

Fetch all creations from an instance.

```js
import { fetchPondiverseCreations } from "https://www.pondiverse.com/pondiverse.js";

const creations = await fetchPondiverseCreations();
```

- `instance` - The instance to fetch creations from. Defaults to the todepondiverse.

<br />

## `fetchPondiverseCreation(creation, { instance? })`

Fetch a single creation.

```js
import { fetchPondiverseCreation } from "https://www.pondiverse.com/pondiverse.js";

const creation = await fetchPondiverseCreation(123);
```

You can also pass in a creation url instead of an ID. This means you can use IDs and URLs interchangeably in your code.

```js
import { fetchPondiverseCreation } from "https://www.pondiverse.com/pondiverse.js";
const creation = await fetchPondiverseCreation(
  "https://pondiverse.val.run/get-creation?id=123"
);
```

- `creation` - The ID or the URL of a creation.
- `instance` - The instance to fetch the creation from. Defaults to the todepondiverse.

<br />

## `deletePondiverseCreation(creation, { password?, instance? })`

Delete a creation.

```js
import { deletePondiverseCreation } from "https://www.pondiverse.com/pondiverse.js";

await deletePondiverseCreation(123, {
  password: "password",
});
```

- `creation` - The ID of the creation to delete.
- `password` - The admin password of the instance. This is required on some instances.
- `instance` - The instance to delete the creation from. Defaults to the todepondiverse.

<br />

## `getPondiverseCreationImage(creation, { instance? })`

Get the image URL of a creation. This will eventually be deprecated, when the URL of a creation's image will be returned within `fetchPondiverseCreation` and `fetchPondiverseCreations`.

```js
import { getPondiverseCreationImage } from "https://www.pondiverse.com/pondiverse.js";

const creation = await fetchPondiverseCreation(123);
const imageUrl = getPondiverseCreationImage(creation);
```

- `creation` - The ID of the creation to get the image for.
- `instance` - The instance to get the image from. Defaults to the todepondiverse.

<br />

## Instance

Most functions have an optional `instance` option. This determines the instance to use when publishing and fetching creations. If not specified, it defaults to the [todepondiverse](https://todepond.com/todepondiverse).

The instance option is an object with the following properties. All are optional.

- `name` - The name of the instance. Used in user interfaces.
- `home` - The URL of the home page of the instance (if one exists).
- `addCreation` - The endpoint used to add new creations. It sends a POST request to this, with its body containing the creation's info.
- `getCreation` - The endpoint used to get an individual creation. It sends a GET request to this, appending the ID of the creation to the URL.
- `getCreationsImage` - The endpoint used to get the image of a creation. It sends a GET request to this, appending the ID of the creation to the URL.
- `getCreations` - The endpoint used to get all creations. It sends a GET request to this.
- `deleteCreation` - The endpoint used to delete a creation. It sends a POST request to this, with its body containing the ID of the creation to delete and a password.
