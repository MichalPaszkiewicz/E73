var keys = {};
var serverUrl = "http://localhost:3000";

var getRequest = (requestUrl) => {
    console.log("calling: " + requestUrl);
    var req = new XMLHttpRequest();
    req.open("GET", serverUrl + requestUrl, false);
    req.send(null);
}

var postRequest = (requestUrl, data) => {
    console.log("posting: " + data + " to: " + requestUrl);
    var req = new XMLHttpRequest();
    req.open("POST", serverUrl + requestUrl, false);
    req.send(data);
}

var setKeyState = (keyName, state, requestUrl) => {
    if(keys[keyName] === state){
        return;
    }
    keys[keyName] = state;
    getRequest(requestUrl);
}

document.onkeydown = e => {
    switch (e.code) {
        case "ArrowLeft":
            setKeyState("left", true, "/left/on");
            break;
        case "ArrowRight":
            setKeyState("right", true, "/right/on");
            break;
        case "ArrowUp":
            setKeyState("up", true, "/up/on");
            break;
        case "ArrowDown":
            setKeyState("down", true, "/down/on");
    }
}

document.onkeyup = e => {
    switch (e.code) {
        case "ArrowLeft":
            setKeyState("left", false, "/left/off");
            break;
        case "ArrowRight":
            setKeyState("right", false, "/right/off");
            break;
        case "ArrowUp":
            setKeyState("up", false, "/up/off");
            break;
        case "ArrowDown":
            setKeyState("down", false, "/down/off");
    }
}

trimleft.onclick = e => {
    postRequest("/trim/left");
}

trimright.onclick = e => {
    postRequest("/trim/right");
}

speed.onchange = e => {postRequest("/speed", e.target.value)}