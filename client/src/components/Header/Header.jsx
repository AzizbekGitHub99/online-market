import React, { useState } from 'react'
import './Header.scss'
import { Link, NavLink } from 'react-router-dom'
import { useInfoContext } from '../../context/infoContext'
import { BsMoonStars } from 'react-icons/bs'
import { RiLogoutBoxLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { CiLight } from 'react-icons/ci'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'

const Header = () => {
    const {handleLanguageChange, theme, toggleTheme, userId, exit} = useInfoContext()
    const [openlang, setOpenlang] = useState(false);
    const [showBurger, setShowBurger] = useState(false);
    const toggleBurger = () => setShowBurger(!showBurger)
    const toggle = () => setOpenlang(!openlang);
  return (
    <header>
        <div className="container">
            <nav className='header_nav'>
                <div className="logo-site">
                  Online
                </div>
                <ul className={`header_list ${showBurger ? 'open' : ''}`}>
                    <li>
                        <NavLink to='/'>Brendlar</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Yangiliklar</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Aksiyalar</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Blog</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Do‘konlar</NavLink>
                    </li>
                    <li>
                    </li>
                </ul>
                <div className='mobile'>
                  <div className={`options ${showBurger ? 'open' : ''}`}>
                        <div className="change">
                          <div className="lang">
                            <button onClick={toggle} className="lang-img">
                              <img src={`/images/${localStorage.getItem('language') || 'uz'}.jpg`} alt='language' />
                            </button>
                          </div>
                          {openlang && (
                            <div className="box-lang">
                                <div className='lang' onClick={() => {toggle(); handleLanguageChange('en')}}>
                                  <div className="lang-img">
                                    <img src={`/images/en.jpg`} alt="English" />
                                  </div>
                                  <b>English</b>
                                </div>
                                <div className='lang' onClick={() => {toggle(); handleLanguageChange('ru')}}>
                                  <div className="lang-img">
                                    <img src={`/images/ru.jpg`} alt="Russian" />
                                  </div>
                                  <b>Русскый</b>
                                </div>
                                <div className='lang' onClick={() => {toggle(); handleLanguageChange('uz')}}>
                                  <div className="lang-img">
                                    <img src={`/images/uz.jpg`} alt="O'zbek" />
                                  </div>
                                  <b>O'zbek</b>
                                </div>
                            </div>
                          )}
                        </div>
                        <button onClick={toggleTheme}>{theme === 'dark' ? <CiLight /> : <BsMoonStars />}</button>
                          {userId ? 
                          <Link to='/'><button className='register-btn' onClick={exit}><RiLogoutBoxLine /> Chiqish</button></Link> :
                          <Link to='/register'><button className='register-btn'><RiLogoutBoxRLine /> Kirish</button></Link>}
                  </div> 
                  <button onClick={toggleBurger} className='burger_menu'>{showBurger ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}</button>
                </div>
            </nav>
        </div>
    </header>
  )
}

export default Header