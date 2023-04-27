'use client'
import { Check, UserPlus, X } from 'lucide-react'
import Image from 'next/image'
import { FC, useState } from 'react'

interface FriendRequestsProps {
    incomingFriendRequests: IncomingFriendRequest[]
    sessionId: string
}

const FriendRequests: FC<FriendRequestsProps> = ({ incomingFriendRequests, sessionId }) => {
    const [friendRequests] = useState<IncomingFriendRequest[]>(
        incomingFriendRequests
    )

    return (
        <>
            {friendRequests.length === 0 ? (
                <p className='text-sm'>Nothing to show here...</p>
            ) : (
                friendRequests.map((friendRequest) => {
                    return (
                        <div key={friendRequest.senderId} className='flex gap-4 items-center'>
                            <UserPlus className='text-white' />
                            <div className='relative h-8 w-8'>
                                <Image
                                    fill
                                    referrerPolicy='no-referrer'
                                    className='rounded-full'
                                    src={friendRequest.senderAvatar || ''}
                                    alt='Friend profile picture'
                                />
                            </div>
                            <p
                                className='font-medium text-lg text-white'>
                                {friendRequest.senderName?.split(' ')[0] + ' ' + friendRequest.senderName?.split(' ')[1]}
                            </p>
                            <div className='flex gap-2 bg-slate-200 rounded p-2'>
                                <button
                                    //   onClick={() => acceptFriend(request.senderId)}
                                    aria-label='accept friend'
                                    className='w-8 h-8 bg-green-600 hover:bg-green-700 grid place-items-center rounded-full transition hover:shadow-md'>
                                    <Check className='font-semibold text-white w-3/4 h-3/4' />
                                </button>
                                <div className='w-px h-8 bg-gray-400'></div>
                                <button
                                    //   onClick={() => denyFriend(request.senderId)}
                                    aria-label='deny friend'
                                    className='w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md'>
                                    <X className='font-semibold text-white w-3/4 h-3/4' />
                                </button>
                            </div>
                        </div>
                    )
                })
            )}
        </>
    )
}

export default FriendRequests