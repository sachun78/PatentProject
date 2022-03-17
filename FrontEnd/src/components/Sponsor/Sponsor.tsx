import {css} from "@emotion/react";
import IconControl from "../IconControl";

export type SponsorProps = {}
function Sponsor({}: SponsorProps) {
    return <div css={bodyStyle}>
        <h2>Sponsor</h2>
        <div className={'sponsors'}>
            <IconControl name={'plus'}  />
            <IconControl name={'plus'}  />
            <IconControl name={'plus'}  />
            <IconControl name={'plus'}  />
            <IconControl name={'plus'}  />
        </div>
    </div>
};

const bodyStyle = css`
  display: flex;
  justify-content: center;
  h2 {
    flex:1;
    height: 100%;
    font-size: 2rem;
    line-height: 1.5;
    text-align: center;
  }
  
  .sponsors {
    padding-top: 0.8rem;
    flex: 3;
    display: flex;
    justify-content: space-around;
    margin-right: 2rem;
    svg {
      width: 8rem;
      height: 3rem;
    }
  }
`

export default Sponsor
