import React from 'react';
import GlobalStats from './GlobalStats';
import Pakistan from './Pakistan'
import CountryStats from './CountryStats';


export default function Panel({currentScreen}) {

  if(currentScreen === 0)
    return <GlobalStats />
  else if(currentScreen === 1)
    return <Pakistan />
  else if(currentScreen === 2)
  return <CountryStats />

  else return <GlobalStats/>

}

