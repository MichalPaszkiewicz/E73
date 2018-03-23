export var getRequest = (serverUrl: string, requestUrl: string) => {
    console.log("calling: " + requestUrl);
    var req = new XMLHttpRequest();
    req.open("GET", serverUrl + requestUrl, false);
    req.send(null);
}

export var postRequest = (serverUrl: string, requestUrl: string, data?: any) => {
    console.log("posting: " + data + " to: " + requestUrl);
    var req = new XMLHttpRequest();
    req.open("POST", serverUrl + requestUrl, false);
    req.send(JSON.stringify(data));
}