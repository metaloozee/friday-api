import * as dotenv from "dotenv";
import Discord, { Client, Collection, Interaction } from "discord.js";
import chalk from "chalk";
import { REST } from "@discordjs/rest";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";

dotenv.config();

interface command extends Client {
    commands?: any
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
    intents: [
        Discord.GatewayIntentBits.Guilds, 
        Discord.GatewayIntentBits.GuildMembers, 
        Discord.GatewayIntentBits.GuildPresences
    ]
}) as command;

// Reading commands from seperate files
const commands = []; 
client.commands = new Collection()

const rest: REST = new REST({ version: "10" }).setToken(process.env.TOKEN);
const commandFiles = fs.readdirSync(__dirname + "/commands").filter(file => file.endsWith(".ts"));
(async () => {
    for (const file of commandFiles) {
        const filePath = path.join(__dirname + "/commands", file);
        const command = await import("file://" + filePath);
        
        client.commands.set(command.SlashCommandBuilder.data.name, command.SlashCommandBuilder);
        commands.push(command.SlashCommandBuilder.data.toJSON())
    }
})();

client.on("ready", async (client: Client) => {
    await console.log(chalk.green(`Logged in as ${client.user.tag}`));

    // Publishing commands here
    await rest.put(Discord.Routes.applicationGuildCommands(client.user.id, "990992314853908500"), { body: commands })
        .then(() => console.log(chalk.green("Successfully registered application commands!")))
        .catch(console.error);
});

client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await console.log(chalk.gray(`Command used: /${interaction.commandName}, by: ${interaction.member.user.username}`))
        await command.execute(interaction as Interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
})

client.login(process.env.TOKEN);