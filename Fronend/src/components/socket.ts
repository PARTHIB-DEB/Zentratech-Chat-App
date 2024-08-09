import { io, Socket } from "socket.io-client";

interface SendMessageFormat {
  sender_username: string;
  sender_message: string;
}

interface ReceiveMessageFormat {
  type: string;
  sender_username: string;
  receiver_username: string;
  sender_message: string;
  receiver_message: string;
}

let socket: Socket | null = null;

export const connect = (url: string): void => {
    socket = io(url);
    console.log("Socket connected.");
};

export function chat (sendMessageData?: SendMessageFormat, onReceive?: (messageData: ReceiveMessageFormat) => void): void {
    if (!socket) return;

    if (sendMessageData) {
        socket.emit("chat", sendMessageData);
    }

    if (onReceive) {
        socket.on("chat_message", (msg: ReceiveMessageFormat) => {
        console.log("Message received:", msg);
        onReceive(msg);
        });
    }
};

export const disconnect = (): void => {
    if (socket) {
        socket.disconnect();
        console.log("Socket disconnected.");
    }
};
