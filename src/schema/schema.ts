import {RouteShorthandOptions} from 'fastify'

export const FridayResponseSchema: RouteShorthandOptions = {
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