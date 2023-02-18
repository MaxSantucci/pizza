import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { addItem, CartItem, selectCartItem } from '../../redux/slices/cartSlice';
import Selector from '../Selector';

type PizzaBlockProps = {
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

const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typePizza[activeType],
      size: sizes[activeSize],
      count: 0,
    }
    dispatch(addItem(item));
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <Selector id={id} title={title} price_26={price_26} price_30={price_30} price_40={price_40} imageUrl={imageUrl} sizes={sizes} types={types}/>.
      </div>
    </div>
  );
};



export default PizzaBlock;