import { Image, Item } from './ImageGalleryItemStyled';
import propTypes from 'prop-types';

export const ImageGalleryItem = ({
    id, src, alt, largeImageURL, openModal,
}) => {
    return (
        <Item key={id} onClick={() => openModal(largeImageURL, alt)}>
            <Image src={src} alt={alt} />
        </Item>
    );
};

ImageGalleryItem.propTypes = {
    src: propTypes.string.isRequired,
    alt: propTypes.string.isRequired,
    openModal: propTypes.func.isRequired,
    largeImageURL: propTypes.string.isRequired,
};