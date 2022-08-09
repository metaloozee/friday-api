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

    // This does not need to be typed, I don't think.

    const finalData = {
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
      activites: [],
    };

    member.presence.activities.forEach((m) => {
      return finalData.activites.push(m);
    });

    return finalData as FridayClientResponse;
  }
}
