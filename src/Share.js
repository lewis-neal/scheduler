import React from 'react';
import copy from 'copy-to-clipboard';

function Share() {
  const url = window.location.href;
  function getUrl() {
    copy(url);
  }

  return (
    <div className="row">
      <div className="session-top">
        <h3>Share the link with people you're trying to organise with!</h3>
        <div className="session-link-holder">
          <input className="availability-text" readOnly value={url} />
          <button onClick={getUrl}>Share</button>
        </div>
      </div>
    </div>
  );
}

export default Share;
