import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import useSelectMenu from '../../hooks/useSelectMenu'

type NetworkProps = {}

function Network({}: NetworkProps) {
  const OnBackClick = () => {
    const { setCurrent } = useSelectMenu()
    setCurrent('main')
  }

  return (
    <>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary">
            <Link onClick={OnBackClick} to={'/'}>
              {' '}
              Back Home{' '}
            </Link>
          </Button>
        }
      />
    </>
  )
}

export default Network
