import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Post, usePosts } from './api'
import { createColumnHelper } from '@tanstack/react-table'


const columnHelper = createColumnHelper<Post>()

const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue()
  })
]

type Props = {}

const Posts = (props: Props) => {
  const posts = usePosts()
  // console.log(posts)
  return <div>Posts</div>
}

export default Posts
