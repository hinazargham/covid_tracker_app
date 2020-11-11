import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { DataUsageOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin:'0 auto',
    marginTop:50
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title:{
    color:'#3f51b5',
    textTransform: 'uppercase',
  }
}));

export default function Daily() {

  const [CountryData, setCountryData]= useState({});
//   console.log(currentScreen);
    useEffect(()=>{
        async function getData(){
            const response = await fetch("https://covid19.mathdro.id/api/daily/2-14-2020");
           let data=await response.json();
            delete data.provinceState;
            setCountryData(data);
            console.log(data)
        }
        getData();
    },[])
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Grid container spacing={3}>

        {Object.keys(CountryData).map((key,index)=> 
        {
          return (
            <Grid item xs={12} sm={4} key={index}>
          <Paper className={classes.paper} 
          elevation={5}>
            <h3 className={classes.title}>
              {key}
              </h3>
            <h4>{CountryData[key]}</h4>

          </Paper>
        </Grid>
        
          )
        })}
      </Grid>
    </div>
  );
}
