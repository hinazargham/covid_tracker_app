import React from 'react';
import GlobalStats from './GlobalStats';
import Countries from './Countries';
import Daily from './Daily';


export default function Panel({currentScreen}) {

  if(currentScreen === 0)
    return <GlobalStats />
  else if(currentScreen === 1)
    return <Countries />
  else if(currentScreen === 2)
  return <Daily />
  else return <GlobalStats/>

}

