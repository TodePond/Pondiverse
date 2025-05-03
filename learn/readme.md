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

## Or... make your own button, styles, and features

If you find that the above function and it's button is a bit limiting, you can just try to reverse engineer the existing code on the other tools!

For example, in CodePond, the pondiverse script and library are not even used! What it does is it makes the HTTP request itself, while reusing the original pondiverse code.

```js
const PONDIVERSE_INSTANCE_URL = "https://pondiverse.val.run";

// format the json request
const request = {
  title: nameInput.value,
  data: hiddenDataInput.value,
  type: hiddenTypeInput.value,
  image: previewImage.src,
};

// make API call to the instance
const response = await fetch(
  new URL("/add-creation", PONDIVERSE_INSTANCE_URL),
  {
    method: "POST",
    body: JSON.stringify(request),
  }
);

if (response.ok) {
  closePondiverseDialog();
}
```

For full working code, you can check out the `example.js` file [here](https://pondiverse.com/learn/example.js/), which includes a setup to make a custom button and posting method.

### Step-by-step instructions

1. In your HTML, put in this div where you want the share button: 

```html
<div id="pondiverse-controls"></div>
```

2. Then, add the `example.js` file provided, rename it to `pondiverse.js` or whatever you like, and import the script tag in your HTML:

```html
<script src="pondiverse.js"></script>
```