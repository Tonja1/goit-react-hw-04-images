import { useEffect, useState } from "react";
import { SearchBarForm } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMore } from "./Button/Button";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "./Modal/Modal";

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [btnVisible, setBtnVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);
  const [imgArray, setImgArray] = useState([]);

  const toggleModal = () => setShowModal(prev => !prev);
    
  const onLoadImg = () => {
    setBtnVisible(true);
    setPage(prevPage => prevPage + 1);
  };

  const statusState = event => {
    if (event.length === 12) {
      return setBtnVisible(true);
    }
    if (event.length < 12) {
      return setBtnVisible(true);
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    setBtnVisible(true);
    setPage(1);
    setShowModal(false);
    setImgArray([]);

    const form = event.currentTarget;
    const text = form.elements.search.value.trim();

    if (!text) {
      toast.info('Please, enter search term', {
        theme: 'colored',
      });
      return;
    }
    try {
      setSearchText(text);
      form.reset();
    } catch (error) {
      toast.error('error', {
        theme: 'colored',
      });
      setBtnVisible(false);
      form.reset();
    }
  };
   
  const openModal = (img, alt) => {
    setShowModal(!showModal);
    setCurrentImageUrl(img);
    setCurrentImageDescription(alt);
  };

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });
  
  return (
    <>
      {showModal && (
        <Modal
          currentImageDescription={currentImageDescription}
          currentImageUrl={currentImageUrl}
          toggleModal={toggleModal}
        />
      )}
      <SearchBarForm onSubmit={onSubmit} />
      <ImageGallery
        page={page}
        openModal={openModal}
        searchText={searchText}
        statusState={statusState}
        imgArray={imgArray}
        setImgArray={setImgArray}
      />
      {btnVisible && <LoadMore onClick={onLoadImg} />}
      <ToastContainer />
    </>
  );
};