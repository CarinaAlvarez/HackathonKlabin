import React from 'react';
import { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import CustomTheme from './Palette.js';
import CONST from './CONST'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(posicao,name, score, departamento) {
  return {posicao, name, score, departamento};
};

const useStyles = makeStyles({
  table: {
    'margin-bottom': '10px'
  },
});

export default function Placar() {
  const classes = useStyles(CustomTheme);
  const [arrTop, setArrTop] = React.useState();
  
  const getData = async () => {
    let result;
    let scores;
    try {
      scores = await fetch(`${CONST.apiBaseURL}topscores/`);
      result = await scores.json();
      console.log(result);
      const topFive = result.slice(0,5);
      const rows = [];
      var i = 0;
      while (i<5) {
        rows.push(createData(i+1,topFive[i].employeeName, topFive[i].points, topFive[i].employeeTeam));
        i++;
      }
      console.log(rows);
      setArrTop(rows)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log('effect')
    getData()
  }, [])

  return (
    <TableContainer component={Paper} style={{marginLeft:'2%',marginRight:'2%'}}>
      {(arrTop) ?
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              <strong>Placar Individual</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="right">Nome</StyledTableCell>
            <StyledTableCell align="right">Pontos&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Departamento&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrTop.map((row) => (
            <StyledTableRow key={row.posicao}  align="center">
              <StyledTableCell component="th" scope="row">
                {row.posicao}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.name}</StyledTableCell>
              <StyledTableCell align='right'>{row.score}</StyledTableCell>
              <StyledTableCell align='right'>{row.departamento}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
         :
         <LinearProgress></LinearProgress>
    }
    </TableContainer>
  );
}
