import {render, unmountComponentAtNode} from  'react-dom';
import React from 'react';
import Page from "./page"
import TestForm from "./TestForm";
import Map from "./Map";
function Comments(props) {
   return <div style={{ margin: '100px' }}>
        <Page/>
        <TestForm/>
       <Map
           google={props.google}
           center={{lat: 18.5204, lng: 73.8567}}
           height='300px'
           zoom={15}
       />
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