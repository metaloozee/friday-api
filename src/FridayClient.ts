import * as dotenv from "dotenv";
import { Client, GuildMember } from "discord.js";
import { FridayClientResponse } from "./@types/userData";

dotenv.config();

const { TOKEN } = process.env;

export class Friday extends Client {
  run() {
    this.login(TOKEN);
  }

  async getUserInfo(id: string) {
    const member: GuildMember = this.guilds.cache
      .get(process.env.GUILD_ID)
      .members.cache.get(id);

    const data: FridayClientResponse = {
      user: {
        id: member.user.id,
        username: member.user.username,
        discriminator: member.user.discriminator,
        public_flags: member.user.flags.bitfield,
        bot: member.user.bot,
        avatar: member.user.displayAvatarURL(),
        banner: member.user.bannerURL(),
        discord_status: member.presence.status,
      },
    };

    member.presence.activities.forEach((m) => {
      console.log("m", m);
      const { name: currentActivity } = m;
      console.log();
      switch (currentActivity) {
        case "Spotify":
           data.spotify_presence = {
            track_id: m.party.id,
            timestamps: {
              start: m.timestamps.start.toString(),
              end: m.timestamps.end.toString(),
            },
            song: m.details,
            artist: m.state,
            album_name: m.assets.largeText,
            album_cover_url: m.assets.largeImage,
          };
        break;
        

        case "Visual Studio Code":
          data.vsc_presence = {
            details: m.details,
            state: m.state,
            timestamps: {
              start: m.timestamps.start.toString(),
              end: m.timestamps.end,
            },
            large_text: m.assets.largeText,
            small_text: m.assets.smallText,
            large_image: m.assets.largeImage,
            small_image: m.assets.smallImage,
          };
        break;
      }
    });

    return data as FridayClientResponse;
  }
}
