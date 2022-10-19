import {useDispatch} from "react-redux";
import {showToast} from "../store/modules/toast/actions";

export const Error = (value) => {
    const dispatch = useDispatch()

    return dispatch(showToast(value, 'error', 'error'))
}