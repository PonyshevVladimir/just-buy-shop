import ProductCard from "../components/ProductCard/ProductCard.tsx";
import './Main.scss';

const MOCK_PRODUCTS = [
    { id: 1, name: 'Фигурное мыло «Лаванда»', price: 350, description: 'Успокаивающий аромат натуральной лаванды и мягкая очищающая пена.', image: './src/assets/images/lavander-soap.png' },
    { id: 2, name: 'Мыло ручной работы «Цитрус»', price: 400, description: 'Бодрящий заряд свежести спелого апельсина и лимона для вашей кожи.', image: './src/assets/images/citrus-soap.png' },
    { id: 3, name: 'Подарочный набор «Кофе и Шоколад»', price: 1200, description: 'Эксклюзивный наборт из двух брусков мыла-скраба с натуральным молотым кофе.', image: './src/assets/images/coffee-soap.png' },
    { id: 4, name: 'Мыло скраб «Овсяные хлопья»', price: 380, description: 'Деликатный пилинг эффект и глубокое увлажнение на каждый день.', image: './src/assets/images/oat-soap.png' },
    { id: 5, name: 'Детское мыло «Мишка»', price: 450, description: 'Гипоаллергенный состав с экстрактом ромашки для самой нежной кожи.', image: './src/assets/images/bear-soap.png' },
    { id: 6, name: 'Мыло «Морской бриз» с солью', price: 390, description: 'Минеральное мыло с морской солью для тонуса и гладкости кожи.', image: './src/assets/images/ocean-soap.png' },
];

export default function Main() {
    return (
        <main className="main-page">
            <div className="main-page__container">

                <h1 className="main-page__title">Каталог товаров</h1>

                <div className="main-page__grid">
                    {MOCK_PRODUCTS.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            description={product.description}
                        />
                    ))}
                </div>

            </div>
        </main>
    );
}
