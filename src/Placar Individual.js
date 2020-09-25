import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CustomTheme from './Palette.js';

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
  let rows;
  
  const getData = () => {
    const topFive = this.arrTop.slice(0,4);
    const rows = [];
    var i = 0;
    if (i<5) {
      rows.push(createData(i,topFive[i].name, topFive[i].points, topFive[i].dep));
      i++;
    }
  }

  return (
    <TableContainer component={Paper} style={{marginLeft:'2%',marginRight:'2%'}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              Placar Individual
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
          {rows.map((row) => (
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
    </TableContainer>
  );
}
