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
        
    },
    vsc_presence?: {
       
    }
}