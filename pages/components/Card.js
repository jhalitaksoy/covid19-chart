import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.children}

        <style jsx>{`
          div {
            display: flex;
            flex-direction : column;
            border : 1px solid #45D09E;
            border-radius: 5px;
            padding : 15px;
            margin : 5px;
            max-width : 400px;
            width : 80%;
          }
        `}</style>
      </div>
    );
  }
}

export default Card;
