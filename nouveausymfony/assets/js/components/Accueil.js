import React, { Component } from 'react'

export default class Accueil extends Component {
    render() {
        return (
            <div>
                <p>{this.props.produit}</p>
            </div>
        )
    }
}
