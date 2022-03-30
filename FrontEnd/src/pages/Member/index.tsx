import { css } from '@emotion/react'
import { Box, Tab, Tabs } from '@mui/material'
import Events from '../../components/Events/'
import Schedules from '../../components/Schedules'
import React, { useState } from 'react'
import ScheduleCalendar from '../../components/Schedules/ScheduleCalendar'

type MemberShipProps = {}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  )
}

function Member({}: MemberShipProps) {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div css={wrapper}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='Events' {...a11yProps(0)} />
            <Tab label='Calendar' {...a11yProps(1)} />
            <Tab label='Schedules' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Events />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ScheduleCalendar currentEvents={[]} weekendsVisible={true} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Schedules />
        </TabPanel>
      </Box>
    </div>
  )
}

const wrapper = css`
  padding: 3rem;
`

export default Member
