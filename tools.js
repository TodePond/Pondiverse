//         Add your own tool!!!
//
// Instructions:
//
// add your tool using any of the tools below
// if your tool can process esiting creations (see the learn page)
// then add mething like ?creation= to the url.
//
// if you want custom INLINE styles, add styles: "" to your tool like the example.
// or, if you just want your own theme color, add color="#ffffff" (pick a color) to the tool!
// we'll handle it ourselves.

export const tools = [
  //  {
  //    name: "exampletool"
  //    types: ["example"]
  //    url: "https://example.com/?creation="
  //    color: "#ffffff"
  //    styles: "border: dashed"
  //  }

  {
    name: "screenpond",
    types: ["screenpond"],
    url: "https://screenpond.cool?creation=",
  },
  {
    name: "chaoskit",
    types: ["chaoskit"],
    url: "https://evolved.systems/chaoskit/?creation=",
  },
  {
    name: "pnmrsimjs",
    types: [],
    url: "https://mags.omg.lol/simulator.php",
  },
  {
    name: "CodePond",
    types: ["CodePond"],
    url: "https://codepond.elouan.xyz/?creation=",
    color: "#d946ef",
  },
  {
    name: "cherry",
    types: [],
    url: "https://cherry.cthulahoops.org/",
  },
  {
    name: "collapse",
    types: ["collapse"],
    url: "https://collapse.cthulahoops.org/?creation=",
  },
  {
    name: "bitart",
    types: ["bitart"],
    url: "https://iliazeus.lol/bitart/?creation=",
  },
  {
    name: "real shaders",
    types: ["real-shader"],
    url: "https://garten.salat.dev/real-shaders.html?creation=",
  },
  {
    name: "fake shaders II",
    types: ["fake-shader"],
    url: "https://garten.salat.dev/fake-shaders2.html?creation=",
  },
  {
    name: "cellpond",
    types: ["cellpond"],
    url: "https://cellpond.cool?creation=",
  },
  {
    name: "arrayer",
    types: ["arrayer"],
    url: "https://gaimeri.github.io/text-tools/arrayer.html?creation=",
  },
  {
    name: "pondiverse",
    types: ["*"],
    url: "https://pondiverse.com/tool/?creation=",
  },
  {
    name: "talise",
    types: ["talise"],
    url: "https://ernestum.net/talise/?id=",
  },
  {
    name: "meme",
    types: ["*"],
    urls: {
      open: "https://pondmemes.cthulahoops.org/?creation=",
      create: null,
    },
  },
  {
    name: "gamify",
    types: ["collapse"], // Eventually "*", but for the moment...
    urls: {
      open: "https://gamify.cthulahoops.org/?creation=",
      create: null,
    },
  },
  {
    name: "styleshoot",
    types: ["styleshoot"],
    url: "https://ponder.ooo/styleshoot.html",
  },
];
