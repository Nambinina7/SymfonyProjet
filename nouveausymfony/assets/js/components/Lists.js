import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

const styles = theme =>({
  root: {
    maxWidth: 345,
    marginBottom: 20
  },
  media: {
    height: 140,
  },
cardImage: {
  display:'flex',
  flexWrap: 'wrap',
  justifyContent:'space-between',
}
});
class Lists extends React.Component{
  componentDidMount() {
    this.props.produit()
  }
  render() {
    const { classes } = this.props;
    const produits = this.props.produits;
    const data = produits.map(p => {
      return (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                  className={classes.media}
                  image={p.imageUrl}
                  title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  { p.nom}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {p.localisation}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {p.prix} Ar
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {p.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
      )
    })
    return (
        <div  className={classes.cardImage}>{data}</div>
    )
  }
}
export default withStyles(styles)(Lists);


