import { useState } from 'react'
import { Listdata, meetinglist, MeetingUser } from '../lib/api/scheduleview/getlist'

export type ScheduleValue = {
    key: number,
    date: String,
    event: String,
    time: String,
    location: String,
    meetname: String,
    meetcompany: String,
    isconfirm: String,
    ismeet: String,
    _id: String
}

export function useScheduleView() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const list = async(email: String) => {
    let result: Listdata| null = null;
    const data: ScheduleValue[] = []
      try {
        setLoading(true)
        result = await meetinglist(email)
      } catch (e: any) {
        if (e.response.status === 409) {
          setError('Username already exists')
          throw e
        }
      } finally {
        setLoading(false)
        if(result){
            console.log(result.data);
            let cnt:number = 0;
            for (const value of result.data) {
                cnt++;
                let stconfirm = "제안";
                let stmeet = "미팅전";

                if(value.confirm == true)   stconfirm = "확정";

                if(value.ismeet == 1)       stmeet = "못만남";
                else if(value.ismeet == 2)   stmeet = "만남";

                let stguestname = "";
                let cntguest:number = 0;
                for (const guest of value.guests) {
                    if(cntguest != 0)    stguestname += '\n';
                    stguestname += guest.name;
                    cntguest++;
                }

                let stguestcompany = "";
                cntguest = 0;
                for (const guest of value.guests) {
                    if(cntguest != 0)    stguestcompany += '\n';
                    stguestcompany += guest.company;
                    cntguest++;
                }

                const obj = {
                    key: cnt,
                    date: value.date,
                    event: value.event,
                    time:value.time,
                    location: value.location,
                    meetname: stguestname,
                    meetcompany: stguestcompany,
                    isconfirm: stconfirm,
                    ismeet: stmeet,
                    _id: value._id
                }
                data.push(obj)
            }
            console.log(data);
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
