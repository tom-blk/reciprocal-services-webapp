import React, { useContext, useEffect, useState } from 'react'

import ReactCrop from 'react-image-crop'
import ButtonComponent from '../button/button.component'

import { UserContext } from '../../context/user.context';

import 'react-image-crop/src/ReactCrop.scss'
import './image-crop.styles.scss';

const ImageCropComponent = ({handleCroppedImage, onCancel}) => {

    const {testUser} = useContext(UserContext);

    const [src, setSrc] = useState();
    const [percentCrop, setPercentCrop] = useState({unit: '%', x: 0, y: 0, width: 0, height: 0});

    useEffect(() => {
        console.log(percentCrop.x);
    }, [percentCrop])

    const [croppedImage, setCroppedImage] = useState(undefined);

    useEffect(() => {
        console.log(croppedImage);
    }, [croppedImage])

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
            console.log('Width: ' + image.width);
            console.log('Height: ' + image.height);
            const ctx = canvas.getContext('2d');
            console.log('image natural width ' + image.naturalWidth)
            console.log('crop x' + percentCrop.x)
            console.log('dx: ' + image.naturalWidth / 100 * percentCrop.x)
            console.log('dy: ' + image.naturalWidth / 100 * percentCrop.y)
            console.log('sx: ' + image.naturalWidth / 100 * percentCrop.width)
            console.log('sy: ' + image.naturalWidth / 100 * percentCrop.width)
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
                setCroppedImage(new File([blob], `cropped-profile-picture-user-${testUser.id}`))
            })
        }
    }

    const checkAndHandleCroppedImageImage = () => {
        if(croppedImage)
        handleCroppedImage(croppedImage)
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
                <ReactCrop src={src} aspect={1} minHeight={100} minWidth={100} circularCrop ruleOfThirds crop={percentCrop} onChange={(crop, percentCrop) => setPercentCrop(percentCrop)} onComplete={onCropComplete} >
                    <img src={src}/>
                </ReactCrop>
            )}
            <ButtonComponent buttonType={'secondary-confirm secondary-confirm-hover'} onClickHandler={checkAndHandleCroppedImageImage}>{'Confirm'}</ButtonComponent>
            <ButtonComponent buttonType={'cancel'} onClickHandler={onCancel}>{'Cancel'}</ButtonComponent>
        </div>
    );
}

export default ImageCropComponent
