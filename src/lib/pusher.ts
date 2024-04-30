import PusherSever from "pusher"
import PusherClient from "pusher-js"

export const pusherServer = new PusherSever({
    appId: process.env.NEXT_PUBLIC_APP_ID!,
    key: process.env.NEXT_PUBLIC_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "ap2",
    useTLS: true
});


export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_APP_KEY!, {
    cluster: "ap2",
    channelAuthorization: {
        endpoint: '/api/pusher/auth',
        transport: 'ajax',
    }
});