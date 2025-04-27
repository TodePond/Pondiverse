const participants = {
  screenpond: { url: "https://screenpond.cool/" },
  chaoskit: { url: "https://evolved.systems/chaoskit/" },
  pnmrsimjs: { url: "https://mags.omg.lol/simulator.php" },
  codepond: { url: "https://codepond.elouan.xyz/" },
  cherry: { url: "https://cherry.cthulahoops.org/" },
  bitart: { url: "https://iliazeus.lol/bitart/" },
};

export function getTypeUrl(type) {
  type = type.toLowerCase();
  return participants[type]?.url;
}

export function getTypes() {
  const types = [];
  for (const type in participants) {
    const participant = participants[type];
    types.push({ name: type, url: participant.url });
  }
  return types;
}
