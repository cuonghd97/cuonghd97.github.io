import * as React from 'react'
import styles from './image.gallery.module.scss'
import nho1 from '../../assets/imgs/nho1.jpeg'
import nho2 from '../../assets/imgs/nho2.jpg'
import nho3 from '../../assets/imgs/nho3.jpg'
import nho4 from '../../assets/imgs/nho4.jpg'

export const ImageGallery = () => {
    return (
        <div className={styles.mainGallery}>
            <ul className={styles.imageContainer}>
                <li className={styles.imageItem}>
                    <img src={nho1} width='200' alt='daughter' />
                    {/*<p>image #1</p>*/}
                </li>
                <li className={styles.imageItem}>
                    <img src={nho2} width='200' alt='daughter' />
                </li>
                <li className={styles.imageItem}>
                    <img src={nho3} width='200' alt='daughter' />
                </li>
                <li className={styles.imageItem}>
                    <img src={nho4} width='200' alt='daughter' />
                </li>
            </ul>
            <div className='light'></div>
        </div>
    )
}