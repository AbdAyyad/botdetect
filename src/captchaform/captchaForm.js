import * as React from "react";
import {Captcha, captchaSettings} from 'reactjs-captcha';
import axios from 'axios';


class CaptchaForm extends React.Component {

    constructor(props) {
        super(props);
        captchaSettings.set({
                captchaEndpoint:
                    'https://your-app-backend-hostname.your-domain.com/simple-captcha-endpoint'
            }
        );
    }

    validationHandler = (e:Event) => {
        // the user-entered captcha code value to be validated at the backend side
        let userEnteredCaptchaCode = this.captcha.getUserEnteredCaptchaCode();

        // the id of a captcha instance that the user tried to solve
        let captchaId = this.captcha.getCaptchaId();

        let postData = {
            userEnteredCaptchaCode: userEnteredCaptchaCode,
            captchaId: captchaId
        };

        let self = this;

        // post the captcha data to the /your-app-backend-path on your backend.
        // make sure you import the axios in this view with: import axios from 'axios';
        axios.post(
            'https://your-app-backend-hostname.your-domain.com/your-app-backend-path',
            postData, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
            .then(response => {
                if (response.data.success === false) {
                    // captcha validation failed; reload image
                    self.captcha.reloadImage();
                    // TODO: maybe display an error message, too
                } else {
                    // TODO: captcha validation succeeded; proceed with your workflow
                    console.log("sucess")
                }
            });

        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
    };


    render() {
        return (
            <section id="main-content">

                    {/* captcha challenge: placeholder */}
                    <Captcha captchaStyleName="yourFirstCaptchaStyle"
                             ref={(captcha) => {
                                 this.captcha = captcha
                             }}/>
                    <label>
                        <span>Retype the characters from the picture:</span>
                        {/* captcha code: user-input textbox */}
                        <input id="yourFirstCaptchaUserInput" type="text"/>
                    </label>

                    <button type="submit" id="submitButton"  onClick={this.validationHandler.bind(this)}>Validate</button>
            </section>
        )
    }
}

export default CaptchaForm