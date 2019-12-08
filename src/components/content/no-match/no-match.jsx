import React from 'react';

function NoMatch({location}) {
  return (
    <div className="no-match">
      <h3>
        No match for location <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

 export default NoMatch;
