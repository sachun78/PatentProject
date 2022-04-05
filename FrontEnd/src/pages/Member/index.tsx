import { css } from '@emotion/react'
import { Box, Tab, Tabs } from '@mui/material'
import Events from 'components/Events/'
import Schedules from 'components/Schedules'
import React from 'react'
import { useRecoilState } from 'recoil'
import { memberShipTabState } from 'atoms/memberShipTabState'

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
      id={`member-tabpanel-${index}`}
      aria-labelledby={`member-tab-${index}`}
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
  const [value, setValue] = useRecoilState(memberShipTabState)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div css={wrapper}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='Event' {...a11yProps(0)} />
            <Tab label='Schedule' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Events />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Schedules />
        </TabPanel>
      </Box>
    </div>
  )
}

const wrapper = css`
  padding-right: 1rem;
`

export default Member
