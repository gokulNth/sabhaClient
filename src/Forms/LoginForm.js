import React, { useState } from 'react';
import { Icons, RequestAPI } from '../Utils/Constant';

function LoginForm(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const handleInputChange = (id, event) => {
        const { value, checked } = event.target;
        if (id === 'shw') {
            setShowPassword(!showPassword);
        } else if (id === 'usr') {
            setUserName(value);
        } else if (id === 'pwd') {
            setPassword(value);
        } else {
            setRememberMe(checked);
        }
    }
    const handleSubmit = () => {
        if (password.length >= 8) {
            setShowHint(false);
            RequestAPI('http://localhost:3001/api/login', 'POST', {
                userName: userName.trim(),
                password: password.trim()
            }).then((response) => {
                if (response.status === 200) {
                    const data = JSON.stringify({ ...response.data, id: userName });
                    rememberMe
                        ? window.localStorage.setItem('login', data)
                        : window.sessionStorage.setItem('login', data)
                    window.location.href = '/';
                }
            }).catch((error) => {
                console.log(error);
                props.showToastFn({ toastMessage: 'MemberId or Password is incorrect....' }, 'error');
            })
        } else {
            setShowHint(true);
        }
    }
    return (
        <div style={{ margin: '5% 0 0 10%', width: '80%' }} className="panel text-center p-2">
            <div className="panel-header">
                <div className="panel-title text-uppercase text-large text-bold">Login form</div>
            </div>
            <div className="panel-body">
                <form className="form-horizontal p-centered m-2 p-2">
                    <div className="form-group has-success">
                        <div className="col-3 col-sm-12">
                            <label className="form-label text-primary" htmlFor="input-example-1">Member ID</label>
                        </div>
                        <div className="col-9 col-sm-12">
                            <input className="form-input" type="number" id="input-example-1" value={userName} onChange={handleInputChange.bind(this, 'usr')} placeholder="Member ID" />
                        </div>
                    </div>
                    <div className="form-group has-success">
                        <div className="col-3 col-sm-12">
                            <label className="form-label text-primary" htmlFor="input-example-2">Password</label>
                        </div>
                        <div className="col-9 col-sm-12">
                            <div className="has-icon-right">
                                <input className="form-input" type={showPassword ? 'text' : 'password'} id="input-example-2" value={password} onChange={handleInputChange.bind(this, 'pwd')} placeholder="Password" />
                                <img src={`${showPassword ? Icons.opnEyeIcon : Icons.clsEyeIcon}`} onClick={handleInputChange.bind(this, 'shw')} alt="hidepassword" className="form-icon icon icon-check" />
                            </div>
                            {showHint && <p className="form-input-hint text-left text-error">Passwords must have at least 8 characters.</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-3 col-sm-12"></div>
                        <label className="form-checkbox">
                            <input type="checkbox" checked={rememberMe} onChange={handleInputChange.bind(this, 'rmbr')} />
                            <i className="form-icon"></i> Remember me
                        </label>
                    </div>
                </form>
            </div>
            <div className="panel-footer">
                <button type="submit" onClick={handleSubmit} className="btn btn-success">Submit</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" className="btn btn-light">Cancel</button>
            </div>
        </div>
    )
}

export default LoginForm;