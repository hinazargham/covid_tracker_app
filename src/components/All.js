import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  all: {
    textAlign:'center'

  },
  title:{
    color:'#3f51b5',
    textTransform: 'uppercase',
    textAlign:'center'
  }
});

export default function All() {
  
  const classes = useStyles();
  const [countries, setCountries]= useState([]);

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

return (
  <div className={classes.all}>
    <h3 className={classes.title}>Find covid19 stats of any country</h3>

    <FormControl>
        <Select 
        variant="outlined" 
        value="abc">
          <MenuItem value="Worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
        </Select>
    </FormControl>

    
  </div>
  );
}
