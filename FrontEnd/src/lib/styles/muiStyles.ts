import { makeStyles } from '@mui/styles'

export const useFocusOutlineStyle = makeStyles(() => ({
  root: {
    '&:focus-within': {
      border: '1px solid #910457',
    },
    border: '1px solid #9C9C9C',
  },
}))
export const useRemoveOutlineHover = makeStyles(() => ({
  root: {
    '& $notchedOutline': {
      borderWidth: 0,
    },
    '&:hover $notchedOutline': {
      borderWidth: 0,
    },
    '&$focused $notchedOutline': {
      borderWidth: 0,
    },
    border: '1px solid #9C9C9C',
    borderRadius: '1rem',
    backgroundColor: '#fff',
    font: 'normal normal normal 14px/26px NanumSquareOTF',
    color: '#6c6c6c',
    padding: 0,
    '& .MuiOutlinedInput-input': {
      padding: '0.6rem 1.2rem',
    },
  },
  focused: {},
  notchedOutline: {},
}))

export const useToggleImageButton = makeStyles(() => ({
  root: {
    borderRadius: '50px',
    border: '1px solid #910457',
    width: '36px',
    height: '36px',
    padding: '7px',
  },
}))
