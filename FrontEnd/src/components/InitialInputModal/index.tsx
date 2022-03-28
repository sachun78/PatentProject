import { AutocompleteValue, Avatar, Box, Button, Modal, Typography } from '@mui/material'
import IconControl from '../IconControl'
import ProfileSection from '../ProfileMenu/ProfileSection'
import ProfileCard from '../ProfileMenu/ProfileCard'
import useInputs from '../../hooks/useInputs'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { CountryType } from '../CountrySelector/CountrySelector'
import { patchProfile } from '../../lib/api/me/getProfile'
import { boxWrapper, formWrapper } from './styles'
import useModal from '../../hooks/useModal'
import useProfileQuery from '../../hooks/query/useProfileQuery'
import { useMutation, useQueryClient } from 'react-query'
import { errorMessageStyle } from '../../pages/Login/styles'
import { AxiosError } from 'axios'

export type InitialInputModalProps = {}

function InitialInputModal({}: InitialInputModalProps) {
  const { data } = useProfileQuery()
  const { open, setOpen, handleClose } = useModal(false)
  const qc = useQueryClient()
  const mutation = useMutation(() => patchProfile({ ...form, field: fields, country }), {
    onSuccess: (data) => {
      setOpen(false)
      qc.setQueryData('profile', data)
    },
    onError: (err: AxiosError) => {
      setError(err.message)
    }
  })
  const [error, setError] = useState<string | null>(null)
  // const { field, fieldText, onChangeFieldText, add, remove } = useField()
  const [form, onChange] = useInputs({
    company: '',
    department: '',
    position: ''
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
  const remove = (e: React.MouseEvent<SVGSVGElement>) => {
    const name = e.currentTarget.getAttribute('name')
    setFields(fields?.filter(v => v !== name))
  }
  const add = () => {
    if (fields === undefined) return
    if (fieldText === undefined) return
    const result = fields.find((value) => value === fieldText)
    if (result === undefined) {
      setFields([...fields, fieldText])
      setFieldText('')
      return
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.company || !form.department || !form.position) {
      setError('Please fill all fields')
      return
    }
    if (fields?.length === 0) {
      setError('Please add at least one field')
      return
    }

    // MUTATION
    mutation.mutate()
  }

  const handleFields = { onChange: onChangeFieldText, add, remove }

  useEffect(() => {
    if (data?.company !== '') {
      setOpen(true)
    }
  }, [data?.company])

  return <Modal
    open={open}
    onClose={handleClose}
    disableEscapeKeyDown
    disableEnforceFocus
  >
    <Box css={boxWrapper}>
      <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
        <IconControl name={'edit'} />
      </Avatar>
      <Typography component='h1' variant='h3'>
        Welcome Your First Connetion
      </Typography>
      <form css={formWrapper} onSubmit={handleSubmit}>
        <ProfileSection title='Belonging' description={'This information also change on Profile page.'}>s
          <ProfileCard.Text title='company' text={company} editable onChange={onChange} />
          <ProfileCard.Text title='department' text={department} editable onChange={onChange} />
          <ProfileCard.Text title='position' text={position} editable onChange={onChange} />
          {/*<ProfileCard.Item title='field' type={'field'} fields={field} handleField={handleFields}*/}
          {/*                  description={fieldText} isEditMode />*/}
          <ProfileCard.Field title='field' text={fieldText} onChange={onChangeFieldText}
                             onAdd={add} fields={fields} onRemove={() => {
          }} editable />
          <ProfileCard.Country title='country' onChange={handleCountry}
                               country={country} editable />
        </ProfileSection>
        {error && <span css={errorMessageStyle}>{error}</span>}
        <Button className={'bot-button'} type='submit' fullWidth color='primary' variant='contained'>OK</Button>
      </form>
    </Box>
  </Modal>
}

export default InitialInputModal
