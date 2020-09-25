import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import StarsIcon from '@material-ui/icons/Stars';
import GroupIcon from '@material-ui/icons/Group';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CustomTheme from './Palette.js';
import felipe from './Felipe.png';
import CONST from './CONST'

const useStyles = makeStyles((theme) => ({
  root: {
    'margin-left': '5%',
    width: "90%",
    margin: 50, 
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles(CustomTheme);
  const [expanded, setExpanded] = React.useState(false);
  const [pontosInd, setPontosInd] = React.useState(123);
  const [pontosDep, setPontosDep] = React.useState(1208);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getUserData = async () => {
    try {
      let response = await fetch(`${CONST.apiBaseURL}employee/?name=felipe`);
      let responseJson = await response.json();
      console.log(responseJson);
      setPontosInd(responseJson[0].points)
    }
    catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    getUserData();
  }, [])

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img alt="felipe" src={felipe}></img>
          </Avatar>
        }
        title='Felipe'
        subheader="25 de Setembro de 2020"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Converse com a Luna e ganhe pontos! Quanto maior a frequência de seu contato com a Luna, mais pontos são ganhos!
        </Typography>
      </CardContent>
      <CardActions  disableSpacing>
        <IconButton aria-label="add to favorites">
          <StarsIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
          {pontosInd} pts
        </Typography>
        
        <IconButton aria-label="share">
          <GroupIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
          {pontosDep} pts
        </Typography>
      </CardActions>
    </Card>
  );
}