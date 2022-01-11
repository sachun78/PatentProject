import { useState } from 'react'
import { Listdata, mynetworklist, MyNetworkResult, mynetworkup, mynetworkupdatefind, mynetworkupdatecount, mynetworkupdatepeople } from '../lib/api/MyNetwork/getlist'

export type MyNetworkValue = {
  key: number,
  name: String,
  email: String,
  meet_name: String,
  meet_email: String,
  meet_company: String,
  meet_department: String,
  meet_position: String,
  meet_tel: String,
  meet_country: String,
  meet_count: Number
}

export function useMyNetwork() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const list = async(email: String) => {
    let result: Listdata| null = null;
    const data: MyNetworkValue[] = []
      try {
        setLoading(true)
        result = await mynetworklist(email)
      } catch (e: any) {
        if (e.response.status === 409) {
          setError('Username already exists')
          throw e
        }
      } finally {
        setLoading(false)
        if(result){
            let cnt:number = 0;
            let value = result.data;
            for (const meet of value.meetpeople) {
                cnt++;
                const obj = {
                    key: cnt,
                    name: value.name,
                    email: value.email,
                    meet_name: meet.name,
                    meet_email: meet.email,
                    meet_company: meet.company,
                    meet_department: meet.department,
                    meet_position: meet.position,
                    meet_tel: meet.tel,
                    meet_country: meet.country,
                    meet_count: meet.meetcount
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

  export function useMyNetworkup() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const list = async (input: MyNetworkResult) => {
      try {
        setLoading(true)
        const result = await mynetworklist(input.email)
      } catch (e: any) {
        if (e.response.status === 409) {
          try {
            const upresult = await mynetworkup(input)
            setLoading(false)
          } catch (e: any) {
            throw e;
          }
        }
      } finally {
        for (const value of input.meetpeople) {
          let meetcnt = 0
        try {
          const findresult = await mynetworkupdatefind(input.email, value.email)
          meetcnt = <number>findresult
        } catch (e: any) {
          if (e.response.status === 409) {
            try {
              // new people
              const upresult = await mynetworkupdatepeople(input.email, value)
              setLoading(false)
            } catch (e: any) {
              throw e;
            }
          }
        } finally {
          // count
          try {
            const countresult = await mynetworkupdatecount(input.email, value.email, meetcnt)
          } catch (e: any) {
            throw e;
          }
        }
        }
        setLoading(false)
      }
    }
    return {
      list,
      loading,
      error,
    }
  }
