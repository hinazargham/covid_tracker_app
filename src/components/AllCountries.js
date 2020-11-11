import React, { useState, useEffect} from 'react';
import { MenuItem, FormControl, Select } from "@material-ui/core";

const AllCountries = () => {
    const [countries, setCountries]= useState([]);

  useEffect(() => {
      const getCountriesData = async () => {
          await fetch ("https://disease.sh/v3/covid-19/all")
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
  <div>
    <div>
    <FormControl>
        <Select 
        variant="outlined" value="abc">
            {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
        </Select>
    </FormControl>
    </div>
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
