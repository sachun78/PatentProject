import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCurrentEventState } from 'atoms/eventState'
import useDateTimeHook from 'hooks/useDateTimeHook'
import useInputs from 'hooks/useInputs'
import { createMeeting } from 'lib/api/meeting/createMeeting'
import RequestSection from './RequestSection'
import { toast } from 'react-toastify'
import { buttonStyle, PeriodBlock, sectionStyle } from './styles'
import { Navigate, useNavigate } from 'react-router-dom'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { networkUserFindModalState, useMeetingReqUser } from 'atoms/meetingReqState'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Checkbox, FormControlLabel, OutlinedInput } from '@mui/material'
import { ContainerBlock, MeetingSection } from 'pages/Meeting/styles'
import { getEvent } from 'lib/api/event/getEvent'
import TimeGridInput from 'components/DatePickerInput/TimeGridInput'
import { getProfilebyEmail } from 'lib/api/me/getProfile'
import { format } from 'date-fns'
import ProfileBox from 'components/ProfileBox'
import { IMeeting, IProfile } from 'lib/api/types'
import useToggle from 'hooks/useToggle'
import PhoneInput from 'components/PhoneInput'
import PhoneInputT from 'react-phone-number-input'
import LoadingButton from '@mui/lab/LoadingButton'
import IconControl from 'components/IconControl'
import { useRemoveOutlineHover } from 'lib/styles/muiStyles'
import { useSpring } from 'react-spring'
import NetworkFindModal from 'components/NetworkFindModal'
import { useRecoilState } from 'recoil'

type RequestViewProps = {}

