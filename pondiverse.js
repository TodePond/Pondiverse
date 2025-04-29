export default {
  name: "pondiverse.com",

  instances: [
    {
      name: "pondiverse.com",
      urls: {
        frontend: "https://pondiverse.com",
        config: "https://pondiverse.com/pondiverse.js",
        list: "https://todepond--33148208245911f0bc54569c3dd06744.web.val.run/creations?page=",
        get: "https://todepond--33148208245911f0bc54569c3dd06744.web.val.run/creations?json&c=",
        getImage:
          "https://todepond--33148208245911f0bc54569c3dd06744.web.val.run/creation?c=",
        post: "https://todepond--33148208245911f0bc54569c3dd06744.web.val.run/creations",
      },
    },
  ],

  types: {
    screenpond: {
      docs: "https://github.com/TodePond/ScreenPond",
    },
    chaoskit: {
      docs: "https://github.com/ChaosKit/prototypes/tree/master/05-coffeescript",
    },
    pnmrsimjs: {
      docs: "https://mags.omg.lol/simulator.php",
    },
    codepond: {
      docs: "https://github.com/elouangrimm/CodePond",
    },
    cherry: {
      docs: "https://cherry.cthulahoops.org/sketch.js",
    },
    collapse: {
      docs: "https://collapse.cthulahoops.org/main.js",
    },
    bitart: {
      docs: "https://iliazeus.lol/bitart/",
    },
    "real-shader": {
      docs: "https://garten.salat.dev/real-shaders.html",
    },
    "fake-shader": {
      docs: "https://garten.salat.dev/fake-shaders2.html",
    },
  },

  tools: [
    {
      name: "ScreenPond",
      types: {
        // comma-separated glob list (glob matching not implemented yet)
        creates: "screenpond",
        // empty string means opens nothing (yet)
        opens: "",
      },
      urls: {
        create: "https://screenpond.cool/",
      },
    },
    {
      name: "ChaosKit",
      types: {
        creates: "chaoskit",
        opens: "",
      },
      urls: {
        create: "https://evolved.systems/chaoskit/",
      },
    },
    {
      name: "pNMRsimJS",
      types: {
        creates: "pnmrsimjs",
        opens: "",
      },
      urls: {
        create: "https://mags.omg.lol/simulator.php",
      },
    },
    {
      name: "CodePond",
      types: {
        creates: "codepond",
        opens: "",
      },
      urls: {
        create: "https://codepond.elouan.xyz/",
      },
    },
    {
      name: "cherry.cthulahoops.org",
      types: {
        creates: "cherry",
        opens: "",
      },
      urls: {
        create: "https://cherry.cthulahoops.org/",
      },
    },
    {
      name: "collapse.cthulahoops.org",
      types: {
        creates: "collapse",
        opens: "",
      },
      urls: {
        create: "https://collapse.cthulahoops.org/",
      },
    },
    {
      name: "BitArt",
      types: {
        creates: "bitart",
        opens: "bitart",
      },
      urls: {
        create: "https://iliazeus.lol/bitart/",
        open: "https://iliazeus.lol/bitart/?creation=",
      },
    },
    {
      name: "real shaders",
      types: {
        creates: "real-shader",
        opens: "real-shader",
      },
      urls: {
        create: "https://garten.salat.dev/real-shaders.html",
        open: "https://garten.salat.dev/real-shaders.html?creation=",
      },
    },
    {
      name: "faking shaders II",
      types: {
        creates: "fake-shader",
        opens: "fake-shader",
      },
      urls: {
        create: "https://garten.salat.dev/fake-shaders2.html",
        open: "https://garten.salat.dev/fake-shaders2.html?creation=",
      },
    },
  ],
};
