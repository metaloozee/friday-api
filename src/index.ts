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
        Discord.GatewayIntentBits.GuildPresences
    ]
});



server.get("/users/:params", FridayResponseSchema, async (req, res) => {
    const param: any = req.params;
    const data = await bot.getUserInfo(param.params);
        
    return { user: data.user, spotify_presence: data.spotify_presence, vsc_presence: data.vsc_presence }

});

(async () => {
    try {
        await bot.run();
        await server.listen({ port: 3000 });
        await console.log(chalk.green("Server listening on port 3000"));
    } catch (err) {
        server.log.error(err);
    }
})();

bot.on("ready", async (client: Friday) => {
    await console.log(chalk.green(`Logged in as ${client.user.tag}`));
})