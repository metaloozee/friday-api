import { EmbedBuilder, GuildMember, Interaction, SlashCommandBuilder } from "discord.js";

const data = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("gives you some information :D")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("user's information")
                .setRequired(false)    
        ),

    async execute(interaction) {
        let data: GuildMember = await interaction.options.getMember("user");

        if (data) {
            let embed = new EmbedBuilder()
                .setTitle("User Info")
                .setColor("Aqua")
                .addFields(
                    { name: "Username:", value: data.user.username, inline: true },
                    { name: "Discriminator:", value: data.user.discriminator, inline: true },
                    { name: "ID:", value: data.user.id, inline: true }
                )
                .setThumbnail(data.user.displayAvatarURL())
                .setFooter({ text: `Executed by ${interaction.member.user.tag}`, iconURL: interaction.member.user.displayAvatarURL() })
                .setTimestamp();
            
            await interaction.reply({ embeds: [embed] });
        } else {
            let userData: GuildMember = interaction.member;

            let embed = new EmbedBuilder()
                .setTitle("User Info")
                .setColor("Aqua")
                .addFields(
                    { name: "Username:", value: userData.user.username, inline: true },
                    { name: "Discriminator:", value: userData.user.discriminator, inline: true },
                    { name: "ID:", value: userData.user.id, inline: true }
                )
                .setThumbnail(userData.user.displayAvatarURL())
                .setFooter({ text: `Executed by ${interaction.member.user.tag}`, iconURL: interaction.member.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }
    }
}

export { data as SlashCommandBuilder };