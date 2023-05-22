import { useDispatch, useSelector } from 'react-redux';
import { hoverState } from "../redux/reducer/handleHoverProfile";

const isShowHandleProfileCard = () => {
    const dispatch = useDispatch();
    const isHoverProfile = useSelector((state: { hoverReducer: hoverState }) => state.hoverReducer.isProfileHover);

    const handleHover = () => {
        dispatch({ type: 'isHover', payload: !isHoverProfile });
    }

    return { isHoverProfile, handleHover }
}

export default isShowHandleProfileCard;