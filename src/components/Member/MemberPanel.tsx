import React from 'react';
import type { Member } from '../../@types/member';
import MemberCard from './MemberCard';

interface MemberProps {
    members: Member[];
}

const MemberPanel: React.FC<MemberProps> = ({ members }) => {
    return (
        <section className="flex flex-col items-center justify-center space-y-8 p-10 w-full">
            <h1 className="text-5xl font-bold text-center">Contributors</h1>
            <p className="text-lg text-center">Thank you for contributing to adios by posting images of it every day.</p>
            <div className="w-full">
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
                  {members.slice(0, 3).map((member: Member) => (
                      <MemberCard key={member.id} id={member.id} avatar={member.avatar} username={member.username} maintainer={true}/>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-3">
                    {members.slice(3, 5).map((member: Member) => (
                        <MemberCard key={member.id} id={member.id} avatar={member.avatar} username={member.username} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MemberPanel;