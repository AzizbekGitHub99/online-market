
import { createContext, useContext, useEffect, useState } from "react";
import { changeLang } from "../language";
import { getOneReq } from "../api/getRequeset";


const InfoContext = createContext()

export const useInfoContext = () => useContext(InfoContext)

export const InfoProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [userId, setUserId] = useState(localStorage.getItem("user_id") || null)
    const [language, setLanguage] = useState(changeLang(localStorage.getItem("language")) || changeLang('uz'))
    const [theme, setTheme] = useState(localStorage.getItem("mode") || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        if(theme !== 'light'){
          localStorage.setItem('mode', 'light')
        } else if(theme !== 'dark'){
          localStorage.setItem('mode', 'dark')
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const {data} = await getOneReq(userId, 'user')
                console.log(data.user);
                setCurrentUser(data.user)
            } catch (error) {
                console.log(error);
                
            }
        }
        if(userId && !currentUser) getUser()
    }, [userId])

    const handleLanguageChange = (lang) => {
      const newTranslations = changeLang(lang);
      setLanguage(newTranslations);
      localStorage.setItem('language', lang)
    };

    const exit = () => {
        localStorage.removeItem('verification_tokenauthuser')
        localStorage.removeItem('user_id')
        setUserId(null)
    }
     const value = {
        currentUser, setCurrentUser, exit,
        currentUser, setCurrentUser, exit,
        language, setLanguage, handleLanguageChange, 
        theme, setTheme, toggleTheme, userId, setUserId
    }

 
    return (
        <InfoContext.Provider value={value}>
            {children}
        </InfoContext.Provider>
    )
}