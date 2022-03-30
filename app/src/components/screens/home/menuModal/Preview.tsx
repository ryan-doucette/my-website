import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import category from 'customTypes';
import './styles/_preview.scss';
import { CurrentScreenContext } from '../../../../current-screen-context';
import handleNavigate from '../../../../screenNavigationHandler';

import about from './previewImgs/aboutPreviewImg.png';
import skills from './previewImgs/skillsPreviewImg.png';
import experience from './previewImgs/experiencePreviewImg.png';
import ruumzy from './previewImgs/ruumzyPreviewImg.png';
import contact from './previewImgs/contactPreviewImg.png';

const Preview = ({currentCategory} : {currentCategory:category}) => {
    const [currentImg, setCurrentImg] = useState(ruumzy);
    useEffect(() => {
        switch (currentCategory.identifier) {
            case 'about':
                setCurrentImg(about);
                break;
            case 'skills':
                setCurrentImg(skills);
                break;
            case 'experience':
                setCurrentImg(experience);
                break;
            case 'ruumzy':
                setCurrentImg(ruumzy);
                break;
            case 'contact':
                setCurrentImg(contact);
                break;
        }
    }, [currentCategory]);

    const navigate = useNavigate();

    return (
        <div className="preview">
            <div className='previewImage' id='preview-image' style={{ backgroundImage:`url(${currentImg})` }}/>
            <div className='description' id='description'>{currentCategory.description}</div>
            {
                currentCategory.identifier === 'ruumzy' ? 
                    <a href='https://ruumzy.com/' className='tellMeMore' id='more-button'>check it out</a>
                    :
                    <CurrentScreenContext.Consumer>
                        {({currentScreen, toggleCurrentScreen}) => (
                            <div 
                                onClick={() => {
                                    toggleCurrentScreen(currentCategory.link);
                                    handleNavigate(currentCategory.link, currentScreen, navigate);
                                }} 
                                className='tellMeMore' 
                                id='more-button'
                            >
                                {currentCategory.identifier === 'contact' ? 'contact' : 'tell me more'}
                            </div>
                        )}
                    </CurrentScreenContext.Consumer>
            }
        </div>
    );
}

export default Preview;
