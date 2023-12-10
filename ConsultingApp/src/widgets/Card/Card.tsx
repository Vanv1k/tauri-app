import React from 'react';
import "./styles.css"

interface CardProps {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
}

const MAX_DESCRIPTION_LENGTH = 200

const Card: React.FC<CardProps> = (props) => {
    const truncatedDescription = props.description.length > MAX_DESCRIPTION_LENGTH
        ? `${props.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
        : props.description;
    return (
        <div className="col">
            <div className="card">
                <div className="card-upper-part">
                    <img className="card-img" src={props.image} alt="Service" />
                </div>
                <h1 className="text card-name">{props.name}</h1>
                <p className="text card-description">{truncatedDescription}</p>
                <div className="card-bottom-part">
                    <p className="card-price">{props.price} руб.</p>
                    <a className="button button-show" href={`/consultations/${props.id}`}>
                        Подробнее
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Card;
