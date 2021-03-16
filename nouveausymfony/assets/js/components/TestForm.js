import React, { Component } from 'react'
import axios from "axios";

export default class TestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom : '',
            localisation: '',
            description: '',
            prix:"",
            image:"",
            filename: "",
            error: null,
            isLoaded: false,
            tags: [],
            selectedTags: []
        }
    }

    componentDidMount() {
          axios.get('http://localhost:86/api/tags').then(response => {
              //console.log(response)
              this.setState({tags: response.data["hydra:member"]})

         }).catch(error =>{
              console.error(error);
         })
    }

   changenom = e =>{
       this.setState({
           nom: e.target.value
       })
   };
   changelocal = e =>{
        this.setState({
            localisation: e.target.value
        })
    };
    changedescri = e =>{
        this.setState({
            description: e.target.value
        })
    };
    changeprix = e =>{
        this.setState({
            prix: e.target.value
        })
    };

    onTagSelected = e =>{
        console.log(e.target.value)
        this.setState({
            selectedTags: [e.target.value]
        })
    };

    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    handleFileRead = async (event) => {
        console.log(event.target.files)
        const file = event.target.files[0]
        console.log(file)
        const base64 = await this.convertBase64(file)

        this.setState({
            image: base64,
            filename: file.name
        })
    }

   submit = e => {
       e.preventDefault();
       //const data = JSON.stringify(this.state)
       //const users = this.state;
       this.props.createProduit(this.state.nom,this.state.localisation,this.state.description,this.state.prix,this.state.image, this.state.filename, this.state.selectedTags)
       this.setState({
           nom : '',
           localisation: '',
           description: '',
           prix:"",
           image:""
       })
   }
    render() {
        const { tags } = this.state;
        return (
            <div className="container">
                <h1 className="text-center">Formulaire d'Ajout</h1>
                <form onSubmit={this.submit} className="form-group">
                    <label htmlFor="nom">Nom:</label>
                    <input type="text" name="nom" className="form-control" value={this.state.nom} onChange={this.changenom}/>

                    <label htmlFor="sel1">Select tags:</label>
                    <select className="form-control" multiple={true} onChange={this.onTagSelected}>
                        {tags.map(tag => (
                            <option value={tag.id}>{tag.nom}</option>
                        ))}
                    </select>

                    <label htmlFor="localisation">localisation:</label>
                    <input type="text" name="localisation" className="form-control" value={this.state.localisation} onChange={this.changelocal}/>

                    <label htmlFor="description">description</label>
                    <input type="text" name="description" className="form-control" value={this.state.description} onChange={this.changedescri}/>

                    <label className="form-check-label">Prix</label>
                    <input type="text" name="prix" className="form-control" value={this.state.prix} onChange={this.changeprix}/><br/>

                    <label className="form-check-label">image</label>
                    <input type="file" name="image" onChange={this.handleFileRead}/><br/>

                    <button className="btn btn-primary" >Envoyer</button>
                </form>
            </div>
        )

    }
}
