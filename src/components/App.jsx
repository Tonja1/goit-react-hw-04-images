import { Component } from "react";
import { SearchBarForm } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMore } from "./Button/Button";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "./Modal/Modal";

export class App extends Component {
  state = {
    searchText: '',
    btnVisible: false,
    page: 1,
    perPage: 12,
    showModal: false,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onLoadImg = () => {
    this.setState({ btnVisible: false });
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  statusState = e => {
    if (e.length === 12) {
      return this.setState({ btnVisible: true });
    }
    if (e.length < 12) {
      return this.setState({ btnVisible: false });
    }
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      btnVisible: false,
      page: 1,
      perPage: 12,
      showModal: false,
    });
    const form = event.currentTarget;
    const text = form.elements.search.value.trim();

    if (!text) {
      toast.info('Please, enter search term', {
        theme: 'colored',
      });
      return;
    }
    try {
      this.setState({ searchText: text });
      form.reset();
    } catch (error) {
      toast.error('error', {
        theme: 'colored',
      });
      this.setState({ btnVisible: false });
      form.reset();
    }
  };
  
  openModal = (img, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      currentImageUrl: img,
      currentImageDescription: alt,
    }));
  };

  render() {
    const { state, onSubmit, statusState, onLoadImg, toggleModal, openModal } = this;
    return (
      <>
        {state.showModal && (
          <Modal
            currentImageDescription={state.currentImageDescription}
            currentImageUrl={state.currentImageUrl}
            toggleModal={toggleModal}
          />
        )}
        <SearchBarForm onSubmit={onSubmit} />
        <ImageGallery
          btnVisible={state.btnVisible}
          perPage={state.perPage}
          page={state.page}
          openModal={openModal}
          searchText={state.searchText}
          statusState={statusState}
        />
        {state.btnVisible && <LoadMore onClick={onLoadImg} />}
        <ToastContainer />
      </>
    );
  }
}
