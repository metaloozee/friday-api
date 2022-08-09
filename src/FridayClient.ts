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
    let member: GuildMember;

    try {
      member = this.guilds.cache
        .get(process.env.GUILD_ID)
        .members.cache.get(id) as GuildMember;
    } catch (err) {
      return {
        error: true,
        message: `Are you sure user with ID ${id} is in a server the bot is set up in?`,
      };
    }

    if (!member) {
      return {
        error: true,
        message: `Are you sure user with ID ${id} is in a server the bot is set up in?`,
      };
    }

    const finalData = {
      user: {
        id: member.user.id,
        username: member.user.username,
        discriminator: member.user.discriminator,
        public_flags: member.user.flags.bitfield,
        bot: member.user.bot,
        avatar: member.user.displayAvatarURL(),
        banner: member.user.bannerURL(),
        discord_status: member.presence?.status || "offline",
      },
      activites: [],
    };

    member.presence?.activities.forEach((m) => {
      return finalData.activites.push(m);
    });

    return finalData as FridayClientResponse;
  }
}
