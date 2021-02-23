## The use websocket for MeeNote web client.

This program requires MeeNote for Windows v2.5 WebSocket Server.

## Data Structure

<details>
  <summary>Status</summary>
  
* err : Error Message.
  
* sync : Synchronize server and client data.
  
* usbconnect : Device USB connection status. 
  
* usbdisconnect : Device USB disconnection status.
  
* rece : Server received message.
  
* setting : Client setting parameters.
  
* clear : Clear ghosts.
  
</details>

<details>
  <summary>Mode</summary>
  
  * __Mode will change according to wavefrom.__
  
* 0 : DU Mode.
  
* 1 : GC Mode.
  
* 2 : GL Mode.
  
* 3 : GLR Mode. (__default__)
  
* 4 : GLD Mode.
  
* 5 : A2 Mode.
  
</details>

<details>
  <summary>Handwriting</summary>
  
* 0 : Disable Handwriting.
  
* 1 : Enadble Handwriting. (__default__)
  
</details>

<details>
  <summary>Gamma</summary>
  
* 0 : Dynamic gamma function. (__black/white ratio__)
  
* 1 : 0.25
  
* 2 : 0.45
  
* 3 : 0.75
  
* 4 : 1.00 (__default__)
  
* 5 : 1.40
  
* 6 : 2.20
  
</details>

<details>
  <summary>Pen Width</summary>  
  
* 3 : 3 Pixel (__default__)

* 6  : 6  Pixel

* 9  : 9  Pixel

* 12 : 12 Pixel

* 15 : 15 Pixel
  
</details>

<details>
  <summary>Eraser Width</summary>
  
* 10 : Medium. (__default__)
  
* 20 : Large. 
  
</details>

<details>
  <summary>Msg</summary>
  
  * __Reserve.__  
  
</details>

## JSON Format

```json
{"Status":"sync","Mode":"3","Handwriting":"1","Gamma":"4"}
```

```json
{
	"Status": "sync",
	"Mode": "3",
	"Handwriting": "1",
	"Gamma": "4"
}
```

## Clear Ghost

  * This is the ghosting phenomenon of EPD. Use GC mode to clear ghost screen.

## Disable right-click menu

  ```javascript
    document.oncontextmenu = function(evt) {
      evt.preventDefault();
    };
    document.onselectstart = function(evt) {
      evt.preventDefault();
    };
```

## License
  * Copyright (C) 2020 E Ink Holdings Inc. company and Jongwaye Ou
