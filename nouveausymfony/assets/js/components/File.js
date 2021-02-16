import React from 'react';
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

class File extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Images:[],
        }
    }

    componentDidMount() {
        console.log(this.state.Images)
    }

    images = () => {
        axios.get('/api/media_objects').then(response => {
            console.log(response)
            this.setState({Images: response.data["hydra:member"]})

        }).catch(error =>{
            console.error(error);
        })
    }
    render() {
        const Images = this.state.Images;
        const dataImage = Images.map(image => {
            return (
                <Card>
                    <CardActionArea>
                        <CardMedia
                            image={image.file_path}
                            title="Contemplative Reptile"
                        />
                    </CardActionArea>
                </Card>
            )
        })
        return (
            <div >{dataImage}</div>
        )
    }

}
export default File;


