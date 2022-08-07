import { SlashCommandBuilder } from "discord.js";

const data = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with the ping!"),
        
    async execute(interaction) {
        await interaction.reply("pong!");
    }
}

export { data as SlashCommandBuilder };