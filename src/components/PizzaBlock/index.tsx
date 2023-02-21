import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItem } from '../../redux/cart/selectors';
import { addItem } from '../../redux/cart/slice';
import { CartItem } from '../../redux/cart/types';

interface PizzaBlockProps {
  id: string;
  title: string;
  price_26: number;
  price_30: number;
  price_40: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price_26, price_30, price_40, imageUrl, sizes, types }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItem);
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);
  const [price, setPrice] = useState(price_26);

  useEffect(() => {
    if (activeSize === 0) {
      setPrice(price_26);
    } else if (activeSize === 1) {
      setPrice(price_30);
    } else if (activeSize === 2) {
      setPrice(price_40);
    }
  }, [activeSize, price_26, price_30, price_40]);

  const typePizza = ['thin', 'traditional'];

  const addedCount = cartItem.reduce((acc: number, item: any) => {
    if (item.id === id && item.type === typePizza[activeType] && item.size === sizes[activeSize]) {
      return acc + item.count;
    }
    return acc;
  }, 0);

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typePizza[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id} to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map(typeId =>
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? "active" : ""}>{typePizza[typeId]}
              </li>
            )}
          </ul>
          <ul>
            {sizes.map((size, i) =>
              <li
                key={size}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? "active" : ""}>{size} cm.
              </li>
            )}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price} $</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
