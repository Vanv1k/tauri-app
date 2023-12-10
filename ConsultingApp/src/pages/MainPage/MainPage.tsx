import './styles.css'
import Navbar from '../../widgets/Navbar/Navbar'
import Card from '../../widgets/Card/Card'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import testData from '../../data';


interface Data {
    id: number;
    consultation: {
        Id: number;
        Name: string;
        Description: string;
        Image: string;
        Price: number;
        Status: string;
    }[];

}
const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Data | null>({ id: 0, consultation: [] });
    const [maxPrice, setMaxPrice] = useState<number | null>(null);

    const fetchData = async (maxPrice?: string) => {
        try {
            const url = maxPrice ? `/api/consultations/?maxPrice=${maxPrice}` : '/api/consultations/';
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка при выполнении запроса: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result);
            setData(result);
        } catch (error) {
            console.log(testData)
            let result = { ...testData }; // Создаем копию оригинальных данных
            if (maxPrice) {
                result.consultation = testData.consultation.filter((consultation) => consultation.Price <= parseInt(maxPrice));
            }
            setData(result)
            console.error('ошибка при выполннении запроса:', error);
        }
    };

    const handleMaxPriceChange = (value: string) => {
        setMaxPrice(value !== '' ? parseInt(value) : null);

        // Обновляем URL с использованием navigate
        const maxPriceString = value !== '' ? parseInt(value).toString() : '';
        navigate(`?maxPrice=${maxPriceString}`, { replace: true });

        fetchData(maxPriceString); // Вызывайте fetchData при изменении maxPrice
    };

    useEffect(() => {
        // Получаем значение maxPrice из URL при монтировании компонента
        const urlSearchParams = new URLSearchParams(window.location.search);
        const maxPriceParam = urlSearchParams.get('maxPrice') || '';
        const parsedMaxPrice = maxPriceParam !== null ? parseInt(maxPriceParam) : null;


        if (parsedMaxPrice !== maxPrice) {
            setMaxPrice(parsedMaxPrice);
            fetchData(maxPriceParam);
        }
    }, [maxPrice]);
    return (
        <div>
            <Navbar onMaxPriceChange={handleMaxPriceChange} />
            <div className="container">
                <div className="row">
                    {data?.consultation?.map((item) => (
                        <div key={item.Id} className="col">
                            <Card
                                id={item.Id}
                                name={item.Name}
                                description={item.Description}
                                image={item.Image}
                                price={item.Price}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default MainPage 