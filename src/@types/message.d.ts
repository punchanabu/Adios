// The Message that was stored in the database
export interface Message {
    id: number;
    discordId: string;
    content: string;
    author: string;
    imageUrl?: string; 
    channelId: string;
    createdAt: Date;
}