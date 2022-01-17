import { Button, Input } from 'antd'
import React from 'react'

export type RegisterFormAddProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  enable: boolean
  company: string
  department: string
  position: string
  tel: string
  country: string
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
}

function RegisterFormAdd({
                           onSubmit,
                           onChange,
                           company,
                           country,
                           position,
                           department,
                           tel,
                           enable,
                           loading
                         }: RegisterFormAddProps) {
  return <>
    <h2>추가 정보 입력</h2>
    <section>
      <form onSubmit={onSubmit}>
        <h4>회사</h4>
        <Input
          placeholder='회사'
          onChange={onChange}
          value={company}
          name='company'
        />
        <h4>파트</h4>
        <Input
          placeholder='파트'
          onChange={onChange}
          value={department}
          name='department'
        />
        <h4>직급</h4>
        <Input
          placeholder='직급'
          onChange={onChange}
          value={position}
          name='position'
        />
        <h4>국가</h4>
        <Input
          placeholder='대한민국'
          onChange={onChange}
          value={country}
          name='country'
        />
        <h4>전화번호</h4>
        <Input
          type='tel'
          placeholder='01000000000'
          onChange={onChange}
          value={tel}
          name='tel'
        />
        <div className='button-div'>
          <Button type='primary' htmlType='submit' disabled={enable && !loading}>
            회원가입
          </Button>
        </div>
      </form>
    </section>
  </>
}

export default RegisterFormAdd
