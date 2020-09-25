import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import CONST from './CONST'


const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function RedFlagsNote() {
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [redFlags, setRedFlags] =React.useState([{}]);

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
  }, [])
  
  const [redFlagsMachistas, setRedFlagsMachistas] =React.useState([]);
  const [redFlagsLgbtFobicas, setRedFlagsLgbtFobicas] =React.useState([]);
  const [redFlagsRacistas, setRedFlagsRacistas] =React.useState([]);
  const [redFlagsOutros, setRedFlagsOutros] =React.useState([]);

  useEffect(() => {
    setRedFlagsMachistas(classificaRedFlag('machista', redFlags));
    setRedFlagsLgbtFobicas(classificaRedFlag('LGBTQ+fóbicos', redFlags));
    setRedFlagsRacistas(classificaRedFlag('racista', redFlags));
    //setRedFlagsOutros(redFlags.filter(x => (!redFlagsMachistas && !redFlagsLgbtFobicas && !redFlagsRacistas).includes(x)));
  }, redFlags)

  

  const classificaRedFlag = (teor, redFlags) => {
    if (redFlags && redFlags[0].feedbackRedFlags) {
      const conjRedFlags = [];
      let i=0;
      while (i<redFlags.length) {
        if ((redFlags[i].feedbackRedFlags).includes(teor)) {
          conjRedFlags.push(redFlags[i].feedbackText);
        }
        i++;
      }
      return conjRedFlags;
    }
  }

  return (
    <div>
      <p style={{marginLeft:"10px", fontSize:'18px'}}><strong>Redflags</strong></p>
      {redFlagsMachistas && redFlagsMachistas.length!=0 &&
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
      <Typography>Foram identificados {redFlagsMachistas.length} de teor machista</Typography>
        </AccordionSummary>
        {redFlagsMachistas.map((flag) => {
          return (
            <AccordionDetails>
              <Typography>
                {flag || ''}
              </Typography>
          </AccordionDetails>)
          })}
      </Accordion>
      }
      {redFlagsLgbtFobicas && redFlagsLgbtFobicas.length!=0 &&
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Foram identificados {redFlagsLgbtFobicas.length} de teor lgtbq+fóbicos</Typography>
        </AccordionSummary>
          {redFlagsLgbtFobicas.map((flag) => {
          return (
            <AccordionDetails>
              <Typography>
                {flag || ''}
              </Typography>
          </AccordionDetails>)
          })}
      </Accordion>
      }
      {redFlagsRacistas && redFlagsRacistas.length!=0 &&
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Foram identificados {redFlagsRacistas.length} de teor racistas</Typography>
        </AccordionSummary>
          {redFlagsRacistas.map((flag) => {
            return (
              <AccordionDetails>
                <Typography>
                  {flag || ''}
                </Typography>
            </AccordionDetails>)
            })}
      </Accordion>
      }
      {redFlagsOutros && redFlagsOutros.length!=0 &&
      <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Foram identificados {redFlagsOutros.length} de outros teores</Typography>
        </AccordionSummary>
        {redFlagsOutros.map((flag) => {
          return (
            <AccordionDetails>
              <Typography>
                {flag || ''}
              </Typography>
          </AccordionDetails>)
          })}
      </Accordion>
      }
    </div>
  );
}