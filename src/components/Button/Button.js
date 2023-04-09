import propTypes from 'prop-types';
import { Button } from './ButtonStyled';

export const LoadMore = ({ onClick }) => {
    return (
        <Button onClick={onClick} type="button">
            Load More
        </Button>
    );
};

LoadMore.propTypes = {
    onClick: propTypes.func.isRequired,
};