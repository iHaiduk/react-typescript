// import * as io from "socket.io-client";

// type socketDataType = string | ClassArray | undefined | null | false;
// interface ClassArray extends Array<socketDataType> { }
//
// interface SocketData {
//     data: socketDataType
// }

// const socket = io("http://localhost:1337", {
//     reconnection: true,
//     reconnectionAttempts: 10,
//     reconnectionDelay: 1000,
//     transports: ["websocket", "polling", "flashsocket"],
// });
//
// socket.on("connect", () => {
//     socket.emit("chat message", (+new Date()).toString());
//
// });
// socket.on("chat", (answ: string) => {
//     console.log("event", answ);
// });
// socket.on("disconnect", () => {
//     console.log("disconnect");
// });
