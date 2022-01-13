import { useState } from 'react'
import { Listdata, UserInfo, findname } from '../lib/api/member/findname'

export type SearchUserResult = {
    name: String,
    email: String,
    company: String,
    department: String,
    position: String,
    country: String
  }

export function useFindName() {
    //const [loading, setLoading] = useState(false)
    //const [error, setError] = useState<string | null>(null)
    console.log('---------------------------------------------')
    const list = async(name: String) => {
    let result: Listdata | null = null;
    const data: SearchUserResult[] = []
      try {
        //setLoading(true)
        result = await findname(name)
      } catch (e: any) {
        if (e.response.status === 409) {
          //setError('Username already exists')
          throw e
        }
      } finally {
        //setLoading(false)
        if(result){
            for (const value of result.data) {
                const obj = {
                    name: value.name,
                    email: value.email,
                    company: value.company,
                    department: value.department,
                    position: value.position,
                    country: value.country
                }
                data.push(obj)
            }
            console.log(result)
            return data
        }
      }
    }

    return {
     list,
      //loading,
      //error,
    }
  }
