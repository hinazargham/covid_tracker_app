import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import './App.css';


const useStyles = makeStyles({
  all: {
      position: 'absolute',
      top: 60,
      bottom: 0,
      right: 0,
      textAlign:'center',
      flex:0.9,

  },
  title:{
    color:'#3f51b5',
    textTransform: 'uppercase',
    textAlign:'center'
  }
});

const Daily = () => {
  const classes = useStyles();
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo]= useState({});
  const [countries, setCountries]= useState([]);
  
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {

        setCountryInfo(data);

        delete data.criticalPerOneMillion;
        delete data.recoveredPerOneMillion;
        delete data.activePerOneMillion;
        delete data.oneDeathPerPeople;
        delete data.oneCasePerPeople;
        delete data.testsPerOneMillion;
        delete data.deathsPerOneMillion;
        delete data.continent;
        delete data.population;
        delete data.affectedCountries;
        delete data.active;
        delete data.oneTestPerPeople;
        delete data.updated;
        delete data.casesPerOneMillion;
      });
  }, []);

  useEffect(() => {
      const getCountriesData = async () => {
          fetch ("https://disease.sh/v3/covid-19/countries")
          .then((response) => response.json())
          .then((data) => {
              const countries = data.map((country) => ({
                      name : country.country,
                      value: country.countryInfo.iso2,
                  }));
                  setCountries(countries);
            }); 
    };
    getCountriesData();
 },[]);

 const onCountryChange = async (e) => {
   const countryCode= e.target.value;

   const url =
   countryCode === "worldwide"
     ? "https://disease.sh/v3/covid-19/all"
     : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);

        delete url.criticalPerOneMillion;
        delete url.recoveredPerOneMillion;
        delete url.activePerOneMillion;
        delete url.oneDeathPerPeople;
        delete url.oneCasePerPeople;
        delete url.testsPerOneMillion;
        delete url.deathsPerOneMillion;
        delete url.continent;
        delete url.population;
        delete url.affectedCountries;
        delete url.active;
        delete url.oneTestPerPeople;
        delete url.updated;
        delete url.casesPerOneMillion;
      });
  };
  return (
  <div className={classes.all}>

    <h3 className={classes.title}>Find covid19 stats of any country</h3>
 
    <FormControl>
        <Select 
        variant="outlined" 
        onChange={onCountryChange}
        value={country}>
          <MenuItem value="Worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
        </Select>
    </FormControl>

    <Grid container spacing={6}>

    {Object.keys(countryInfo).map((key,index)=> {
      return (
      <Grid item sm={3} key={index}>
        <Paper className={classes.paper} elevation={3}>
          <h3 className={classes.title}>{key}</h3>
          <h4>{countryInfo[key]}</h4>
          </Paper>
      </Grid>
  ) })}
  </Grid>  
   
  </div>
  );
}
export default Daily;


