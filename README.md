# Friday
**A REST API which provides you the information of any discord account including their Spotify & VS-Code activity!**

This is an open sourced repository initially made for educational purposes, we are using Discord.js & Fastify to make this, if you would like to collaborate or want to implement more things you are free to fork this repository and submit a Push Request when you feel you are good to go!

**You can also join our [Discord Support Server](https://discord.gg/WkWZ9Y4P62) to request features or to use the realtime api.**

## Installing

In order to use Friday, you'd ideally need to install it on your local machine. To do so,

* Clone the repository

```
git clone https://github.com/MetalOoze05/friday-api.git
```

Or if you have `gh` installed on your machine, you could instead run:
```bash
gh repo clone MetalOoze05/friday-api
```

* Once cloned, switch directory and install dependencies:

```bash
cd friday-api
yarn install
```


## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`TOKEN` - Your Discord Bot token

`GUILD_ID` - The Server's ID in which you want to setup Friday

`PORT` - The PORT on which your app will be listening to
 

Once the environment variables are set, you're good to run Friday! To do so, run:

For Express Instance:
```bash
yarn run "watch e"
```
For Fastify Instance:
```bash
yarn run "watch f"
```

Thanks!

 ~ MetalOoze
