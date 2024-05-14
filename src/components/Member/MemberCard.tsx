import React from 'react';

interface MemberCardProps {
    id: string;
    username: string;
    avatar: string;
    maintainer?: boolean;
}

const MemberCard: React.FC<MemberCardProps> = ({ id, username, avatar, maintainer}) => {

    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <img
                src={`https://cdn.discordapp.com/avatars/${id}/${avatar}.png`}
                alt={username}
                className="w-24 h-24 rounded-full shadow-lg"
            />
            <p className="text-2xl font-semibold">{username}</p>
            { maintainer ? <p>Adios Maintainer</p> : <p>Member</p>}
        </div>
    );
}

export default MemberCard;