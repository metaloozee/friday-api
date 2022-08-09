import Fastify, { FastifyInstance } from "fastify";
import chalk from "chalk";
import Discord from "discord.js";
import fs from 'fs'
import { Friday } from "./FridayClient";

const server: FastifyInstance = Fastify();
const bot = new Friday({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildPresences,
  ],
});

export function createServer() {
  /**
   * userId - discord ID of user
   */
  server.get<{
    Params: {
      userId: string;
    };
  }>("/api/users/:userId", async (req, res) => {
    const { userId } = req.params;
    const finalData = await bot.getUserInfo(userId);

    return finalData;
  });

  server.get("/", (req, res) => {
    const mainHTMLRoute = process.cwd() + "/public/index.html" 
    const bufferIndex = fs.readFileSync(mainHTMLRoute)
    res.type('text/html').send(bufferIndex);
  });
}

try {
  createServer();
  bot.run();
  server.listen({ port: 3000 });
  console.log(chalk.green("Server listening on port 3000"));
} catch (err) {
  throw new Error(err, {
    cause: err,
  });
}

bot.on("ready", (client: Friday) => {
  console.log(chalk.green(`Logged in as ${client.user.tag}`));
});
