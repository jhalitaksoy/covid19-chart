import React, { Component } from 'react';
import Chart from "./components/Chart"
import Card from "./components/Card"
import CardTitle from "./components/CardTitle"
import List from "./components/List"
import Header from "./components/Header"
import Head from 'next/head'
import { isMobile } from 'react-device-detect';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turkeyLoaded: false,
      timeseriesLoaded: false,
      searchActive: false,
      searchResult: [],
      showSearchResult: false,
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.sort = this.sort.bind(this)
    this.onSearchClick = this.onSearchClick.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
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
    let cardList = []

    if (this.state.showSearchResult) {
      if (this.state.showForme) {
        if (this.isTurkeyLoaded()) {
          cardList.push(this.createCard("Turkey", this.state.turkeyTimeSeries["Turkey"]))
        }
      } else {
        if (this.state.searchResult == undefined || this.state.searchResult.lenght == 0) {
          cardList = this.createInfoPanel("Not Found!")
        } else {
          cardList = this.createCards(this.state.searchResult)
        }
      }

    } else {
      if (this.state.total != undefined) {
        cardList.push(this.createCard("Total", this.state.total))
      }

      let list = this.getCountries()
      if (list != undefined) {
        cardList.push(this.createCards(list))

      } else {
        cardList = this.createInfoPanel("Loading...")
      }
    }
    console.log(this.state.searchActive)
    let searchBar = {}
    if (this.state.searchActive) {
      searchBar = this.createSearchBar()
    } else {
      searchBar = (<div></div>)
    }

    let bottomText = "Touch for Info"
    if (!isMobile) {
      bottomText = "Click for Info"
    }

    return (
      <div>
        <Head>
          <title>Covid19 Charts</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header onSearchClick={this.onSearchClick} />
        {searchBar}
        <List>
          {cardList}
        </List>
        <footer>
          <a href="https://github.com/jhalitaksoy/covid19-chart">{bottomText}</a>
        </footer>
        <style jsx>{`
          footer{
            position: fixed;
            bottom: 0;
            height : 20px;
            width : 100%;
            background-color : #E5F0FF;
            display : flex;
            align-items : center;
            justify-content: center;
            border : 1px solid #B5FBDD;
            padding : 3px;
          }

          footer a{
            text-decoration : none;
            color : #BE5D77;
            font-size : 12px;
          }

          div{
            height : inherit;
          }
        `}
        </style>
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            height : 100%;
          }

          html{
            height : 100%;
          }

          #__next{
          }
        `}
        </style>
      </div>);
  }

  createSearchBar() {
    return (<div className="search-bar">
      <input autoFocus onChange={this.onSearchChange} className="textbox" type="text" placeholder="Search Country in English" />

      <style jsx>{`
          .search-bar {
            width : 100%;
            height : 40px;
            display : flex;
            align-items : center;
            justify-content : center;
            margin-top : 10px;
          }
          .textbox{
            max-width :250px;
            height : 25px;
            width : 100%;
            margin : auto;
            border-radius : 5px;
            border : 1px solid #DEC0C1;
            color : #460000;
            padding : 3px;
            padding-left : 10px;
          }
        `}
      </style>
    </div>);
  }

  onSearchClick(searchActive) {
    this.setState({
      searchActive: searchActive,
      showSearchResult: false,
      searchResult: undefined,
    })
  }

  onSearchChange(event) {
    let countryList = []
    if (event.target.value.trim() === "") {
      this.setState({
        showSearchResult: false,
        showForme: false,
        searchResult: undefined,
      })
    }
    else if (event.target.value.trim() == "@forme") {
      this.setState({
        showSearchResult: true,
        showForme: true,
        searchResult: undefined,
      })
    }
    else {
      let i = 0
      this.state.sorted.forEach(element => {
        if (i < 5) {
          let c1 = element.country.toLowerCase().trim()
          let c2 = event.target.value.toLowerCase().trim()
          if (c1.startsWith(c2.toLowerCase())) {
            countryList.push(element.country)
            i++;
          }
          else if (c1.toLowerCase().search(c2.toLowerCase()) > 0) {
            countryList.push(element.country)
            i++;
          }
        }

      });
      this.setState({
        showSearchResult: true,
        showForme: false,
        searchResult: countryList,
      })
    }
  }

  getCountries(max = 15) {
    let res = []
    if (this.state.sorted != undefined) {
      for (let i in this.state.sorted) {
        res.push(this.state.sorted[i].country)
        if (i > max) {
          break
        }
      }
      return res
    } else {
      return undefined
    }
  }

  createCards(countries) {
    let list = []
    countries.forEach(country => {
      list.push(this.createCard(country, this.state.timeseries[country]))
    });
    return list
  }

  createInfoPanel(info) {
    return (
      <div>
        <h4>
          {info}
        </h4>
        <style jsx>{`
      div {
        width : 100%;
        height : 100%;
        display : flex;
        align-items : center;
        justify-content : center;
      }
    `}
        </style>
      </div>
    )
  }

  createCard(title, data) {
    return (
      <Card>
        <CardTitle title={title} />
        <Chart data={data} />
      </Card>
    )
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
