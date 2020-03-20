import React, { Component } from 'react';

class CardTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>

                <style jsx>{`
                    div {
                        
                    }

                    h3{
                        color : #748700;
                        font-family : "Roboto";
                        margin-left :20px;
                        margin : auto;
                        text-align : center;
                        margin-bottom : 20px;
                    }
                `}</style>
            </div>);
    }
}

export default CardTitle;