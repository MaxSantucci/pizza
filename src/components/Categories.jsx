import React from 'react';

const Categories = ({value, onChangeCategory}) => {
  const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Сlosed"]

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={value === i ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;