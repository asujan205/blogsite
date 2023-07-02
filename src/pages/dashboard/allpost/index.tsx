import { useRouter } from 'next/router'
import React from 'react'
import { api } from '~/utils/api'
import Image from 'next/image'
import Footer from '~/components/footer/footer'
import Link from 'next/link'

const ViewPost = () => {
  const router = useRouter()
  const { data: posts, isLoading } = api.post.all.useQuery()

  const truncateDescription = (description: string, maxLength: number) => {
    const words = description.split(' ')
    if (words.length > maxLength) {
      const truncatedWords = words.slice(0, maxLength)
      return `${truncatedWords.join(' ')}...`
    }
    return description
  }

  const maxWords = 80 // Maximum number of words to show before "Read More"

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className='mt-15 flex   justify-center  p-10'>
        <div className=' flex-start ml-8 flex flex-row flex-wrap gap-10  '>
          {posts?.map((post) => (
            <div
              key={post.id}
              className='flex min-h-[600px]  w-[400px] flex-col  rounded-xl border font-semibold shadow-sm'
            >
              {' '}
              {post?.image && (
                <div className=' h-[350px] w-[400px] border border-solid  border-blue-800'>
                  {/* <Image
                  src={post.image}
                  width={250}
                  height={30}
                  alt="img"
                  className="rounded-t-xl"
                /> */}
                  <div className='images relative'>
                    <Link href={`/dashboard/allpos    t/${post.id}`}>
                      <Image src={post?.image} className='rounded' width={400} height={30} alt='' />
                    </Link>
                  </div>
                </div>
              )}
              <div className='cat flex flex-row justify-between gap-5 p-3'>
                <a className='cursor-pointer text-orange-600 hover:text-orange-800'>
                  {post?.author?.email}
                </a>
                <a className='cursor-pointer text-gray-800 hover:text-gray-600'>
                  - {new Date(post?.createdAt).toLocaleDateString()}
                </a>
              </div>
              <div className='flex flex-col items-center'>
                <h1
                  className='cursor-pointer text-3xl font-bold text-gray-800 hover:text-gray-600 md:text-6xl'
                  onClick={() => {
                    router.push(`/dashboard/allpost/${post.id}`)
                  }}
                >
                  {post?.title || 'Unknown'}
                </h1>
              </div>
              <div className='mt-4 h-full w-full overflow-y-auto bg-gray-200 pl-3'>
                <p className='text-gray-500'>
                  {truncateDescription(post?.content || 'description', maxWords)}
                  {post?.content && post?.content.split(' ').length > maxWords && (
                    <span
                      className='cursor-pointer text-blue-500 hover:text-blue-700'
                      onClick={() => {
                        router.push(`/dashboard/allpost/${post?.id}`)
                      }}
                    >
                      Read More
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ViewPost
