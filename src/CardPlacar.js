import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import StarsIcon from '@material-ui/icons/Stars';
import GroupIcon from '@material-ui/icons/Group';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CustomTheme from './Palette.js';
import trophy from './trophy.png';
import Placar from './Placar Individual';
import PlacarDep from './Placar Departamento';

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

export default function Card3() {
  const classes = useStyles(CustomTheme);
  const [expanded, setExpanded] = React.useState(false);
  const [colocacaoInd, setColocacaoInd] =React.useState('2º');
  const [colocacaoDep, setColocacaoDep] =React.useState('3º');
  const [mesAtual, setMesAtual] = React.useState('Setembro');
  const [premioInd, setPremioInd] = React.useState('jantar de até 80 reais Outback');
  const [premioDep, setPremioDep] = React.useState('dia de pizza');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img alt="trophy" src={trophy}></img>
          </Avatar>
        }
        title="Placar de Pontos"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Veja sua posição no placar individual e no placar de departamentos!
          <br/>
          <br/>
          Prêmio Individual de {mesAtual}: {premioInd} <br/>
          Prêmio Departamento de {mesAtual}: {premioDep} <br/>
        </Typography>
      </CardContent>
      <CardActions  disableSpacing>
        <IconButton aria-label="add to favorites">
          <StarsIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
          {colocacaoInd}
        </Typography>
        
        <IconButton aria-label="share">
          <GroupIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
          {colocacaoDep}
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        {!expanded && 
            <Typography variant="body2" color="textSecondary" component="p">
                Clique para ver os placares!
            </Typography>  
        }
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div style={{display: "flex", flexDirection:"row"}}>
          <Placar/>
          <PlacarDep/>
        </div>
      </Collapse>
    </Card>
  );
}