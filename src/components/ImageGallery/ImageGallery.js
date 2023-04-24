import propTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGalleryStyled';
import { useState, useEffect, useRef } from 'react';
import { getImg } from 'Services/GetImg';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ImageGallery = ({
  page,
  openModal,
  searchText,
  statusState,
  setImgArray,
  imgArray,
}) => {
  const [error, setError] = useState('message');
  const [status, setStatus] = useState('');

  const searchRef = useRef(searchText);
  const pageRef = useRef(page);

   useEffect(() => {
    if (page === 1) {
      return;
    }
    getImg(searchText, page)
      .then(response => response.json())
      .then(obj => {
        statusState(obj.hits);
        setImgArray(prevArray => [...prevArray, ...obj.hits]);
        setStatus('resolved');
        if (obj.hits.length >= 1 && obj.hits.length < 12) {
          toast.warn('there are no more images here', {
            theme: 'dark',
          });
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (
      searchRef.current === searchText &&
      pageRef.current === page &&
      searchText === ''
    ) {
      return;
    }

    setStatus('pending');
    getImg(searchText, page)
      .then(response => response.json())
      .then(obj => {
        statusState(obj.hits);
        setImgArray(prevArray => [...prevArray, ...obj.hits]);
        setStatus('resolved');
        if (obj.hits.length >= 1 && obj.hits.length < 12) {
          toast.warn('there are no more images here', {
            theme: 'dark',
          });
        }
        if (obj.hits.length === 0) {
          toast.error('please enter a valid term', {
            theme: 'dark',
          });
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    toast.error('error', {
      theme: 'colored',
    });
    return { error };
  }

  if (status === 'resolved') {
    return (
      <List>
        {imgArray.map(el => {
          return (
            <ImageGalleryItem
              key={el.id}
              id={el.id}
              src={el.webformatURL}
              alt={el.tags}
              largeImageURL={el.largeImageURL}
              openModal={openModal}
            />
          );
        })}
      </List>
    );
  }
};

ImageGallery.propTypes = {
  searchText: propTypes.string.isRequired,
  page: propTypes.number.isRequired,
  statusState: propTypes.func.isRequired,
};