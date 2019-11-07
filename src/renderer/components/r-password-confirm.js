import React from 'react'
const { ipcRenderer } = require('electron')

let confirmPassForm = document.getElementById('form--password-confirm')
let sendTxSubmit = document.querySelector('#password-confirm  .form-submit')
let form = document.getElementById('form--send-tx')
let sucsMsgElm = form.querySelector('.sucs-msg')
let errMsgElm = form.querySelector('.err-msg')

class PasswordConfirm extends React.Component {
        init() {
        // Add form listeners
        confirmPassForm.addEventListener('submit', function(e){
            e.preventDefault()
        })
        confirmPassForm.addEventListener('submit', this.sendTxFormSubmit)

        // Allow form to be submitted again.
        ipcRenderer.on('send-tx', (event, resp) => {
            sendTxSubmit.classList.remove('disabled')
            confirmPassForm.addEventListener('submit', this.sendTxFormSubmit)
        })
    }

    sendTxFormSubmit(){
        // Reset msgs
        sucsMsgElm.innerHTML = ''
        errMsgElm.innerHTML = ''

        // Disbale submit button
        sendTxSubmit.classList.add('disabled')
        confirmPassForm.removeEventListener('submit', this.sendTxFormSubmit)

        let address = form.querySelector('.form-item--address input').value
        let amount = form.querySelector('.form-item--amount input').value
        let password = confirmPassForm.querySelector('.form-item--password input').value

        console.log('form submit -> send-tx event fired')

        // Process tx
        ipcRenderer.send('send-tx', [address, amount, password])
    }


    componentDidMount() {
        init()
    }

    render() {
        return (
            <div id="password-confirm" className="overlay-popup overlay-popup--password-confirm">
                <div className="inner sh-block">
                    <div className="popup-close"></div>
                    <h4 className="sh-border">Confirm password</h4>
                    <div className="address-book-actions">
                        <form id="form--password-confirm">
                            <div className="sucs-msg status-msg"></div>
                            <div className="err-msg status-msg"></div>
                            <div className="tx-summary">
                                <div className="label"></div>
                                <div className="address"></div>
                                <div className="amount"></div>
                            </div>
                            <div className="form-item form-item--password form-item-icon form-item-icon--keylock">
                                <input type="password" placeholder="Password" value="stanstan" required />
                            </div>
                            <div className="form-actions align-right">
                                <button className="form-submit btn-small">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PasswordConfirm