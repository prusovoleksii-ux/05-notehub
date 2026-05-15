import { createPortal } from 'react-dom';
import css from './LoadingMessage.module.css'

export default function LoadingMessage() {
    return createPortal(
        <p className={css.loading}>Loading . . . </p>,
        document.body
    );
}