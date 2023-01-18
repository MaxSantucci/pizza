import React, { useState } from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  }

  return (
    <div className="categories">
      <ul>
        <li
          className={activeIndex === 0 ? 'active' : ''}
          onClick={() => onClickCategory(0)}
        >
          All
        </li>
        <li
          className={activeIndex === 1 ? 'active' : ''}
          onClick={() => onClickCategory(1)}
        >
          Meat
        </li>
        <li
          className={activeIndex === 2 ? 'active' : ''}
          onClick={() => onClickCategory(2)}
        >
          Vegetarian
        </li>
        <li
          className={activeIndex === 3 ? 'active' : ''}
          onClick={() => onClickCategory(3)}
        >
          Grill
        </li>
        <li
          className={activeIndex === 4 ? 'active' : ''}
          onClick={() => onClickCategory(4)}
        >
          Spicy
        </li>
        <li
          className={activeIndex === 5 ? 'active' : ''}
          onClick={() => onClickCategory(5)}
        >
          Сlosed
        </li>
      </ul>
    </div>
  );
};

export default Categories;