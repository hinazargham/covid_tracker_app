import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    textAlign: 'center',
    margin:'0 auto',
    marginTop:50,
    
  },
  paper: {
    padding: theme.spacing(0.1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title:{
    color:'#4f51b8',
    textAlign:'center'
  }
}));

export default function Time() {

  const [TimeData, setTimeData]= useState({});
    useEffect(()=>{
        async function getData(){
            const response = await fetch("https://covid19.mathdro.id/api");
            let data=await response.json();
            delete data.confirmed;
            delete data.recovered;
            delete data.deaths;
            delete data.source;
            delete data.image;
            delete data.dailyTimeSeries;
            delete data.countryDetail;
            delete data.dailySummary;
            delete data.countries;
    
            setTimeData(data);
            console.log(data)
        }
        getData();
    },[])
  const classes = useStyles();

  return (
    <div className={classes.root}>

<Grid container spacing={5}>
          {Object.keys(TimeData).map((key,index)=> 
            {

          return (
            <Grid className={classes.paper} item xs={12}  key={index}>
          <Paper className={classes.paper} 
          elevation={3}>
            <h5 className={classes.title}>
              {key} :- {TimeData[key]}
              </h5>
        
            
          </Paper>
        </Grid>


    
        
          )
        })}
      </Grid>

    </div>
  );
}
