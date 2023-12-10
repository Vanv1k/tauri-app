import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../../widgets/Navbar/Navbar'
import testData from '../../data';
import './styles.css';

interface ProductData {
    Id: number;
    Name: string;
    Description: string;
    Image: string;
    Price: number;
    Status: string;
}

const ProductPage: React.FC = () => {
    const { id } = useParams();
    console.log(id)

    const [data, setData] = useState<ProductData | null>(null);

    useEffect(() => {
        // Выполняем запрос при монтировании компонента
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/consultations/${id}`);
            if (!response.ok) {
                throw new Error(`Ошибка при выполнении запроса: ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            setData(testData.consultation[parseInt(id || '0', 10) - 1])
            console.error('ошибка при выполннении запроса:', error);
        }
    };
    console.log(data);
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row-2cols">
                    <div className="col-1">
                        <img src={data?.Image} className="card-img-selected" alt="Product" />
                    </div>
                    <div className="col-2">
                        <h1 className="text card-name-selected">{data?.Name}</h1>
                        <p className="text card-description-selected">{data?.Description}</p>
                        <div className="bottom-part">
                            <p className="text card-price-selected">{data?.Price} рублей</p>
                            <button type="button" className="button button-show button-buy">
                                Провести
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
