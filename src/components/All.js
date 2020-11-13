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

function All() {
  const classes = useStyles();
  const [countries, setCountries]= useState([{}]);
  // const [country, setInputCountry] = useState("worldwide");

  const [countryInfo, setCountryInfo]= useState({})

  // useEffect(() => {
  //   fetch("https://covid19.mathdro.id/api")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCountryInfo(data);
  //     });
  // }, []);

  useEffect(() => {
      const getCountriesData = async () => {
          await fetch ("https://covid19.mathdro.id/api/countries")
          .then((response) => response.json())
          .then((data) => {
              const countries = data.map((country) => ({
                      name : country.countries.name,
                      value: country.countries.iso2,
                }));
                  setCountries(countries);
                  console.log("from all",setCountries)
            }); 
    };
    getCountriesData();
 },[]);

 const onCountryChange = (event) =>{
   const countryCode= event.target.value;
   console.log("hhh",countryCode)
//    setInputCountry(countryCode);

   const url =
      countryCode === `https://covid19.mathdro.id/api/countries/${countryCode}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // setInputCountry(countryCode);
        setCountryInfo(data);

  //       delete url.criticalPerOneMillion;
  //       delete url.recoveredPerOneMillion;
  //       delete url.activePerOneMillion;
  //       delete url.oneDeathPerPeople;
  //       delete url.oneCasePerPeople;
  //       delete url.testsPerOneMillion;
  //       delete url.deathsPerOneMillion;
  //       delete url.continent;
  //       delete url.population;
  //       delete url.affectedCountries;
  //       delete url.active;
  //       delete url.oneTestPerPeople;
  //       delete url.updated;
  //       delete url.casesPerOneMillion;
  //       console.log(countryInfo)
      });
  };
  return (
  <div className={classes.all}>

    {/* <h3 className={classes.title}>Find covid19 stats of any country</h3>
  */}
    <FormControl>
        <Select 
        variant="outlined" 
        value=""
        onChange={onCountryChange}>
            {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
        </Select>
    </FormControl>
  </div>
  );
};
export default All;

