import { Navigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import React, { useCallback, useRef, useState } from 'react'
import { Box, Button, FormControlLabel, OutlinedInput, Radio, RadioGroup } from '@mui/material'
import { ContainerBlock, MeetingSection, UploadButton } from 'pages/Meeting/styles'
import { getEvent } from 'lib/api/event/getEvent'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import useInput from 'hooks/useInput'
import { createMeetingResult } from 'lib/api/meeting/createMeetingResult'
import { upload } from 'lib/api/meeting/resultUpload'
import styled from '@emotion/styled'
import { useRemoveOutlineHover } from 'lib/styles/muiStyles'
import IconControl from '../IconControl'
import useToggle from 'hooks/useToggle'
import patchResult from '../../lib/api/meeting/patchResult'

export type MeetingResultProps = {}

const API_PATH = process.env.REACT_APP_API_PATH

function MeetingResult({}: MeetingResultProps) {
  const { id } = useParams()
  const {
    data: metData,
    isLoading: isLoadingMet,
    refetch,
  } = useQuery(['meeting', id], () => getMeetingOne(id ?? ''), {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  const [editComment, toggleEditComment] = useToggle(false)
  const [comment, onChangeComment] = useInput(metData.history.result)
  const [result, onChange, setResult] = useInput('')
  const [metValue, setMetValue] = useState('')
  const [filePath, setFilePath] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const onMetChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMetValue(event.target.value)
    },
    [setMetValue]
  )
  const { data: eventData, isLoading } = useQuery(['event', metData.eventId ?? ''], getEvent, {
    enabled: !!metData.eventId,
    retry: false,
  })
  const metResultMut = useMutation(createMeetingResult, {
    onSuccess: () => {
      refetch()
    },
    onSettled: () => {
      setResult('')
      setMetValue('')
    },
  })

  const metResultPatch = useMutation(patchResult, {
    onSuccess: () => {
      refetch()
    },
  })

  const imgUplaodMut = useMutation(upload, {
    onSuccess: (res) => {
      setFilePath(res.fileName)
    },
  })

  const onFixResult = useCallback(() => {
    if (!editComment) {
      return toggleEditComment()
    }

    metResultPatch.mutate({ result: comment, meetingId: metData.history.id })
    toggleEditComment()
  }, [comment, editComment, metData.history.id, metResultPatch, toggleEditComment])

  const onImgUpload = useCallback(
    (e) => {
      e.preventDefault()
      const file = e.target.files?.[0]
      if (file) {
        const formData = new FormData()
        formData.append('mhistory_img', file)
        imgUplaodMut.mutate(formData)
      }
    },
    [imgUplaodMut]
  )

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!id) {
        return
      }
      if (!result.trim()) {
        alert('Please fill out the results')
        return
      }

      if (!metValue) {
        alert('please select met state')
        return
      }

      metResultMut.mutate({
        id,
        result: result.trim(),
        status: metValue === 'met',
        photopath: filePath,
      })
    },
    [filePath, id, metResultMut, metValue, result]
  )

  const removeHover = useRemoveOutlineHover()

  if (!eventData || isLoading || isLoadingMet) {
    return null
  }

  if (!metData) {
    return <Navigate to={'..'} />
  }

  return (
    <ContainerBlock>
      {!metData.history ? (
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
        >
          <MeetingSection>
            <h2>Result</h2>
            <OutlinedInput
              minRows={6}
              multiline
              value={result}
              placeholder={'Enter your text here'}
              onChange={onChange}
            />
          </MeetingSection>
          <MeetingSection>
            <h2>Photo</h2>
            <input
              ref={fileRef}
              onChange={onImgUpload}
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              name="mhistory_img"
            />
            {filePath ? (
              <Box
                component="span"
                sx={{
                  width: '405px',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#F2F2F2',
                }}
              >
                <ImgView src={`${API_PATH}static/${filePath}`} alt={'result-img'} crossOrigin="anonymous" />
              </Box>
            ) : (
              <UploadButton
                onClick={(e) => {
                  e.preventDefault()
                  fileRef?.current?.click()
                }}
              >
                <IconControl name={'add'} />
              </UploadButton>
            )}
          </MeetingSection>
          <MeetingSection>
            <h2>Whether we met or not</h2>
            <RadioGroup row onChange={onMetChange} value={metValue}>
              <FormControlLabel value="met" control={<Radio />} label="We met" />
              <FormControlLabel value="fail" control={<Radio />} label="Missed" />
            </RadioGroup>
          </MeetingSection>

          <Button
            type={'submit'}
            variant={'contained'}
            sx={{
              width: '150px',
              height: '28px',
              alignSelf: 'center',
              borderRadius: '1rem',
              font: 'normal normal normal 14px/26px NanumSquareOTF',
              textTransform: 'none',
            }}
          >
            Submit
          </Button>
        </form>
      ) : (
        <>
          <MeetingSection>
            <FixableHeader>
              <h2>Result</h2>
              <div onClick={onFixResult}>
                {editComment ? <IconControl name={'left'} /> : <IconControl name={'write'} />}
              </div>
            </FixableHeader>
            <OutlinedInput
              minRows={4}
              multiline
              value={comment}
              onChange={onChangeComment}
              classes={removeHover}
              readOnly={!editComment}
              inputProps={{
                style: {
                  color: '#6C6C6C',
                  font: 'normal normal normal 16px/26px NanumSquareOTF',
                },
              }}
              style={{ color: '#6C6C6C', border: editComment ? '1px solid #A1045A' : '1px solid black' }}
            />
          </MeetingSection>
          {metData.history.photopath && (
            <MeetingSection>
              <h2>Photo</h2>
              <Box
                component="span"
                sx={{
                  width: '405px',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#F2F2F2',
                }}
              >
                <ImgView
                  src={`${API_PATH}static/${metData.history.photopath}`}
                  alt={'result_photo'}
                  crossOrigin="anonymous"
                />
              </Box>
            </MeetingSection>
          )}
          <MeetingSection>
            <h2>Whether we met or not</h2>
            <RadioGroup row value={metData.history.status ? 'met' : 'fail'}>
              {metData.history.status ? (
                <FormControlLabel value="met" control={<Radio />} label="Met" />
              ) : (
                <FormControlLabel value="fail" control={<Radio />} label="Missed" />
              )}
            </RadioGroup>
          </MeetingSection>
        </>
      )}
    </ContainerBlock>
  )
}

const ImgView = styled.img`
  width: 255px;
  height: 170px;
`

const FixableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default MeetingResult
