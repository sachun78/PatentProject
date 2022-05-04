import { makeStyles } from '@mui/styles'

export const useNonOutlineStyle = makeStyles(() => ({
  select: {
    '&:focus': {
      background: '#fff',
    },
  },
}))
