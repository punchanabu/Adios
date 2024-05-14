export interface Member {
    id: string,
    username: string,
    discriminator: string,
    avatar: string,
    bot: boolean,
    joinedAt: string,
}