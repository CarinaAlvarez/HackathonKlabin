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
import ChatBox from './ChatBox';
import felipe from './Felipe.png';
import {VictoryChart, VictoryBar, VictoryTheme, VictoryVoronoiContainer, VictoryLabel} from 'victory';

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

export default function Card2() {
  const classes = useStyles(CustomTheme);
  const [expanded, setExpanded] = React.useState(false);
  const [pontos, setPontos] = React.useState(84);
  const [mesAtual, setMesAtual] = React.useState('Setembro');
  const [mesAnt, setMesAnt] = React.useState('Agosto');
  const [pontosAnt, setPontosAnt] = React.useState(81);
  const [mesAntAnt, setMesAntAnt] = React.useState('Julho');
  const [pontosAntAnt, setPontosAntAnt] = React.useState(79);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.root}>
      <CardHeader
        title="Histórico de Pontos"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Veja sua evolução individual e de seu departamento!
        </Typography>
      </CardContent>
      <CardActions  disableSpacing>
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
                Clique para ver seus pontos!
            </Typography>  
        }
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div style={{display: "flex", justifyContent:"space-around"}}>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={10}
            containerComponent={<VictoryVoronoiContainer style={{width:'300px', height:'300px'}}/>}
            height={300}
          >
            <VictoryBar
              style={{ data: { fill: CustomTheme.palette.secondary.main } }}
              data={[
                { x: mesAntAnt, y: pontosAntAnt },
                { x: mesAnt, y: pontosAnt },
                { x: mesAtual, y: pontos }
                ]}
                labels={[pontosAntAnt, pontosAnt, pontos]}
            />
            <VictoryLabel x={0} y={40} 
              text={"Pontos"}
            />
            <VictoryLabel x={80} y={30} 
              text={"Pontos individuais por mês"}
            />
          </VictoryChart>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={10}
            containerComponent={<VictoryVoronoiContainer style={{width:'300px', height:'300px'}}/>}
            height={300}
          >
            <VictoryBar
              style={{ data: { fill: CustomTheme.palette.secondary.main } }}
              data={[
                { x: mesAntAnt, y: pontosAntAnt },
                { x: mesAnt, y: pontosAnt },
                { x: mesAtual, y: pontos }
                ]}
              labels={[pontosAntAnt, pontosAnt, pontos]}
            />
            <VictoryLabel x={0} y={40} 
              text={"Pontos"}
            />
            <VictoryLabel x={80} y={30} 
              text={"Pontos por mês do Meu Departamento"}
            />
          </VictoryChart>
        </div>
      </Collapse>
    </Card>
  );
}