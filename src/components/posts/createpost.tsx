import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import { cn } from '~/utils/cn'
import { MdClose } from 'react-icons/md'
import { FaImage } from 'react-icons/fa'
import Footer from '../footer/footer'

const CreatePost = () => {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const [isCreating, setIsCreating] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [contentError, setContentError] = useState(false)
  const [imageError, setImageError] = useState(false)

  const { mutate } = api.post.create.useMutation({
    onSuccess: () => {
      router.replace('/')
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  const removeImagePreview = () => {
    setImagePreview(null)
    setImage(null)
    setImageError(false)
  }
  const uploadImageToCloudinary = async () => {
    if (!image) return null
    if (image.size > 10485760) {
      setImageError(true)
      return null
    }

    const formData = new FormData()

    formData.append('file', image)
    formData.append('upload_preset', 'blog-post')
    console.log(formData)

    const response = await fetch('https://api.cloudinary.com/v1_1/dp4graubh/image/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    return data.secure_url
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (title.trim() === '') {
      setTitleError(true)
      return
    }
    if (content.trim() === '') {
      setContentError(true)
      return
    }

    setIsCreating(true)

    try {
      const imageUrl = (await uploadImageToCloudinary()) as string
      console.log(imageUrl)

      await mutate({ title, content, imageUrl })
    } catch (error) {
      console.log(error)
    }

    setIsCreating(false)
  }

  return (
    <>
      <div className='mt-10 flex flex-col items-center justify-center gap-4 p-10'>
        <div className='flex h-[500px] w-[500px] flex-col items-center justify-center gap-4'>
          <h1 className='text-2xl font-bold'>Create Post</h1>
          <form className='flex h-full w-full flex-col gap-4'>
            <input
              type='text'
              placeholder='Title'
              required
              className={cn(
                'rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                titleError && 'border-red-500'
              )}
              onChange={(e) => {
                setTitle(e.target.value)
                setTitleError(false)
              }}
            />
            {titleError && <p className='text-sm text-red-500'>Title is required.</p>}
            <textarea
              placeholder='Content'
              required
              className={cn(
                'h-[300px] rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                contentError && 'border-red-500'
              )}
              onChange={(e) => {
                setContent(e.target.value)
                setContentError(false)
              }}
            />
            {contentError && <p className='text-sm text-red-500'>Content is required.</p>}

            <div className='relative mt-4'>
              {imagePreview ? (
                <div className='flex h-24 w-24 items-center justify-center bg-gray-100'>
                  <img
                    src={imagePreview}
                    alt='Image Preview'
                    className='h-full w-full object-cover'
                  />
                  <button
                    className='absolute right-0 top-0 rounded-full bg-white p-1'
                    onClick={removeImagePreview}
                  >
                    <MdClose size={20} />
                  </button>
                </div>
              ) : (
                <div className='flex h-full w-full items-center justify-center rounded-md border border-gray-300'>
                  <label htmlFor='fileInput' className='cursor-pointer'>
                    <FaImage className='h-8 w-8 text-gray-400' />
                    <span className='mt-2 text-sm'>Select Image</span>
                  </label>
                  <input
                    id='fileInput'
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                  />
                </div>
              )}
              {imageError && (
                <p className='mt-1 text-sm text-red-500'>
                  Invalid image. Please choose a smaller file (less than 10MB)S .
                </p>
              )}
            </div>
            <button
              type='submit'
              className={cn(
                'rounded-md bg-indigo-500 px-4 py-2 text-white',
                isCreating && 'cursor-not-allowed opacity-50'
              )}
              onClick={handleSubmit}
              disabled={isCreating}
            >
              {!isCreating ? 'Create' : 'Creating...'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreatePost
