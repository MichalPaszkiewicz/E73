export var getRequest = (serverUrl: string, requestUrl: string) => {
    var req = new XMLHttpRequest();
    req.open("GET", serverUrl + requestUrl, false);
    req.send(null);
}

export var postRequest = (serverUrl: string, requestUrl: string, data?: any) => {
    var req = new XMLHttpRequest();
    req.open("POST", serverUrl + requestUrl, false);
    req.send(JSON.stringify(data));
}