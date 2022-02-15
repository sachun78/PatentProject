import { AutocompleteValue, Avatar, Box, Button, Modal, Typography } from '@mui/material'
import { css } from '@emotion/react'
import useModal from '../../hooks/useModal'
import IconControl from '../IconControl'
import palette from '../../lib/palette'
import InfoViewSection from '../InfoView/InfoViewSection'
import InfoViewCard from '../InfoView/InfoViewCard'
import useInputs from '../../hooks/useInputs'
import React, { SyntheticEvent, useState } from 'react'
import { CountryType } from '../CountrySelector/CountrySelector'
import { useField } from '../../hooks/useField'
import { useProfile } from '../../hooks/useProfile'
import { patchProfile } from '../../lib/api/me/getProfile'
import { IProfile } from '../../lib/api/types'

export type AddtionalFormModalProps = {}

function AddtionalFormModal({}: AddtionalFormModalProps) {
  const { profile, loading, setProfile, open, setOpen,handleClose } = useProfile()
  const { field, fieldText, onChangeFieldText, add, remove } = useField()
  const [form, onChange] = useInputs({
    company: '',
    department: '',
    position: ''
  })

  //TODO(country makes to hook)
  const [country, setCountry] = useState('AD')
  const handleCountry = (e: SyntheticEvent, v: AutocompleteValue<CountryType, undefined, undefined, undefined>) => {
    if (!v) return
    setCountry(v.code)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.company || !form.department || !form.position) return alert('입력되지 않은 항목이 있습니다.')
    if (field?.length === 0) return alert('입력되지 않은 항목이 있습니다.')
    const request: IProfile = {
      company: form.company,
      department: form.department,
      position: form.position,
      field,
      country
    }
    try {
      const result = await patchProfile(request)
      if (result) {
        setProfile(result)
      }
    } catch (error) {
      console.log(error)
    }

    console.log(form.company, form.department, form.position)
    console.log(field)
    console.log(country)
    setOpen(false)
  }

  const handleFields = { onChange: onChangeFieldText, add, remove }

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
        Welcome Your First Login
      </Typography>
      <form css={formWrapper} onSubmit={handleSubmit}>
        <InfoViewSection title='Belonging' description={'This information also change on Profile page.'}>
          <InfoViewCard.Item title='company' type={'text'} description={form.company} isEditMode
                             onChange={onChange} />
          <InfoViewCard.Item title='department' type={'text'} description={form.department} isEditMode
                             onChange={onChange} />
          <InfoViewCard.Item title='position' type={'text'} description={form.position} isEditMode
                             onChange={onChange} />
          <InfoViewCard.Item title='field' type={'field'} fields={field} handleField={handleFields}
                             description={fieldText} isEditMode />
          <InfoViewCard.Item title='country' type={'country'} handleCountry={handleCountry}
                             countryValue={country} isEditMode />
        </InfoViewSection>
        <Button className={'bot-button'} type='submit' fullWidth color='primary' variant='contained'>OK</Button>
      </form>
    </Box>
  </Modal>
}

const boxWrapper = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;

  .css-1999axt-MuiAvatar-root {
    background-color: ${palette.blueGrey[600]};
  }

  svg {
    color: ${palette.blueGrey[100]};
  }
`

const formWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;

  .bot-button {
    height: 4rem;
  }
`

export default AddtionalFormModal
