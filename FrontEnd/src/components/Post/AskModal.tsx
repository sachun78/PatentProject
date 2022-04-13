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
        <div>
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
                <div className='buttons'>                    
                    <button onClick={onConfirm}>{confirmText}</button>
                    <button onClick={onCancel}>{cancelText}</button>
                </div>
            </div>
        </div>
    );
}





export default AskModal;