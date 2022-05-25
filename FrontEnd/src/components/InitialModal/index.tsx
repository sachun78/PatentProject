import { AutocompleteValue, Box, Button, Modal } from '@mui/material'
import ProfileCard from '../ProfileMenu/ProfileCard'
import useInputs from 'hooks/useInputs'
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { CountryType } from '../CountrySelector/CountrySelector'
import { patchProfile } from 'lib/api/me/getProfile'
import { boxWrapper, formWrapper } from './styles'
import useModal from 'hooks/useModal'
import useProfileQuery from 'hooks/query/useProfileQuery'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useProfileFormState } from 'atoms/profileFormState'
import IconControl from '../IconControl'
import styled from '@emotion/styled'

export type InitialModalProps = {}

function InitialModal({}: InitialModalProps) {
  const { data } = useProfileQuery()
  const { open, setOpen, handleClose } = useModal(false)
  const [phone] = useProfileFormState()
  const qc = useQueryClient()
  const mutation = useMutation(() => patchProfile({ ...form, field: fields, country, phone }), {
    onSuccess: (data) => {
      setOpen(false)
      qc.setQueryData('profile', data)
    },
    onError: (err: AxiosError) => {
      setError(err.message)
    },
  })
  const [error, setError] = useState<string | null>(null)
  const [form, onChange] = useInputs({
    company: '',
    department: '',
    position: '',
  })
  const { company, department, position } = form

  // COUNTRY CONTROL
  const [country, setCountry] = useState('AD')
  const handleCountry = (e: SyntheticEvent, v: AutocompleteValue<CountryType, undefined, undefined, undefined>) => {
    if (!v) return
    setCountry(v.code)
    console.log(v)
  }

  // FIELD CONTROL
  const [fields, setFields] = useState<string[]>([])
  const [fieldText, setFieldText] = useState('')

  const onChangeFieldText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldText(e.target.value)
  }

  const onFieldRemove = useCallback((tag_name: string) => {
    setFields((prevFields) => prevFields.filter((v) => v !== tag_name))
  }, [])

  const onFieldAdd = useCallback(() => {
    if (!fieldText && !fieldText.trim()) return
    const result = fields.find((value) => value === fieldText)
    if (result === undefined) {
      setFields([...fields, fieldText])
      setFieldText('')
    }
  }, [fieldText, fields])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)
      if (!form.company.trim() || !form.department.trim() || !form.position.trim()) {
        setError('Please enter all items')
        return
      }
      if (fields?.length === 0) {
        setError('Enter at least one of your fields')
        return
      }

      // MUTATION
      mutation.mutate()
    },
    [fields?.length, form.company, form.department, form.position, mutation]
  )

  useEffect(() => {
    if (data?.company === '') {
      setOpen(true)
    }
  }, [data?.company, setOpen])

  useEffect(() => {
    if (error === '') return
    toast.error(error, {
      position: 'bottom-center',
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      autoClose: 3000,
    })
    setError('')
  }, [error])

  return (
    <Modal open={open} onClose={handleClose} disableEscapeKeyDown disableEnforceFocus>
      <Box css={boxWrapper}>
        <form css={formWrapper} onSubmit={handleSubmit}>
          <HeaderDiv>
            <h3>
              <IconControl name={'profile'} /> Profile
            </h3>
            <div className="sub-comment">
              <p>Please enter your default profile.</p>
            </div>
          </HeaderDiv>
          <ProfileCard.Text
            title="Company"
            text={company}
            editable
            onChange={onChange}
            size={'small'}
            name={'company'}
          />
          <ProfileCard.Phone title="Phone number" size={'small'} />
          <ProfileCard.Text
            title="Department"
            text={department}
            editable
            onChange={onChange}
            size={'small'}
            name={'department'}
          />
          <ProfileCard.Text
            title="Position"
            text={position}
            editable
            onChange={onChange}
            size={'small'}
            name={'position'}
          />
          <ProfileCard.Field
            title="Field"
            text={fieldText}
            onChange={onChangeFieldText}
            onAdd={onFieldAdd}
            fields={fields}
            onRemove={onFieldRemove}
            editable
            size={'small'}
          />
          <ProfileCard.Country title="Country" onChange={handleCountry} country={country} editable size={'small'} />
          <Button className={'bot-button'} type="submit" color="primary" variant="contained">
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default InitialModal

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.875rem;

  h3 {
    display: flex;
    font: normal normal 800 18px/21px NanumSquareOTF;
    color: #910457;

    svg {
      margin-right: 5px;
    }
  }

  .sub-comment {
    font: normal normal normal 14px/26px NanumSquareOTF;
    color: #6c6c6c;
  }
`
