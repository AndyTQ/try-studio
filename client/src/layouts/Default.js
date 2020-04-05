import React from 'react';

/**
 * @returns The default layout for all the pages that are not using the Dashboard layout.
 */
const Default = props => {
  const { children } = props; 
  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Default;