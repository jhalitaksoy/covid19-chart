import React, { Component } from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
import { isMobile } from 'react-device-detect';

const colors = [
    "#0260E8",
    "#922D25",
    "#FFD600",
]

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            data: this.props.data
        }
    }

    render() {
        const lines = []
        let data = this.props.data
        if (data != undefined && data[0] != undefined) {
            let keys = Object.keys(data[0])
            let colorIndex = 0
            keys.forEach(key => {
                if (key != "date"){
                    lines.push(<Line type="monotone" dot={false} dataKey={key} stroke={colors[colorIndex]}/>)
                    colorIndex++;
                    if(colorIndex == colors.length ){
                        colorIndex = 0
                    }
                }
            })
        }

        let height = 200;

        if (!isMobile) {
            height = 300;
        }

        return (
            <ResponsiveContainer height={height}>
                <LineChart margin = {{top : 5, right : 30, left : 20, bottom : 5}} data={this.props.data}>
                    {lines}
                    <XAxis dataKey="date" domain ={[-10, "auto"]}/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default Chart;