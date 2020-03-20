import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                {this.props.children}

                <style jsx>{`

                div{
                    display : flex;
                    flex-wrap : wrap;
                    flex-direction : row;
                    align-items: center;
                    max-width : 900px;
                    margin:auto;
                    margin-top :10px;
                }

                @media (max-width: 900px){
                    div{
                        flex-direction : column;
                    }
                }

                `}
                </style>
            </div>);
    }
}

export default List;