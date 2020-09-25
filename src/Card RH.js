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
import FeedbackIcon from '@material-ui/icons/Feedback';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {VictoryPie, VictoryContainer, VictoryChart, VictoryBar, VictoryTheme, VictoryVoronoiContainer, VictoryLabel} from 'victory';
import { Title } from '@material-ui/icons';


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

export default function CardRH() {
  const classes = useStyles(CustomTheme);
  const [expanded, setExpanded] = React.useState(false);
  const [porcPos, setPorcPos] = React.useState(84);
  const [mesAtual, setMesAtual] = React.useState('Setembro');
  const [mesAnt, setMesAnt] = React.useState('Agosto');
  const [porcPosAnt, setPorcPosAnt] = React.useState(81);
  const [mesAntAnt, setMesAntAnt] = React.useState('Julho');
  const [porcPosAntAnt, setPorcPosAntAnt] = React.useState(79);
  const [unidade, setUnidade] =React.useState('São Paulo');
  const title = "Status da Klabin Unidade: " + unidade;
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.root}>
      <CardHeader
        title = {title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Os feedbacks desta semana foram {porcPos}% positivos!
        </Typography>
      </CardContent>
      <CardActions  disableSpacing>
        <IconButton aria-label="add to favorites">
          <ListAltIcon/>
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
          495 feedbacks
        </Typography>
        <IconButton aria-label="add to favorites">
          <FeedbackIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
          40 redflags
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
                Clique para mais detalhes
            </Typography>  
        }
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div style={{display: "flex", justifyContent:"space-around"}}>
          <VictoryPie
            data={[
            { x: "Cats", y: 35 },
            { x: "Dogs", y: 40 },
            { x: "Birds", y: 55 }
            ]}
            colorScale = {['#009530', '#50c75e', '#006600']}
            // width='20%'
            height={300}
            containerComponent={<VictoryContainer style={{width:'300px', height:'300px'}}/>}
            // padding='2%'
            //radius =
          />
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={10}
            containerComponent={<VictoryVoronoiContainer style={{width:'300px', height:'300px'}}/>}
            height={300}
          >
            <VictoryBar
              style={{ data: { fill: CustomTheme.palette.secondary.main } }}
              data={[
                { x: mesAntAnt, y: porcPosAntAnt },
                { x: mesAnt, y: porcPosAnt },
                { x: mesAtual, y: porcPos }
                ]}
              labels={[porcPosAntAnt+'%', porcPosAnt+'%', porcPos+'%']}
            />
            <VictoryLabel x={0} y={40} 
              text={"Em porcentagem [%]"}
            />
            <VictoryLabel x={80} y={10} 
              text={"Feedbacks positivos por mês"}
            />
          </VictoryChart>
        </div>
      </Collapse>
    </Card>
  );
}