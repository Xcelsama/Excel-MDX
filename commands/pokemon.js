js
module.exports = async (citel, text) => {
  const { commands } = require('../lib');

  let arr = [];
  const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()));
  if (!cmd) return await citel.reply("*❌ No Such commands.*");

  arr.push(`*🍁 Please provide a Pokémon name to search for.'; 
  :* ${cmd.pattern}`);
  const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`;
  const response = await fetch(url);
  const json = await response.json();
  if (!response.ok) {
    throw `An error occurred: ${json.error}`;
  }
  const message = `
*Name:* ${json.name}
*ID:* ${json.id}
*Type:* ${json.type}
*Abilities:* ${json.abilities}
*Height:* ${json.height}
*Weight:* ${json.weight}
*Description:* ${json.description}
`;
  citel.reply(message);
};
