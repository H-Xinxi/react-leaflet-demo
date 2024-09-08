import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {  z } from "zod"

const postSchema = z.object({
    id: z.number(),
    body: z.string(),
    title: z.string(),
    userId: z.number(),
})
const postsSchema = z.array(postSchema)
type PostDto = z.infer<typeof postSchema>
export type Post = {
    id: number,
    title: string,
}



export const usePosts = () => {
    const { data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
          const res = await axios.get<unknown>('/api/posts')
        //   const data = res.dat
          const {error, data,success} = postsSchema.safeParse(res.data)
          
          if(!success) {
            return []
          }
          
          return data
        },
        select(dto):Post[] {
            return dto.map(post => ({
                id: post.id,
                title: post.title,
            }))
        },
        
      })
    
    
      return posts
}