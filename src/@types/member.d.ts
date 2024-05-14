export interface Member {
    id: string,
    username: string,
    discriminator: string,
    avatar: string,
    bot: boolean,
    joinedAt: string,
}

export interface AdiosStat {
    author: string;
    count: number;
}