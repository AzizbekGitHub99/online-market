import React, { useEffect, useState } from 'react'
import { signUp, login, sendVerication, } from "../../api/authRequest";
import './Auth.scss'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useInfoContext } from '../../context/infoContext';
import { FaSquareFacebook } from 'react-icons/fa6';
import { SiApple } from 'react-icons/si';
import { FaRegUser } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { PiPasswordBold } from 'react-icons/pi';
import GoogleAuth from '../../components/SupportAuth/GoogleAuth';
import FacebookAuth from '../../components/SupportAuth/AppleAuth';
import { TfiEye } from 'react-icons/tfi';
import { RxEyeClosed } from 'react-icons/rx';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { TbMailShare } from 'react-icons/tb';


const Auth = ({reset}) => {
    const { setCurrentUser } = useInfoContext();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [existsEmail, setExistsEmail] = useState(false);
    const [formValues, setFormValues] = useState({})
    const [submit, setSubmit] = useState(false);
    const [authStatus, setAuthStatus] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [logError, setLogError] = useState(false);
    const [code, setCode] = useState(null);
    const [checkCode, setCheckCode] = useState('');
    const [countdown, setCountdown] = useState(60);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);



    useEffect(() => {
        if (authStatus) {
            const handleBeforeUnload = (event) => {
                event.preventDefault();
                event.returnValue = '';
            };
            window.addEventListener('beforeunload', handleBeforeUnload);
    
            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }
    }, [authStatus]);

    useEffect(() => {
        if (authStatus) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown === 1) {
                        clearInterval(timer);
                        setIsButtonDisabled(false);
                        return 60;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [authStatus, isButtonDisabled]);

    const handleTextChange = (name, value) => {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };

    const handleSend = async () => {
        setClicked(true)
        try {
            const {data} = await sendVerication(formValues)
            setAuthStatus(true)
            setClicked(false)
            setCode(data.result.verificationCode);
            
            
        } catch (error) {
            console.log(error);
            setClicked(false)
            if(error?.response?.data?.message === 'This is email already exists!'){
                setExistsEmail(true)
            }
        }
    }

    const handleResend = () => {
        setCountdown(60);
        setSubmit(false)
        setIsButtonDisabled(true);
        handleSend()
    };
    

    const handleVerification = (e) => {
        e.preventDefault()
        setSubmit(true)
        setClicked(true)
        try {
            if(isSignup && (!formValues.firstname || !formValues.lastname || !formValues.email || !formValues.password)) return setClicked(false)
            if(!isSignup && (!formValues.email || !formValues.password)) return setClicked(false)
            if(authStatus && (code == checkCode)){
                setClicked(false)
                setSubmit(false)
                return handleSubmit()
            } else if (authStatus && (code != checkCode)){
                return setClicked(false)
            } else if (!isSignup && formValues.email && formValues.password){
                setClicked(false)
                setSubmit(false)
                return handleSubmit()
            } else if(isSignup && !authStatus){
                setClicked(false)
                setSubmit(false)
                return handleSend()
            } 
        } catch (error) {
            console.log(error);
        }

    }
    

    const handleSubmit = async () => {
        try {
            let res
            if(isSignup){
                res = await signUp(formValues)
            } else{
                res = await login(formValues)
            }
            localStorage.setItem('user_id', res.data.user._id)
            localStorage.setItem('verification_tokenauthuser', res.data.token)
            setCurrentUser(res?.data?.user);
            setAuthStatus(false)
            setCode(null)   
            setCheckCode("")
            window.location.replace('/')
        } catch (error) {
            setClicked(false)
            if(error?.response?.data?.message === 'Login or Password is inCorrect'){
                setLogError(true)
            }
        }
    }
    
    return (
        <div className="wrapper">     
            {!authStatus ? 
            <div className="company_info">
                    <div className="segment">
                        <h1><span>{isSignup ? "Ro'yxatdan o'tish" : 'Kabenitga kirish'}</span></h1>
                    </div>
                    <div className="support">
                        <GoogleAuth/>
                        <button className='support_item' type="button"><SiApple /></button>
                    </div>
                    <form action="" onSubmit={handleVerification}>
                        {isSignup && <>
                            <label className={submit && !formValues.firstname ? "required" : 'auth-label'}>
                                <FaRegUser/>
                                <input type='text' value={formValues.firstname || ""} onChange={(e) => handleTextChange('firstname', e.target.value)} name="firstname" placeholder="Ism"/>
                                {submit && !formValues.firstname && <span className='error-text'>Ushbu maydonni to'ldiring</span>}
                            </label>
                            <label className={submit && !formValues.lastname ? "required" : 'auth-label'}>
                                <FaRegUser/>
                                <input type='text' value={formValues.lastname || ""} onChange={(e) => handleTextChange('lastname', e.target.value)} name="lastname" placeholder="Familiya"/>
                                {submit && !formValues.lastname && <span className='error-text'>Ushbu maydonni to'ldiring</span>}
                            </label>
                        </>}
                        <label className={(submit && !formValues.email) || existsEmail || logError ? "required" : 'auth-label'}>
                            <MdAlternateEmail/>
                            <input type='email' value={formValues.email || ""} onChange={(e) => {handleTextChange('email', e.target.value); setExistsEmail(false); setLogError(false)}} name="email" placeholder="Email"/>
                            {submit && !formValues.email && !existsEmail && <span className='error-text'>Ushbu maydonni to'ldiring</span>}
                            {existsEmail && <span className='error-text'>Bunday foydalanuvchi mavjud!</span>}
                            {logError && <span className='error-text'>Email yoki parol xato!</span>}
                        </label>
                        <label className={(submit && !formValues.password) || logError ? "required" : 'auth-label'}>
                            <PiPasswordBold/>
                            <input type={showPassword ? "text" : 'password'} value={formValues.password || ""} onChange={(e) => {handleTextChange('password', e.target.value); setLogError(false)}} name="password" placeholder="Parol"/>
                            <div className='show_password' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <TfiEye/> : <RxEyeClosed />}</div>
                            {submit && !formValues.password && <span className='error-text'>Ushbu maydonni to'ldiring</span>}
                            {logError && <span className='error-text'>Email yoki parol xato!</span>}
                        </label>
                        <button className='form_button' disabled={clicked}>{clicked ? <div className='loader'></div> : 'Submit'}</button>
                        <p className='change_auth'>or <span onClick={() => {setIsSignup(!isSignup); setSubmit(false)}}>{isSignup ? "sign in" : 'sign up'}</span>?</p>
                    </form>
            </div> : 
            <div className='company_info'>
                <h4 className='check_out'>Введите код подтверждения</h4>
                <p className='check_out'>Для защиты аккаунта мы должны убедиться, что это действительно вы пытаетесь войти в систему</p>
                <h6 className='check_out'>Письмо с кодом подтверждения отправлено на адрес <span>{formValues.email}</span></h6>
                <div className="input_code">
                    <div onClick={() => {!isButtonDisabled && handleResend()}} disabled={isButtonDisabled}>{isButtonDisabled ? `(${countdown}s)` : <span className='resend'>Отправить повторно <TbMailShare className='icon'/></span>}</div>
                    <label className={submit && !checkCode ? "required" : 'auth-label'}>
                        <IoMailUnreadOutline />
                        <input
                            value={checkCode}
                            onChange={(e) => { setCheckCode(e.target.value); setSubmit(false); }}
                            type="number"
                            placeholder='Введите код'
                        />
                        {submit && !checkCode && <span className='error-text'>Ushbu maydonni to'ldiring</span>}
                        {submit && (checkCode.length < 6) && checkCode && <span className='error-text'>Tasdiqlash kodi 6 ta raqamdan iborat!</span>}
                        {submit && (checkCode != code && checkCode.length === 6) && checkCode && <span className='error-text'>Tasdiqlash kodi xato!</span>}
                </label>
                </div>
                <button className='form_button' onClick={handleVerification} disabled={clicked}>{clicked ? <div className='loader'></div> : 'Подтверждать'}</button>
                <span onClick={() => setAuthStatus(false)} className='change_auth'>с другого электронного почту</span>
            </div>
            }
            <div className='image_auth' >
                {/* <img src="https://www.bmw.uz/content/dam/bmw/common/topics/fascination-bmw/bmw-m-individual/bmw-m-individual-relaunch-gallery-heritage-wallpaper-07.jpg.asset.1679903183082.jpg" alt="logo" /> */}
            </div>
        </div>
    )
}

export default Auth;