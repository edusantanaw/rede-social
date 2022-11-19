import React from 'react'
import Lista from '../../components/posts/Posts'

export const Posts = ({id}: {id: string}) => {
  return (
    <div>
        <Lista url={`/posts/user/${id}`} />
    </div>
  )
}
