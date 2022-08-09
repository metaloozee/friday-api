import express from "express";
import chalk from "chalk";
import Discord from "discord.js";
import fs from "fs";
import { Friday } from "../FridayClient";

const server = express();
const PORT = 3000;
const bot = new Friday({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildPresences,
  ],
});

export function createExpressServer() {
    server.get('/api/users/:userId', async (req, res) => {
        const {userId} = req.params
        const finalData = await bot.getUserInfo(userId);

        return res.status(200).json(finalData)
    })

    server.get("/", (_, res) => {
        const mainHTMLRoute = process.cwd() + "/public/index.html" 
        const bufferIndex = fs.readFileSync(mainHTMLRoute)
        return res.type('text/html').send(`
            <h2>This page is served from an Express app!</h2> ${bufferIndex}
        `);
      });
}

try {
  createExpressServer();
  bot.run();
  server.listen(PORT, () => {
    createExpressServer();
    console.log(`Server listening on PORT ${PORT}`);
  });
} catch (err) {
  throw new Error(err, {
    cause: err,
  });
}

bot.on("ready", (client: Friday) => {
  console.log(chalk.green(`Logged in as ${client.user.tag}`));
});
