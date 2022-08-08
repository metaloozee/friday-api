export type FridayClientResponse = {
    user: {
        id: string,
        username: string,
        discriminator: string,
        public_flags: number,
        bot: boolean,
        avatar: string,
        banner: string,
        discord_status: string
    },
    spotify_presence?: {
        track_id: string,
        timestamps: {
            start: string,
            end: string
        },
        song: string,
        artist: string,
        album_name: string, 
        album_cover_url: string
    },
    vsc_presence?: {
        details: string,
        state: string,
        timestamps: {
            start: string,
            end: any
        },
        large_text: string,
        small_text: string,
        large_image: string,
        small_image: string
    }
}