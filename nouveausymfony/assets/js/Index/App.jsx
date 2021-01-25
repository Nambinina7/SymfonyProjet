import {render, unmountComponentAtNode} from  'react-dom';
import React from 'react';

function Comments(props) {
   return <div style={{ margin: '100px' }}>

   </div>
}


class CommentsElements extends HTMLElement {

    connectedCallback () {
        render(<Comments/>, this)
    }

    disconnectedCallback () {
        unmountComponentAtNode(this)
    }
}

customElements.define('post-index',CommentsElements)