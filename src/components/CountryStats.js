import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';
import Time from './Time';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign:'center',
    position: 'center',
    maxWidth: 1000,
    margin:'0 auto',
    // marginTop:50,
  },
  all: {
      marginTop: 60,
      position: 'center',
      top: 60,
      // bottom: 0,
      right: 0,
      textAlign:'center',
      // flex:0.9,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title:{
    color:'#3f51b5',
    textTransform: 'uppercase',
    textAlign:'center'
  }
}));

const CountryStats = () => {
  const classes = useStyles();
  const [country, setInputCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo]= useState([]);
  const [countries, setCountries]= useState([]);


  useEffect(()=>{
    async function getcountryInfoData(){
        const response = await fetch("https://covid19.mathdro.id/api");
        let data=await response.json();

        delete data.source;
        delete data.image;
        delete data.dailyTimeSeries;
        delete data.countryDetail;
        delete data.dailySummary;
        delete data.lastUpdate;
        delete data.countries;
        delete data.confirmed.detail;
        delete data.recovered.detail;
        delete data.deaths.detail;

        setCountryInfo(data);
        console.log(data)
    }
    getcountryInfoData();
},[])

  useEffect(() => {
      const getCountriesData = async () => {
          fetch ("https://covid19.mathdro.id/api/countries")
          .then((response) => response.json())
          .then((data) => {
            console.log("data of country",data)
            const countries = data.countries.map((country) => ({
              name : country.name,
              value: country.iso3,
          }));
          setCountries(countries);
          console.log("after mapping data of country",countries)
    }); 
    };
    getCountriesData();
 },[]);

 const CountryChange = async (e) => {
   const countryCode= e.target.value;

   const url =
   countryCode === "worldwide"
     ? "https://covid19.mathdro.id/api/countries"
     : `https://covid19.mathdro.id/api/countries/${countryCode}`;

     await fetch(url)
     .then((response) => response.json())
     .then((data) => {
    
       setInputCountry(countryCode);
       delete data.lastUpdate;
       setCountryInfo(data);
     });
 }

  return (
  <div className={classes.all}>

<h3 className={classes.title}>Covid19 Updates (Live) for all Countries </h3>
 
    <FormControl className={classes.paper}>
        <Select 
        variant="outlined" 
        onChange={CountryChange}
        value={country}>
          <MenuItem value="Worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
        </Select>
    </FormControl>

    <Grid container spacing={3} className={classes.root}>

    {Object.keys(countryInfo).map((key,index)=> {
      return (
      <Grid item xs={12} sm={4} key={index}>
          <Paper className={classes.paper} elevation={5}>
          <h3 className={classes.title}>{key}</h3>
          <h4>
            <CountUp start={0} end={countryInfo[key].value} duration={0.5} separator="," />
            </h4>
      <p> Number of {key} cases </p>
          
          </Paper>
      </Grid>
  ) })}
  </Grid>  

  <Time/>

  </div>
  );
}
export default CountryStats;


