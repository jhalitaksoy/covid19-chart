import React, { Component } from 'react';
import Chart from "./components/Chart"
import Card from "./components/Card"
import CardTitle from "./components/CardTitle"
import List from "./components/List"
import Header from "./components/Header"
import Head from 'next/head'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turkeyLoaded: false,
      timeseriesLoaded: false,
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.sort = this.sort.bind(this);
  }

  componentDidMount() {

    const url = "https://jhalitaksoy.github.io/covid19data/turkey-time-series.json";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState(
          { turkeyTimeSeries: data, turkeyLoaded: true }
        )
      })

    const countriesUrl = "https://pomber.github.io/covid19/countries.json";

    fetch(countriesUrl)
      .then(response => response.json())
      .then(data => {
        this.setState(
          { countries: data, countriesLoaded: true }
        )
        this.sort();
        this.setState({
          total: this.total()
        })
      })

    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then(response => response.json())
      .then(data => {
        this.setState(
          { timeseries: data, timeseriesLoaded: true }
        )
        this.sort();
        this.setState({
          total: this.total()
        })
      })
  }
  render() {

    /*let turkey = {}
    if (this.state.turkeyTimeSeries != undefined) {
      turkey = this.state.turkeyTimeSeries["Türkiye"]
    }

    let china = {}
    let italy = {}
    let iran = [];
    let spain = []
    let combine = []

    if (this.state.timeseries != undefined) {
      china = this.state.timeseries["China"]
      italy = this.state.timeseries["Italy"]
      iran = this.state.timeseries["Iran"]
      spain = this.state.timeseries["Spain"]

      let i = 0
      china.forEach(element => {
        combine.push({
          date: element.date,
          china: element.confirmed,
          italy: italy[i].confirmed,
          iran: iran[i].confirmed,
          spain: spain[i].confirmed,
          turkey: 0,
        })
        i++;
      });
    }

    if (turkeyLoaded) {
      let i = 0
      for (i in combine) {

        if (combine[i].date == turkey[0].date) {
          break;
        }
        i++;
      }
      turkey.forEach(element => {
        if (i < combine.length) {
          combine[i].turkey = element.confirmed
          i++;
        }
      });
    }*/

    let cardList = []

    //if (this.isTurkeyLoaded()) {
    //  cardList.push(<Card><CardTitle title="Turkey"></CardTitle><Chart data={this.state.turkeyTimeSeries["Türkiye"]} /></Card>)
    //}

    if (this.state.total != undefined) {
      cardList.push(<Card><CardTitle title="Total"></CardTitle><Chart data={this.state.total} /></Card>)
    }

    if (this.state.sorted != undefined) {
      for (let i in this.state.sorted) {
        let value = this.state.sorted[i]
        cardList.push(
          <Card>
            <CardTitle title={value.country}></CardTitle>
            <Chart data={this.state.timeseries[value.country]} />
          </Card>)
        if (i > 15) {
          break;
        }
      }
    } else {
      cardList = "Loading..."
    }

    return (
      <div>
        <Head>
          <title>Covid19 Charts</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <List>
          {cardList}
        </List>
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
          }
        `}
        </style>
      </div>);
  }

  isTurkeyLoaded() {
    return this.state.turkeyLoaded && this.state.turkeyTimeSeries != undefined
  }

  isTimeSeriesLoaded() {
    return this.state.timeseriesLoaded && this.state.timeseries != undefined
  }

  isCountriesLoaded() {
    return this.state.countriesLoaded && this.state.countries != undefined
  }

  sort() {
    let sorted = []
    if (this.isCountriesLoaded() && this.isTimeSeriesLoaded()) {
      Object.keys(this.state.countries).forEach(key => {
        if (this.state.timeseries[key] != undefined) {
          let d = this.state.timeseries[key]
          sorted.push({
            country: key,
            cases: d[d.length - 1].confirmed,
          })
        }
      })

      sorted.sort((a, b) => b.cases - a.cases);

      this.setState({
        sorted: sorted
      })
    }
  }

  total() {
    let res = []

    let i = 0;
    if (this.isCountriesLoaded() && this.isTimeSeriesLoaded()) {
      Object.keys(this.state.countries).forEach(key => {
        if (this.state.timeseries[key] != undefined) {
          if (i == 0) {
            this.state.timeseries[key].forEach(eachDay => {
              res.push(eachDay)
            })
          } else {
            let j = 0
            this.state.timeseries[key].forEach(eachDay => {
              if (eachDay.confirmed != 0) {
                res[j].confirmed += eachDay.confirmed
                res[j].deaths += eachDay.deaths
                res[j].recovered += eachDay.recovered
              }
              j++
            })
          }
          i++
        }
      })
    }
    return res;
  }
}

export default Index;
