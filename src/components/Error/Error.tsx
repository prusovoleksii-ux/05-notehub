import { createPortal } from 'react-dom';
import css from './Error.module.css'

export default function Error() {
    return createPortal(
        <p className={css.error}>An error has occured.</p>,
        document.body
    );
}