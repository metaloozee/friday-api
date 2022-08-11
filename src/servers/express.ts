import * as dotenv from "dotenv";
import express from "express";
import chalk from "chalk";
import Discord from "discord.js";
import fs from "fs";
import { Friday } from "../FridayClient";

dotenv.config();

const server = express();
const { PORT } = process.env;

const bot = new Friday({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildPresences,
  ],
});

export function createExpressServer() {
  server.get("/api/users/:userId", async (req, res) => {
    const { userId } = req.params;
    const finalData = await bot.getUserInfo(userId);

    return res.status(200).json(finalData);
  });

  server.use(express.static('public'))
}

try {
  createExpressServer();
  bot.run();
  server.listen(+PORT || 8080, "0.0.0.0", () => {
    createExpressServer();
    console.log(chalk.green(`Server listening on PORT ${PORT || 8080}`));
  });
} catch (err) {
  throw new Error(err, {
    cause: err,
  });
}

bot.on("ready", (client: Friday) => {
  client.user.setPresence({
    activities: [
      { name: "your discord presence", type: Discord.ActivityType.Watching },
    ],
    status: "idle",
  });
  console.log(chalk.green(`Logged in as ${client.user.tag}`));
});
