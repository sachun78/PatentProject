import { css } from '@emotion/react'
import { IconButton } from '@mui/material'
import { usePostSearchInputState } from 'atoms/searchInputState'
import IconControl from 'components/IconControl'
import React, { Dispatch, useCallback, useState } from 'react'

export type PostSearchBoxProps = {
  filter: Dispatch<string>
}

function PostSearchBox({ filter }: PostSearchBoxProps) {
  const [value, setValue] = usePostSearchInputState()
  const [bdColor, setBdColor] = useState('#9C9C9C')

  const onChange = useCallback(
    (e) => {
      setValue(e.target.value)
      if (e.target.value === '') {
        filter('')
      }
    },
    [filter, setValue]
  )

  const onSearch = useCallback(
    (e) => {
      e.preventDefault()
      filter(value)
    },
    [filter, value]
  )

  const onFocus = () => {
    setBdColor('#910457')
  }

  const onBlur = () => {
    setBdColor('#9C9C9C')
  }

  return (
    <form
      css={searchBoxStyle}
      style={{ width: '15.625rem', borderColor: `${bdColor}`, justifyContent: 'space-between' }}
      onFocus={onFocus}
      onBlur={onBlur}
      onSubmit={onSearch}
    >
      <input
        type="text"
        placeholder="Search"
        style={{ background: 'transparent', border: 'none' }}
        value={value}
        onChange={onChange}
      />
      <IconButton type="submit" sx={{ p: 0 }} aria-label="search">
        <IconControl name={'searchIcon'} />
      </IconButton>
    </form>
  )
}

export default PostSearchBox

const searchBoxStyle = css`
  padding: 0.5rem 0.75rem;
  border: 1px solid #910457;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 15.625rem;
  justify-content: space-between;

  input {
    width: 12.5rem;
    height: 1.375rem;
  }

  input::placeholder {
    color: #d9d9d9;
  }

  input:focus {
    outline: none;
  }
`
