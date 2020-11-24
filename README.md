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
  
* 0 : Dynamic gamma function. (__Black/white__)
  
* 1 : 0.25
  
* 2 : 0.45
  
* 3 : 0.75
  
* 4 : 1.00 (__default__)
  
* 5 : A2 Mode.
  
* 6 : A2 Mode.
  
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
  "Gamma": "4"
  "Handwriting": "1"
  "Mode": "3"
  "Status": "sync"
}
```

## Clear Ghost

  * This is the ghosting phenomenon of EPD. Use GC mode to eliminate ghost images.

## License
  * Copyright (C) 2020 E Ink Holdings Inc. company and Jongwaye Ou