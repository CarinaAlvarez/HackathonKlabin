import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomTheme from './Palette.js';
import wordcloud from './wordclouds/wordcloud.png';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {VictoryPie, VictoryContainer, VictoryChart, VictoryBar, VictoryTheme, VictoryVoronoiContainer, VictoryLabel} from 'victory';
import { Title } from '@material-ui/icons';
import RedFlagsNote from './RedFlagsNote';
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
  const [redFlags, setRedFlags] =React.useState([{}]);
  const title = "Status da Klabin Unidade: " + unidade;
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getRedFlags = async () => {
    try {
      let response = await fetch(`${CONST.apiBaseURL}redflags/`);
      let responseJson = await response.json();
      setRedFlags(responseJson);
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRedFlags();
    updateWordcloud();
  }, [])

  const updateWordcloud = async () => {
    try {
      let response = await fetch(`${CONST.apiBaseURL}/wordcloud/`);
      let responseJson = await response.json();
      console.log(responseJson);
    }
    catch (err) {
      console.log(err)
    }
  }

  

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
          {`${redFlags.length} alertas`}
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
        {wordcloud && 
          <img 
            src={wordcloud} 
              style={{
                marginLeft: "25%", 
                width:"50%",
                marginBottom:"-10%",
                marginTop:"-5%"
              }}
            />
           }
        <div style={{display: "flex", justifyContent:"space-around"}}>
          <VictoryPie
            data={[
            { x: "Feedbacks Positivos", y: 84 },
            { x: "Feedbacks Negativos", y: 16 }
            ]}
            colorScale = {['#229922', '#991111']}
            height={300}
            containerComponent={<VictoryContainer style={{width:'300px', height:'300px'}}/>}
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
        <RedFlagsNote/>
      </Collapse>
    </Card>
  );
}