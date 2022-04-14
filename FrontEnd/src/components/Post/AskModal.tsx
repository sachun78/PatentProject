import { Box, Modal } from "@mui/material";
import { borderRadius } from "@mui/system";
import palette, { lightBlue, white, grey } from "lib/palette";
import { css } from '@emotion/react'

type askModalProps = {
    visible: boolean,
    title: string,
    description: string,
    confirmText: string,
    cancelText: string,
    onConfirm: any,
    onCancel: any 
}

const AskModal = ({ visible, title, description, confirmText, cancelText, onConfirm, onCancel}: askModalProps) => {

    
    if(!visible) return null;

    return (
        <Modal 
        hideBackdrop
        open={true}>
        <Box sx={{
                width: '20rem',
                height: '10rem',
                position: 'absolute',
                backgroundColor: `${grey[50]}`,
                '&:hover': {
                    backgroundColor: `${grey[200]}`,
                    cursor: "pointer"
                },
                padding: '0.2rem 1.5rem 0.2rem',
                borderRadius: '1rem',
                top: "20rem",
                left: "20rem",
                opacity: [0.9, 0.9, 0.9]
                
            }}>
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
                <div className='buttons' css={buttonWrapStyle}>                    
                    <button css={buttonStyle} onClick={onConfirm}>{confirmText}</button>
                    <button css={buttonStyle} onClick={onCancel}>{cancelText}</button>
                </div>
            </div>        
        </Box>
        </Modal>
    );
}

export default AskModal;

const buttonWrapStyle = css`
    margin-top: 1rem;
    margin-bottom: 3rem;
    button + button {
        margin-left: 0.5rem;
    }
    height: 2.125rem;
    & + & {
        margin-left: 0.5rem;
    }    
`

const buttonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;
    background: ${palette.cyan[800]};
    &:hover {
        background: ${palette.cyan[600]};
    }
`