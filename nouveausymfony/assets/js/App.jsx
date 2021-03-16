import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import axios from "axios";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Lists from "./components/Lists";
import Map from "./Index/Maps";
import TestForm from "./components/TestForm"
import NavBar from "./components/NavBar";
import MyComponent from "./components/File";



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
        axios.get('/produit/read').then(response => {
            console.log(response)
            this.setState({produits: response.data})

            }).catch(error =>{
                console.error(error);
        })
    }

    createProduit = (newnom, newlocal, newdesc, newprix, newimg, filename,newtags) => {
        const data = {
            newnom,
            newlocal,
            newdesc,
            newprix,
            newimg,
            filename,
            newtags
        }
        axios.post('/produit/create', data)
            .then(response =>{
                console.log(response.data);
                let nouveauP = {
                    nom: newnom,
                    localisation: newlocal,
                    description: newdesc,
                    prix: newprix,
                    image:newimg,
                    tags:newtags
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
                <BrowserRouter>
                    <Switch>
                        <Route path="/produit/create" render={(props) => <TestForm {...props} createProduit={this.createProduit}  />}/>
                    </Switch>
                    <NavBar/>
                </BrowserRouter>
                <MyComponent/>
            </div>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));