import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button.tsx';
import './NotFound.scss';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <div className="not-found-container">

                <h1 className="not-found-container__code">404</h1>

                <h2 className="not-found-container__title">Страница не найдена</h2>

                <p className="not-found-container__text">
                    К сожалению, запрашиваемая вами страница не существует, удалена или временно недоступна.
                </p>

                <Button
                    variant="accent"
                    className="not-found-container__btn"
                    onClick={() => navigate('/')}
                >
                    Вернуться в каталог
                </Button>

            </div>
        </div>
    );
}
