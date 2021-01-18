import React, { Component } from 'react'

export default class TestForm extends Component {
    state = {
        nom : 'Solofoniaina',
        prenom: 'Nambinina',
        completed: true,
        pays:"Madagascar"
    }; 
   changenom = e =>{
       this.setState({
           nom: e.target.value
       })
   };
   changeprenom = e =>{
        this.setState({
            prenom: e.target.value
        })
    };
    changecompleted = e =>{
        this.setState({
            completed: e.target.checked
        })
    };
    changepays = e =>{
        this.setState({
            pays: e.target.value
        })
    };
   submit = e => {
       e.preventDefault();
       //const data = JSON.stringify(this.state)
       //const users = this.state;
       this.props.onAddUsers(this.state.nom,this.state.prenom,this.state.pays,this.state.completed)
       this.setState({
        nom : '',
        prenom: '',
        completed: false,
        pays:"Madagascar"
       })
   }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.submit} className="form-group">
                    <label htmlFor="nom">Nom:</label>
                    <input type="text" name="nom" className="form-control" value={this.state.nom} onChange={this.changenom}/>
                    <label htmlFor="prenom">Prenom:</label>
                    <input type="text" name="prenom" className="form-control" value={this.state.prenom} onChange={this.changeprenom}/>
                    <label htmlFor="sel1">Select pays:</label>
                    <select className="form-control" name="pays" value={this.state.pays} onChange={this.changepays}>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Allmagne">Allmagne</option>
                        <option value="France">France</option>
                    </select><br/>
                    <label className="form-check-label">Completed</label>
                    <input type="checkbox" name="completed" checked={this.state.completed} onChange={this.changecompleted}/><br/>
                    <button className="btn btn-primary" >Envoyer</button>
                </form>
            </div>
        )
       
    }
}
