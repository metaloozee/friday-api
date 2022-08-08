export type data = {
    user: {
        id: string,
        username: string,
        discriminator: string,
        public_flags: number,
        bot: boolean,
        avatar: string,
        discord_status: string
    },
    presence?: {
        spotify?: {
            track_id: string,
            timestamps: {
                start: string,
                end: string
            },
            song: string,
            artist: string,
            album_name: string,
            album_cover_url: string
        }
    }
}