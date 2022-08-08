import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import chalk from "chalk";
import Discord from "discord.js";
import { Friday } from "./FridayClient.js";

// Schemas
import { FridayResponseSchema } from "./schema/schema.js";

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
}>("/users/:userId", FridayResponseSchema, async (req, res) => {
  const { userId } = req.params;
  const data = await bot.getUserInfo(userId);

  return {
    user: data.user,
    spotify_presence: data.spotify_presence,
    vsc_presence: data.vsc_presence,
  };
});

(async () => {
  try {
    bot.run();
    await server.listen({ port: 3000 });
    console.log(chalk.green("Server listening on port 3000"));
  } catch (err) {
    server.log.error(err);
  }
})();

bot.on("ready", (client: Friday) => {
  console.log(chalk.green(`Logged in as ${client.user.tag}`));
});
