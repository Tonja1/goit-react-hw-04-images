import propTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGalleryStyled';
import { Component } from 'react';
import { getImg } from 'Services/GetImg';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class ImageGallery extends Component {
    state = {
        imgArray: [],
        error: 'message',
        status: '',
    };

    componentDidUpdate(prevProps) {
        const prevName = prevProps.searchText;
        const nextName = this.props.searchText;

        if (prevName !== nextName) {
            this.setState({ status: 'pending' });

            getImg(this.props.searchText, this.props.page, this.props.perPage)
                .then(response => response.json())
                .then(obj => {
                    this.props.statusState(obj.hits);
                    this.setState({ imgArray: obj.hits, status: 'resolved' });
                    if (obj.hits.length >= 1 && obj.hits.length < 12) {
                        toast.warn('there are no more images here', {
                            theme: 'dark',
                        });
                    }
                    if (obj.hits.length === 0) {
                        toast.error('please enter a valid term', {
                            theme: 'dark'
                        });
                    }
                })
                .catch(error => this.setState({ error: error, status: 'rejected' }));
        }
        if (prevProps.page !== this.props.page && this.props.page !== 1) {
            getImg(this.props.searchText, this.props.page, this.props.perPage)
                .then(response => response.json())
                .then(obj => {
                    if (obj.hits < 12) {
                        toast.warn('there are no more images here', {
                            theme: 'colored',
                        });
                    }
                    this.props.statusState(obj.hits);
                    this.setState({
                        imgArray: [...this.state.imgArray, ...obj.hits],
                        status: 'resolved',
                    });
                });
        }
    }

    render() {
    const { status, error } = this.state;

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
          {this.state.imgArray.map(el => {
            return (
              <ImageGalleryItem
                key={el.id}
                id={el.id}
                src={el.webformatURL}
                alt={el.tags}
                largeImageURL={el.largeImageURL}
                openModal={this.props.openModal}
              />
            );
          })}
        </List>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchText: propTypes.string.isRequired,
  page: propTypes.number.isRequired,
  perPage: propTypes.number.isRequired,
  statusState: propTypes.func.isRequired,
};