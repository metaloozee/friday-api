import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import chalk from "chalk";
import Discord from "discord.js";
import { Friday } from "./FridayClient.js";

const server: FastifyInstance = Fastify();
const bot = new Friday({
    intents: [
        Discord.GatewayIntentBits.Guilds, 
        Discord.GatewayIntentBits.GuildMembers, 
        Discord.GatewayIntentBits.GuildPresences
    ]
});

const options: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    user: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            username: { type: "string" },
                            discriminator: { type: "string" },
                            public_flags: { type: "number" },
                            bot: { type: "boolean" },
                            avatar: { type: "string" },
                            banner: { type: "string" },
                            discord_status: { type: "string" }
                        }
                    },
                    spotify_presence: {
                        type: "object",
                        properties: {
                            track_id: { type: "string" },
                            timestamps: {
                                type: "object",
                                properties: {
                                    start: { type: "string" },
                                    end: { type: "string" },
                                },
                            },
                            song: { type: "string" },
                            artist: { type: "string" },
                            album_name: { type: "string" },
                            album_cover_url: { type: "string" }
                        }
                    },
                    vsc_presence: {
                        type: "object",
                        properties: {
                            details: { type: "string" },
                            state: { type: "string" },
                            timestamps: {
                                type: "object",
                                properties: {
                                    start: { type: "string" },
                                    end: { type: "string" }
                                },
                            },
                            large_text: { type: "string" },
                            small_text: { type: "string" },
                            large_image: { type: "string" },
                            small_image: { type: "string" },
                        }
                    }
                }
            }
        }
    }
}

server.get("/users/:params", options, async (req, res) => {
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