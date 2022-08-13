import { App, GenericMessageEvent } from "@slack/bolt";
import Config from "./config.json";
import SlackActionWrapper from "./slackActionWrapper";
import log4js from "log4js";
import CommandNaming from "./content/commandRegister";


export async function processBotRoutine(){
    const app: App = new App({
        token: Config.botToken,
        appToken: Config.appToken,
        
        socketMode: true
    });

    const slackAction = new SlackActionWrapper(app, Config)
    await slackAction.postMessage("Initializing...")

    const commandNaming = new CommandNaming(Config.botName);

    app.event("message", async ({event, say}) =>{
        const messageEvent: GenericMessageEvent = event as GenericMessageEvent
        slackAction.postMessage("received: " + messageEvent.text as string);
    });

    await app.start();

    log4js.getLogger().info("Bolt app is running up.");

    await slackAction.postMessage("App is running up.");
}


