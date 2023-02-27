import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from '../scss/components/FullPizza.module.scss';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price_26: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63cc509f9b72d2a88e0b89c8.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Error fetching');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>'Loading...'</>;
  }

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div>
          <img className={styles.image} src={pizza.imageUrl} alt="Pizza" />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{pizza.title}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, voluptas! Inventore
            debitis aliquid at labore eaque adipisci dolorem. Autem, qui placeat. Quibusdam
            perferendis a placeat asperiores aliquam obcaecati cumque quos!
          </p>
          <div className={styles.back}>
            <h4 className={styles.price}>from {pizza.price_26} $</h4>
            <Link to="/" className="button button--black">
              <span>Come back</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
