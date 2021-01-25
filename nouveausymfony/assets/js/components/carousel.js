import React, { Component } from 'react'
import { red, blue, green } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'
import { Slide, AutoRotatingCarousel } from 'material-auto-rotating-carousel';
export default class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
        }
    }
    render() {
        return (
            <div style={{ position: 'relative', width: '100%', height: 500 }}>
                <Button onClick={() => this.setState({ open: true })}>Open carousel</Button>
                <AutoRotatingCarousel
                    label='Get started'
                    open={this.state.open}
                    onClose={() => this.setState({ open: false })}
                    onStart={() => this.setState({ open: false })}
                    style={{ position: 'absolute' }}
                >
                    <Slide
                        media={<img src='./images/img1.jpg' />}
                        mediaBackgroundStyle={{ backgroundColor: red[400] }}
                        style={{ backgroundColor: red[600] }}
                        title='This is a very cool feature'
                        subtitle='Just using this will blow your mind.'
                    />
                    <Slide
                        media={<img src='./images/img2.jpg' />}
                        mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                        style={{ backgroundColor: blue[600] }}
                        title='Ever wanted to be popular?'
                        subtitle='Well just mix two colors and your are good to go!'
                    />
                    <Slide
                        media={<img src='./images/img3.jpg' />}
                        mediaBackgroundStyle={{ backgroundColor: green[400] }}
                        style={{ backgroundColor: green[600] }}
                        title='May the force be with you'
                        subtitle='The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.'
                    />
                </AutoRotatingCarousel>
            </div>
        )
    }
}
