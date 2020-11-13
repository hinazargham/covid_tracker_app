import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
  all: {
    textAlign:'right'

  },
  title:{
    color:'#3f51b5',
    textTransform: 'uppercase',
    textAlign:'center'
  }
});

const AllCountries = () => {
  const classes = useStyles();
  const [countries, setCountries]= useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo]= useState({})

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
          await fetch ("https://disease.sh/v3/covid-19/countries")
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

 const onCountryChange = (event) =>{
   const countryCode= event.target.value;
   console.log("hhh",countryCode)
   setInputCountry(countryCode);

   const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    fetch(url)
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
        console.log(countryInfo)
      });
  };
  return (
  <div className={classes.all}>

    {/* <h3 className={classes.title}>Find covid19 stats of any country</h3>
  */}
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
export default AllCountries;


// import React from 'react';
// import { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 1000,
//     margin:'0 auto',
//     marginTop:50
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
//   title:{
//     color:'#3f51b5',
//     textTransform: 'uppercase',
//   }
// }));

// export default function GlobalStats() {

//   const [globalData, setGlobalData]= useState({});
// //   console.log(currentScreen);
//     useEffect(()=>{
//         async function getData(){
//             const response = await fetch("https://disease.sh/v3/covid-19/countries");
//             let data=await response.json();
//             delete data.updated;
//             delete data.image;
//             delete data.dailyTimeSeries;
//             delete data.countryDetail;
//             delete data.dailySummary;
//             delete data.lastUpdate;
//             delete data.countries;
    
//             setGlobalData(data);
//             console.log(data)
//         }
//         getData();
//     },[])
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>

//       <Grid container spacing={3}>

//         {Object.keys(globalData).map((key,index)=> 
//         {
//           return (
//             <Grid item xs={12} sm={4} key={index}>
//           <Paper className={classes.paper} 
//           elevation={5}>
//             <h3 className={classes.title}>
//               {key}
//               </h3>
//             <h4>{globalData[key].value}</h4>

//           </Paper>
//         </Grid>
        
//           )
//         })}
//       </Grid>
//     </div>
//   );
// }
