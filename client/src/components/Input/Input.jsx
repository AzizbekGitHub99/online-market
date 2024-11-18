import React, { useEffect, useState, useRef } from 'react';
import './Input.scss';
import { useInfoContext } from '../../context/infoContext';
import { TbKeyboardOff } from 'react-icons/tb';

const Input = ({ value, required, name, title, height, placeholder, limit, disabled, onTextChange, submit }) => {
    const [text, setText] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const textareaRef = useRef(null);

    const handleChange = (event) => {
        const inputText = event.target.value;
        const characterCount = inputText.length;

        if (!limit || (limit && characterCount <= limit) || inputText === '') {
            setText(inputText);
            onTextChange(name, inputText);
        }
    };

    const handleFocus = (event) => {
        event.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    useEffect(() => {
        if (submit) {
            setIsSubmitted(true);
        }
    }, [submit]);


    const characterCount = value ? value.length : text.length;
    const showError = !disabled && required && (characterCount <= 0 && isSubmitted);

    return (
        <div className='textarea-word'>
            <span>{title}</span>
            <textarea
                ref={textareaRef}
                disabled={disabled}
                style={{ height: `${height}px` }}
                name={name}
                key={name}
                value={value ? value : text}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder={placeholder}
                className={showError ? 'invalid' : 'area'}
            ></textarea>
            {limit && <div className={characterCount >= limit ? 'count fill' : 'count'}>
                {characterCount}/{limit}
            </div>}
            {showError && <p className="error-message">
                Iltimos, ushbu maydonni to’ldiring
            </p>}
        </div>
    );
};

export default Input;
