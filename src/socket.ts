/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { io } from "socket.io-client";

let socket: any;

export const initializeSocket = () => {
    if (!socket) {
        socket = io("http://localhost:4000/", {
            auth: {
                infoUser: Math.floor(Math.random() * 10),
                autoConnect: false,
            },
        });

        socket.connect();
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
