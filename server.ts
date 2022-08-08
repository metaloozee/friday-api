import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { getUserInfo } from "./bot.js";
import chalk from "chalk";

const server: FastifyInstance = Fastify();

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
                            discord_status: { type: "string" }
                        }
                    },
                    presence: {
                        type: "object",
                        properties: {
                            spotify: {
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
                            }
                        }
                    }
                }
            }
        }
    }
}

server.get("/user/:params", options, async (req, res) => {
    const param: any = req.params;
    const data = await getUserInfo(param.params);
        
    return { user: data.user, presence: data.presence }

});

(async () => {
    try {
        await server.listen({ port: 3000 });
        await console.log(chalk.green("Server listening on port 3000"));
    } catch (err) {
        server.log.error(err);
    }
})();