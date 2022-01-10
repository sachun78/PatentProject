import { useState } from 'react'
import { Listdata, postlist } from '../lib/api/post/getviewpost'

export type PostValue = {
  email: String,
  postmessage: String,
  postdate: String,
  likecount: Number,
  _id: String
}

export function usePostView() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const list = async(email: String) => {
    let result: Listdata| null = null;
    const data: PostValue[] = []
      try {
        setLoading(true)
        result = await postlist(email)
      } catch (e: any) {
        if (e.response.status === 409) {
          setError('Username already exists')
          throw e
        }
      } finally {
        setLoading(false)
        if(result){
            let cnt:number = 0;
            for (let index = 0; index < result.data.length; index++) {
                cnt++;
                if( cnt === 10)  break;

                const obj = {
                    email: result.data[index].email,
                    postmessage: result.data[index].postmessage,
                    postdate:result.data[index].postdate,
                    likecount: result.data[index].likecount,
                    _id: result.data[index]._id
                }
                data.push(obj)
            }
            return data
        }
      }
    }

    return {
     list,
      loading,
      error,
    }
  }
