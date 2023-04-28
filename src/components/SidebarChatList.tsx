'use client'
import { authOptions } from '@/lib/auth'
import { chatHrefConstructor } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface SidebarChatListProps {
    friends: User[]
    sessionId: string
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends, sessionId }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [unseeMessages, setUnseeMessages] = useState<Message[]>([])

    useEffect(() => {
        if (pathname?.includes('chat')) {
            setUnseeMessages((prev) => {
                return prev?.filter((msg) => !pathname.includes(msg.senderId))
            })
        }
    }, [pathname])

    return (
        <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-4'>
            {friends.map((friend, index) => {
                const unseenMessagesCount = unseeMessages.filter((msg) => msg.senderId === friend.id).length
                return (
                    <li key={friend.id} className=''>
                        <a className='flex items-center gap-2' href={`/dashboard/chat/${chatHrefConstructor(sessionId, friend.id)}`}>
                            <div className='relative h-8 w-8'>
                                <Image
                                    fill
                                    referrerPolicy='no-referrer'
                                    className='rounded-full'
                                    src={friend.image}
                                    alt={`${friend.name}'s profile picture`}
                                />
                            </div>
                            <p className='font-medium text-lg text-slate-700'>{friend.name}</p>
                            {unseenMessagesCount > 0 && (
                                <div className='rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-slate-700'>
                                    {unseenMessagesCount}
                                </div>
                            )}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

export default SidebarChatList