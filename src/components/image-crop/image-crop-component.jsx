import React, { useContext, useState } from 'react'

import ReactCrop from 'react-image-crop'
import ButtonComponent from '../buttons/button.component'

import { UserContext } from '../../context/user.context';

import 'react-image-crop/src/ReactCrop.scss'
import './image-crop.styles.scss';

const ImageCropComponent = ({handleCroppedImage, optionalWidth}) => {

    const {user} = useContext(UserContext);

    const [src, setSrc] = useState();
    const [percentCrop, setPercentCrop] = useState({unit: '%', x: 0, y: 0, width: 0, height: 0});

    const onCropComplete = () => {
        if (src && percentCrop.width && percentCrop.height)
        getCroppedImg(src, percentCrop);
    }

    const getCroppedImg = (src, percentCrop) => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = image.naturalWidth / 100 * percentCrop.width;
            canvas.height = image.naturalHeight / 100 * percentCrop.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(
            image,
            image.naturalWidth / 100 * percentCrop.x,
            image.naturalHeight / 100 * percentCrop.y,
            image.naturalWidth / 100 * percentCrop.width,
            image.naturalHeight / 100 * percentCrop.height,
            0,
            0,
            image.naturalWidth / 100 * percentCrop.width,
            image.naturalHeight / 100 * percentCrop.height,
            )
            canvas.toBlob((blob) => {
                handleCroppedImage(new File([blob], `cropped-profile-picture-user-${user.id}`))
            })
        }
    }

    return (
        <div className='image-crop-container'>
            <input
                className='button secondary-confirm secondary-confirm-hover'
                type="file"
                accept="image/*"
                onChange={(e) => setSrc(URL.createObjectURL(e.target.files[0]))}
            />
            {src && (
                <div className='image-crop-border-and-size' style={optionalWidth && {width:`${optionalWidth}`}}>
                    <ReactCrop src={src} aspect={1} circularCrop ruleOfThirds crop={percentCrop} onChange={(crop, percentCrop) => setPercentCrop(percentCrop)} onComplete={onCropComplete} >
                        <img src={src}/>
                    </ReactCrop>
                </div>
            )}
        </div>
    );
}

export default ImageCropComponent