export default function RequestForm({}: RequestViewProps) {
  const [curEvent] = useCurrentEventState()
  const [meetuser, setMeetuser] = useMeetingReqUser()
  const { startDate, endDate } = useDateRangeHook()
  const { date, time, setDate, setTime } = useDateTimeHook()
  const [endTime, setEndTime] = useState<Date | null>(null)
  const [, setOpen] = useRecoilState(networkUserFindModalState)
  const [isDefaultComment, onToggleIsDefaultComment] = useToggle(false)
  const [phone, setPhone] = useState('')
  const onChangePhone = useCallback((value?: any | undefined) => {
    setPhone(value)
  }, [])
  const navi = useNavigate()
  const qc = useQueryClient()
  const ref = useRef(null)
  const [form, onChange] = useInputs({
    comment: '',
    title: '',
    to: '',
    firm: '',
    name: '',
    location: '',
  })

  const springProps = useSpring({
    delay: 100,
    transform: 'translateX(0px)',
    from: {
      transform: 'translateX(100%)',
    },
  })

  // Get Current Event
  const { data: event, isLoading } = useQuery(['event', curEvent.id], getEvent, {
    enabled: !!curEvent.id,
    retry: false,
  })

  // Get User Profile
  const {
    data: profileData,
    isLoading: profileLoading,
    refetch,
  } = useQuery(['profile', meetuser || form.to], getProfilebyEmail, {
    enabled: !!meetuser,
    retry: false,
    staleTime: 5000,
  })

  const profile = useMemo(() => qc.getQueryData<IProfile>('profile'), [qc])
  const filteredTimeEvent = useMemo(() => {
    if (!event) return []
    return (event.meeting_list as IMeeting[]).filter((meeting: IMeeting) => {
      return meeting.status === 'confirm'
    })
  }, [event])

  const createScheduleMut = useMutation(createMeeting, {
    onSuccess: () => {
      toast.success('Meeting Request Success', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      })
      qc.invalidateQueries(['meetings'])
      navi('/meeting')
    },
    onError: () => {
      toast.error('Something Error', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      })
    },
  })

  const onChangeDate = useCallback(
    (change: Date) => {
      setDate(change)
    },
    [setDate]
  )

  const onChangeTime = useCallback(
    (change: Date) => {
      setTime(change)
    },
    [setTime]
  )

  const onChangeEndTime = useCallback((change: Date) => {
    setEndTime(change)
  }, [])

  const onBlur = useCallback(
    (e) => {
      e.preventDefault()
      if (!form.to.trim()) {
        return
      }
      refetch()
    },
    [form.to, refetch]
  )

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const { title, to, comment } = form
      if ((!to.trim() && !meetuser) || !title.trim() || !time || !endTime) {
        // if ((!to.trim() && !meetuser) || !location.trim() || !title.trim() || !time || !endTime) {
        toast.error('Please fill out the form', {
          position: toast.POSITION.TOP_CENTER,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          autoClose: 3000,
        })
        return
      }

      const toCompany = profileData?.company ? profileData.company : form.firm
      const toName = profileData?.username ? profileData.username : form.name
      const toPhone = profileData?.phone ? profileData.phone : phone

      console.log(toCompany, toName, toPhone)

      createScheduleMut.mutate({
        eventId: curEvent.id,
        title,
        date,
        startTime: time,
        endTime,
        location: form.location,
        toEmail: meetuser ? meetuser.toLowerCase() : to.toLowerCase(),
        toCompany,
        toName,
        toPhone,
        comment: !isDefaultComment ? comment : profile?.signature ?? '',
      })
    },
    [
      createScheduleMut,
      curEvent.id,
      date,
      endTime,
      form,
      isDefaultComment,
      meetuser,
      phone,
      profile?.signature,
      profileData?.company,
      profileData?.phone,
      profileData?.username,
      time,
    ]
  )

  useEffect(() => {
    setDate(startDate)

    return () => {
      setMeetuser('')
    }
  }, [])

  const classes = useRemoveOutlineHover()

  if (curEvent.id === '') {
    return <Navigate to={'/meeting'} />
  }

  if (isLoading || !event) {
    return <div>Loading..</div>
  }

  return (
    <ContainerBlock style={{ ...springProps }}>
      <form css={sectionStyle} onSubmit={onSubmit}>
        <h1>{curEvent.title}</h1>
        <PeriodBlock>
          <IconControl name={'date'} />
          <span>
            {format(new Date(startDate), 'EEEE, d MMM, yyyy') + ' - ' + format(new Date(endDate), 'EEEE, d MMM, yyyy')}
          </span>
        </PeriodBlock>
        <MeetingSection>
          <h2>Display the Meeting</h2>
          <OutlinedInput
            name="title"
            type={'text'}
            value={form.title}
            onChange={onChange}
            placeholder={'Enter a title that will be used to represent the meeting'}
            classes={classes}
            sx={{ height: 38 }}
            fullWidth
          />
        </MeetingSection>
        <MeetingSection>
          <h2>Participant's email</h2>
          {meetuser ? (
            <span>{meetuser}</span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <OutlinedInput
                name="to"
                type={'email'}
                value={form.to}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={'Meeting Email'}
                fullWidth
                sx={{ height: 38 }}
                classes={classes}
              />
              <div style={{ marginLeft: 8 }} onClick={() => setOpen(true)}>
                <IconControl name={'searchIcon'} />
              </div>
            </div>
          )}
          {profileData && <ProfileBox profileData={profileData} />}
        </MeetingSection>
        {!profileData && !profileLoading && form.to && (
          <>
            <MeetingSection title={'Name'}>
              <h2>Name</h2>
              <OutlinedInput
                name="name"
                type={'text'}
                value={form.name}
                onChange={onChange}
                placeholder={'Enter a name to request'}
                classes={classes}
                sx={{ height: 38 }}
                fullWidth
              />
            </MeetingSection>
            <MeetingSection title={'Firm'}>
              <h2>Firm</h2>
              <OutlinedInput
                name="firm"
                type={'text'}
                value={form.firm}
                onChange={onChange}
                placeholder={'Enter the firm'}
                classes={classes}
                sx={{ height: 38 }}
                fullWidth
              />
            </MeetingSection>
            <MeetingSection title={'Phone'}>
              <h2>Phone</h2>
              <PhoneInputT
                placeholder="Enter phone number"
                value={phone}
                onChange={onChangePhone}
                inputComponent={PhoneInput}
                ref={ref}
                international
                style={{ width: '100%' }}
              />
            </MeetingSection>
          </>
        )}
        <MeetingSection title={'Period'}>
          <h2>Period</h2>
          <TimeGridInput
            startTime={time}
            endTime={endTime}
            date={date}
            startDate={startDate}
            endDate={endDate}
            timeChange={(sDate: Date, eDate: Date) => {
              onChangeTime(sDate)
              onChangeEndTime(eDate)
            }}
            timeEvent={filteredTimeEvent}
            dateChange={onChangeDate}
            unavailables={event.restricted_time}
          />
        </MeetingSection>
        {/* <RequestSection title={'Location'}>
          <LocationInput onChange={onChangeLocation} value={location} />
        </RequestSection>
        {detailOpen && ( */}
        <MeetingSection title={'Location'}>
          {/* <RequestSection title={'Detail address'}> */}
          <h2>Location</h2>
          <OutlinedInput
            name="location"
            type={'text'}
            value={form.location}
            onChange={onChange}
            placeholder={'Enter detailed address'}
            classes={classes}
            sx={{ height: 38 }}
            fullWidth
          />
        </MeetingSection>
        {/* // )} */}
        <RequestSection
          title={'Comment'}
          checkButton={
            profile?.signature && (
              <FormControlLabel
                control={
                  <Checkbox
                    value={isDefaultComment}
                    onClick={onToggleIsDefaultComment}
                    sx={{ width: '10px', height: '10px', svg: { width: '10px', height: '10px' } }}
                  />
                }
                label="Use a default comment"
                sx={{
                  span: { fontSize: '14px', fontWeight: 800, color: '#910457', fontFamily: 'NanumSquareOTF' },
                  marginRight: 0,
                }}
              />
            )
          }
        >
          <OutlinedInput
            placeholder="Leave a message"
            name="comment"
            value={!isDefaultComment ? form.comment : profile?.signature}
            onChange={!isDefaultComment ? onChange : undefined}
            multiline
            fullWidth
            minRows={3}
            classes={classes}
          />
        </RequestSection>
        <LoadingButton css={buttonStyle} variant={'contained'} loading={createScheduleMut.isLoading} type={'submit'}>
          Propose Meeting
        </LoadingButton>
      </form>
      <NetworkFindModal />
    </ContainerBlock>
  )
}
