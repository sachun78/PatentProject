import { makeStyles } from '@mui/styles'

export const useNonOutlineStyle = makeStyles(() => ({
  select: {
    '&:focus': {
      background: '#fff',
    },
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
    border: '#eceff1 1px solid',
    borderRadius: '0.5rem',
    backgroundColor: '#fff',
  },
  focused: {},
  notchedOutline: {},
}))
