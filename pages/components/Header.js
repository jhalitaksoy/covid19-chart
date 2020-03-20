import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {searchActive : false}
        this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    }
    render() {
        return (<div className="container">

            <div className="header">
                <h2>Covid19 Charts</h2>
                <div className="searchButton" onClick={this.onSearchButtonClick}>
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>

            <style jsx>{`
                .container{
                    width : 100%;
                    height : 50px;
                    display: flex;
                    border-bottom : 1px solid #B5FBDD;
                }

                .header{
                    max-width : 950px;
                    display: flex;
                    height : 100%;
                    width : 100%;
                    margin: auto;
                }

                h2{
                    margin : auto;
                    margin-left : 20px;
                    text-align : center;
                    color : #052555;
                }

                .searchButton{
                    display : flex;
                    align-items : center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background-color: ligtgreen;
                    border : 0px;
                    margin : auto;
                    margin-right : 20px;
                }
            `}</style>
        </div>);
    }

    onSearchButtonClick(){
        let value = !this.state.searchActive
        this.setState({
            searchActive : value,
        })
        this.props.onSearchClick(!this.state.searchActive);
    }
}

export default Header;