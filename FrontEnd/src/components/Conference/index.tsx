import { Fab, Grid } from '@mui/material'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import ConferenceCard from './ConferenceCard'
import AddIcon from '@mui/icons-material/Add'

type conferenceProps = {}

function ConferenceList({}: conferenceProps) {
  const img1 = '/assets/conference_sample.png'
  const img2 = '/assets/conference_sample2.jpg'

  return (
    <>
      <Grid container>
        {Array.from({ length: 6 }, (v, i) => i).map((v) => {
          return (
            <Grid item key={v}>
              <ConferenceCard img={v % 2 ? img1 : img2} />
            </Grid>
          )
        })}
      </Grid>
      <NavLink to={'write'}>
        <Fab sx={{ position: 'fixed', bottom: 103, right: '2rem', zIndex: 10 }} color="primary">
          <AddIcon />
        </Fab>
      </NavLink>
    </>
  )
}

export default ConferenceList
