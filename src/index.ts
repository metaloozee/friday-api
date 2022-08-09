import Fastify, { FastifyInstance } from "fastify";
import chalk from "chalk";
import Discord from "discord.js";
import { Friday } from "./FridayClient.js";

const server: FastifyInstance = Fastify();
const bot = new Friday({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildPresences,
  ],
});

/**
 * userId - discord ID of user
 */
server.get<{
  Params: {
    userId: string;
  };
}>("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const finalData = await bot.getUserInfo(userId);

  return finalData;
});

try {
  bot.run();
  await server.listen({ port: 3000 });
  console.log(chalk.green("Server listening on port 3000"));
} catch (err) {
  throw new Error(err, {
    cause: err,
  });
}

bot.on("ready", (client: Friday) => {
  console.log(chalk.green(`Logged in as ${client.user.tag}`));
});
