import { useRouter } from 'next/router'
import React from 'react'
import { api } from '~/utils/api'
import CreatePost from '~/components/posts/createpost'
import Header from '~/components/navbar/navbar'
import Editpost from '~/components/posts/Editpost'
import Footer from '~/components/footer/footer'
import Image from 'next/image'
const ViewPost = () => {
  const router = useRouter()
  const { data: post, isLoading } = api.post.me.useQuery()
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [openEdit, setOpenEdit] = React.useState(false)
  const [id, setId] = React.useState('')

  const { mutate: deletePost, isLoading: isDeleting } = api.post.delete.useMutation({
    onSuccess: () => {
      router.replace('/dashboard/post')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const { mutate: updatePost, isLoading: isUpdating } = api.post.update.useMutation({
    onSuccess: () => {
      router.replace('/dashboard')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleEdit = async (id: string) => {
    setId(id)

    // mutate(id);

    setOpenEdit(true)
  }

  const truncateDescription = (description: string, maxLength: number) => {
    const words = description.split(' ')
    if (words.length > maxLength) {
      const truncatedWords = words.slice(0, maxLength)
      return `${truncatedWords.join(' ')}...`
    }
    return description
  }

  const maxWords = 80
  const handleDelete = async (id: string) => {
    try {
      await deletePost({ id })
      router.replace('/dashboard/post')
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  console.log(post)
  return (
    <>
      <div className='flex flex-col items-center justify-center gap-6'>
        <div>
          <Header />
        </div>
        <h1 className='text-2xl font-bold'>View Post</h1>

        <div className='flex-start ml-12 flex flex-row flex-wrap gap-4 p-9'>
          {post?.map((post) => (
            <>
              <div className='flex flex-col items-center rounded-xl border font-semibold shadow-sm'>
                <div
                  key={post.id}
                  className='flex min-h-[600px]  w-[400px] flex-col  rounded-xl border font-semibold shadow-sm'
                >
                  {' '}
                  {post?.image && (
                    <div className='border border-solid border-blue-800'>
                      <Image src={post.image} width={300} height={30} alt='img' />
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

                <div className='flex flex-row justify-evenly gap-10 p-3'>
                  <button
                    className='rounded-md bg-indigo-500 px-4 py-2 text-white'
                    onClick={() => handleEdit(post?.id)}
                  >
                    Edit
                  </button>
                  <button
                    className='rounded-md bg-red-500 px-4 py-2 text-white'
                    onClick={() => handleDelete(post?.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {/* { author ? <Author {...author}></Author> : <></>} */}
            </>
          ))}
        </div>
      </div>

      {openEdit && <Editpost setOpenEdit={setOpenEdit} id={id} />}

      <Footer />
    </>
  )
}

export default ViewPost
