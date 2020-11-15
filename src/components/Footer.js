import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import SvgIcon from '@material-ui/core/SvgIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import covid from './covid.png'

const useStyles = makeStyles({
  root: {
      position: 'absolute',
      top: 50,
      bottom: 0,
      right: 0,
      left: 0
  },
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function Footer({screenConfig}) {
  const classes = useStyles();
  console.log(screenConfig[0])
//   const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={screenConfig[0]}
      onChange={(event, newValue) => {
          console.log(newValue)
          screenConfig[1](newValue);
      }}
      showLabels
      className={classes.root}
    >
      
      <BottomNavigationAction label="Global Stats" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Pakistan Stats" icon={<HomeIcon />} />
      <BottomNavigationAction label="All Countries Stats" icon={<LocationOnIcon />} />
      <BottomNavigationAction label="Graphs" icon={<FavoriteIcon/>} />
      <img src={covid} alt="covid" />;
      
    </BottomNavigation>
  );
}
