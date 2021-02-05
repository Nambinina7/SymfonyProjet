import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import axios from "axios";
import Lists from "./components/Lists";
//import Map from "./Index/Maps";
import TestForm from "./components/TestForm"


class App extends Component {



    constructor(props) {
        super(props);
        this.state = {
            produits:[],
        }
    }

    componentDidMount() {
        console.log(this.state.produits)
    }


    produit = () => {
        axios.get('/api/produits').then(response => {
            console.log(response)
            this.setState({produits: response.data["hydra:member"]})

            }).catch(error =>{
                console.error(error);
        })
    }

    createProduit = (newnom, newlocal, newdesc, newprix, newimg, filename) => {
        const data = {
            newnom,
            newlocal,
            newdesc,
            newprix,
            newimg,
            filename
        }
        axios.post('api/produit/create', data)
            .then(response =>{
                console.log(response.data);
                let nouveauP = {
                    nom: newnom,
                    localisation: newlocal,
                    description: newdesc,
                    prix: newprix,
                    image:newimg
                }
                this.setState(prevState => ({
                    produits: [...prevState.produits,nouveauP]
                }))

            }).catch(error =>{
                console.error(error);
        })

    }

    render() {
        return (
            <div style={{ margin: '100px' }}>
                <Lists produits={this.state.produits} produit={this.produit} />
            </div>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));