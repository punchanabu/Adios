import React from 'react';
import type { Member } from '../../@types/member';
import MemberCard from './MemberCard';

interface MemberProps {
    members: Member[];
}

const MemberPanel: React.FC<MemberProps> = ({ members }) => {
    return (
        <section className="flex flex-col items-center justify-center space-y-16 p-10 w-full px-36">
            <div className='space-y-8'>
            <h1 className="text-5xl font-semibold text-center">Main Contributors</h1>
            <p className="text-lg text-center text-black">Thank you for contributing to adios by <span className='font-bold'>posting images</span> of it every day.</p>
            </div>
            <div className="w-full space-y-4">
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