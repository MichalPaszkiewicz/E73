import { DefaultControlModule } from "./framework/services/defaultcontrolmodule";
import { DefaultDomainService } from "./framework/services/defaultdomainservice";
import { MiniFrontEndCommandHandler } from "./commandhandlers/frontendcommandhandler";
import { PowerOffCommand } from "./commands/poweroffcommand";
import { RestartCommand } from "./commands/restartcommand";

var controlModule = new DefaultControlModule(new DefaultDomainService());
var serverUrl = window.location.origin;

controlModule.registerCommandHandler(new MiniFrontEndCommandHandler(serverUrl));

document.getElementById("poweroff").onclick = (e) => {
    controlModule.handle(new PowerOffCommand());
}

document.getElementById("restart").onclick = (e) => {
    controlModule.handle(new RestartCommand());
}