'use client'
import { User } from 'lucide-react'
import Link from 'next/link'
import { FC, useState } from 'react'

interface FriendRequestSidebarOptionProps {
    sessionId: string
    initialUnseenRequestCount: number
}

const FriendRequestSidebarOption: FC<FriendRequestSidebarOptionProps> = ({ initialUnseenRequestCount, sessionId }) => {
    const [unseenRequestCount] = useState<number>(initialUnseenRequestCount)
    return (
        <Link href='/dashboard/requests' className='text-gray-700 group flex items-center gap-x-3 rounded-md text-sm leading-6 font-semibold'>
            <div className='text-gray-400 bg-white border-gray-200 group-hover:bg-slate-700 group-hover:text-white flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white]'>
                <User className='h-4 w-4' />
            </div>
            <p className='truncate'>Friend requests</p>

            {unseenRequestCount > 0 && (
                <div className='rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-slate-700'>{unseenRequestCount}</div>
            )}
        </Link>
    )
}

export default FriendRequestSidebarOption