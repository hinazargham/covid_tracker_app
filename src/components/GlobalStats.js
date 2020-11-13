import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';

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
    textAlign:'center'
  }
}));

export default function GlobalStats() {

  const [globalData, setGlobalData]= useState({});
//   console.log(currentScreen);
    useEffect(()=>{
        async function getData(){
            const response = await fetch("https://covid19.mathdro.id/api");
            // const response = await fetch("https://api.thevirustracker.com/free-api?global=stats"); api not working
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
    
            setGlobalData(data);
            console.log(data)
        }
        getData();
    },[])
  const classes = useStyles();

  return (
    <div className={classes.root}>

<h3 className={classes.title}>Covid19 Updates (Live) Worldwide</h3>

      <Grid container spacing={3}>

        {Object.keys(globalData).map((key,index)=> 
        {
          return (
            <Grid item xs={12} sm={4} key={index}>
          <Paper className={classes.paper} 
          elevation={5}>
            <h3 className={classes.title}>
              {/* {key.toLocaleUpperCase()} */}
              {key}
              </h3>
            <h4>
            <CountUp start={0} end={globalData[key].value} duration={2.75} separator="," />
              {/* {globalData[key].value} */}
            </h4>
              
          <i>Number of {key} cases</i>

          </Paper>
        </Grid>


    
        
          )
        })}
      </Grid>

    </div>
  );
}
