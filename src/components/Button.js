import React from 'react';

export default function Button({ children, classNameType, onClickButton }) {
  return (
    <button className={classNameType} onClick={onClickButton}>
      {children}
    </button>     
  );
}
