import propTypes from 'prop-types';
import { Backdrop, Content } from "./ModalStyled";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const ModalRoot = document.querySelector('#modal-root');

export const Modal = ({
    currentImageUrl,
    currentImageDescription,
    toggleModal,
}) => {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            toggleModal();
        }
    };

    const handleClickBackdrop = e => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    };

    return createPortal(
        <Backdrop onClick={handleClickBackdrop}>
            <Content>
                <img src={currentImageUrl} alt={currentImageDescription} />
            </Content>
        </Backdrop>,
        ModalRoot
    );
};

Modal.propTypes = {
    toggleModal: propTypes.func.isRequired,
    currentImageUrl: propTypes.string.isRequired,
    currentImageDescription: propTypes.string.isRequired,
};