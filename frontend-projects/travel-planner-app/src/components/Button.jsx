import React, { Children } from 'react';

export default function Button({children, onClick, className}) {
  return (
    <div>
      <button onClick={onClick} className={className}>{children}</button>
    </div>
  );
}
