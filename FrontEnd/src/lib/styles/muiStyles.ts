import { makeStyles } from '@mui/styles'

export const useFocusOutlineStyle = makeStyles(() => ({
  root: {
    '&:focus-within': {
      border: '1px solid #910457',
      marginBottom: '0.5rem',
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
    border: '#eceff1 1px solid',
    borderRadius: '0.5rem',
    backgroundColor: '#fff',
  },
  focused: {},
  notchedOutline: {},
}))
