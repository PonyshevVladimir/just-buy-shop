import './Toast.scss';

export interface ToastMessage {
    id: string;
    text: string;
    type: 'success' | 'warning' | 'error';
}

interface ToastProps {
    toasts: ToastMessage[];
    onClose: (id: string) => void;
}

export default function Toast({ toasts, onClose }: ToastProps) {
    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`toast-item toast-item--${toast.type}`}
                    onClick={() => onClose(toast.id)}
                >
                    {/* Иконка в зависимости от типа уведомления */}
                    <span className="toast-item__icon">
            {toast.type === 'success' && '✓'}
                        {toast.type === 'warning' && '⚠'}
                        {toast.type === 'error' && '✕'}
          </span>

                    <span className="toast-item__text">{toast.text}</span>

                    {/* Кнопка закрытия (крестик) */}
                    <button
                        className="toast-item__close-btn"
                        title="Закрыть"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose(toast.id);
                        }}
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
}
