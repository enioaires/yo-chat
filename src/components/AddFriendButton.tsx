'use client'
import { FC, useState } from 'react'
import Button from './ui/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addFriendValidator } from '@/lib/validations/add-friend'
import axios from 'axios'

interface AddFriendButtonProps {

}

type FormData = z.infer<typeof addFriendValidator>

const AddFriendButton: FC<AddFriendButtonProps> = ({ }) => {
    const [showSuccess, setShowSuccess] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(addFriendValidator)
    })

    const addFriend = async (email: string) => {
        try {
            const validatedEmail = addFriendValidator.parse({ email })

            await axios.post('/api/friends/add', { email: validatedEmail })

            setShowSuccess(true)
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError('email', { message: error.message })
                return
            }

            if (error instanceof axios.AxiosError) {
                setError('email', { message: error.response?.data ?? 'An server error occurred' })
                return
            }

            setError('email', { message: 'An unknown error occurred' })
        }
    }

    const onSubmit = (data: FormData) => {
        addFriend(data.email)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-sm'>
            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-200'>
                Email address
            </label>

            <div className='mt-2 flex gap-4'>
                <input
                    {...register('email')}
                    type="text"
                    className='block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gay-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    placeholder='email@example.com'
                />
                <Button type='submit'>Add</Button>
            </div>
            <p className='mt-1 text-sm text-red-500'>{errors.email?.message}</p>
            {showSuccess && <p className='mt-1 text-sm text-green-500'>Friend request sent!</p>}
        </form>
    )
}

export default AddFriendButton