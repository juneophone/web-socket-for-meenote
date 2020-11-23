    var webSocket   = null;
    var ws_protocol = null;
    var ws_hostname = null;
    var ws_port     = null;
    var ws_endpoint = "";

    /**
     * Device data structure
     */
    var device = new Object();
      device.Status      = "err";
      device.Mode        = "3";
      device.Handwriting = "1";
      device.Gamma       = "4";
      device.Msg         = "0";

    /**
     * Event handler for clicking on button "Connect"
     */
    function onConnectClick() {
        var ws_protocol = document.getElementById("protocol").value;
        var ws_hostname = document.getElementById("hostname").value;
        var ws_port     = document.getElementById("port").value;
        //var ws_endpoint = document.getElementById("endpoint").value;
        openWSConnection(ws_protocol, ws_hostname, ws_port, ws_endpoint);
    }
    /**
     * Event handler for clicking on button "Disconnect"
     */
    function onDisconnectClick() {
        webSocket.close();
    }
    /**
     * Open a new WebSocket connection using the given parameters
     */
    function openWSConnection(protocol, hostname, port, endpoint) {
        var webSocketURL = null;
        webSocketURL = protocol + "://" + hostname + ":" + port + endpoint;
        console.log("openWSConnection::Connecting to: " + webSocketURL);
        try {
            webSocket = new WebSocket(webSocketURL);
            webSocket.onopen = function(openEvent) {
                //console.log("WebSocket OPEN: " + JSON.stringify(openEvent, null, 4));
                //document.getElementById("btnSend").disabled       = false;
                document.getElementById("btnConnect").disabled    = true;
                document.getElementById("btnDisconnect").disabled = false;
                //document.getElementById("btnClear").disabled      = false;
                document.getElementById("btnClearGhost").disabled = false;
                document.getElementById("btnMsg").disabled        = false;
              
                document.getElementById("handwriting").disabled   = false;
                document.getElementById("mode").disabled          = false;
                document.getElementById("gamma").disabled         = false;
                
                document.getElementById("incomingMsgOutput").value += "System: MeeNote connection security. \r\n";
            };
            webSocket.onclose = function (closeEvent) {
                //console.log("WebSocket CLOSE: " + JSON.stringify(closeEvent, null, 4));
                //document.getElementById("btnSend").disabled       = true;
                document.getElementById("btnConnect").disabled    = false;
                document.getElementById("btnDisconnect").disabled = true;
                //document.getElementById("btnClear").disabled      = true;
                document.getElementById("btnClearGhost").disabled = true;
                document.getElementById("btnMsg").disabled        = true;
              
                document.getElementById("handwriting").disabled   = true;
                document.getElementById("mode").disabled          = true;
                document.getElementById("gamma").disabled         = true;
              
                document.getElementById("incomingMsgOutput").value += "System: MeeNote program closes. \r\n";
            };
            webSocket.onerror = function (errorEvent) {
                console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
            };
            webSocket.onmessage = function (messageEvent) {
                var wsMsg = messageEvent.data;
                console.log("WebSocket MESSAGE: " + wsMsg);
                if (wsMsg.indexOf("error") > 0) {
                    document.getElementById("incomingMsgOutput").value += "error: " + wsMsg.error + "\r\n";
                } else {
                  //document.getElementById("incomingMsgOutput").value += "message: " + wsMsg + "\r\n";
                  //console.log("message: " + wsMsg + "\r\n");
                }
              
                // JSON String Decode
                if(isJsonString(wsMsg)){
                  device = JSON.parse(wsMsg);
                  
                  switch (device.Status) {
                    case 'sync':
                      // get/set connect event json string
                      document.getElementById("mode").options[device.Mode].selected               = true;
                      document.getElementById("handwriting").options[device.Handwriting].selected = true;
                      document.getElementById("gamma").options[device.Gamma].selected             = true;
                      break;
                    case 'err':
                      console.log("device.Status = err !!"); 
                      break;
                    case 'usbconnect':
                      document.getElementById("incomingMsgOutput").value += "message: MeeNote USB Connection \r\n";
                      document.getElementById("btnSend").disabled       = false;
                      document.getElementById("btnClearGhost").disabled = false;
                      document.getElementById("btnMsg").disabled        = false;
                      break;
                    case 'usbdisconnect':
                      document.getElementById("incomingMsgOutput").value += "message: MeeNote USB DisConnection \r\n";
                      document.getElementById("btnSend").disabled       = true;
                      document.getElementById("btnClearGhost").disabled = true;
                      document.getElementById("btnMsg").disabled        = true;
                      break;
                    case 'rece':
                      if(device.Msg) {
                        document.getElementById("incomingMsgOutput").value += "Received: Setting successfully. \r\n";  
                      } else {
                        document.getElementById("incomingMsgOutput").value += "Received: The setting parameters are incorrect. \r\n";
                      }
                      break;
                  }
                  
                  console.log(device);    
                } else {
                  console.log("The received string is not JSON.");  
                }             
            };
        } catch (exception) {
            console.error(exception);
        }
    }
    /**
     * Setting parameter to the WebSocket server
     */
    function onSendClick() {        
        device.Status        = "setting" 
        device.Mode          = document.getElementById("mode").value;
        device.Handwriting   = document.getElementById("handwriting").value;
        device.Gamma         = document.getElementById("gamma").value;
        setToMeeNote();
        // print log
        //var deviceStr = JSON.stringify(device);
        //console.log("JSON String = " + deviceStr);
    }

    /**
     * Clear all message
     */
    function onClearClick() {
        document.getElementById("incomingMsgOutput").value = "";
    }

    /**
     * Clear Ghost
     */
    function onClearGhostClick() {        
        device.Status        = "clear" 
        device.Mode          = "1";
        device.Handwriting   = document.getElementById("handwriting").value;
        device.Gamma         = document.getElementById("gamma").value;
        setToMeeNote();
        setTimeout(() => { onSendClick(); }, 2000);  //sleep 2 sec
    }

    /**
     * Send Message
     */
    function onMsgClick() {
        if (webSocket.readyState != WebSocket.OPEN) {
            console.error("webSocket is not open: " + webSocket.readyState);
            return;
        }        
        var msg = document.getElementById("message").value;
        webSocket.send(msg);        
    }

    // JSON
    function isJsonString(str) {
      try {
        if (typeof JSON.parse(str) == "object") {
          return true;
        }
      } catch(e) {
        return false;
      }
    }

    /**
     * setting to MeeNote
     */
    function setToMeeNote() {
        if (webSocket.readyState != WebSocket.OPEN) {
            console.error("webSocket is not open: " + webSocket.readyState);
            return;
        }        
        webSocket.send(JSON.stringify(device));        
        console.log("Set JSON String = " + JSON.stringify(device));
        
    }
  