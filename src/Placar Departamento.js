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

function createData(posicao, departamento, score) {
  return {posicao, departamento, score};
}

const rows = [
  createData(1,'Inovação', 963),
  createData(2,'Vendas', 877),
  createData(3,'RH', 865),
  createData(4,'Suporte Técnico', 804),
  createData(5,'Financeiro', 798),
];

const useStyles = makeStyles({
  table: {
    'margin-bottom': '10px'
  },
});

export default function PlacarDep() {
  const classes = useStyles(CustomTheme);

  return (
    <TableContainer component={Paper} style={{ marginLeft:'0',marginRight:'2%'}}>
      <Table className={classes.table} aria-label="customized table" >
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Placar Departamentos
            </TableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="right">Departamento</StyledTableCell>
            <StyledTableCell align="right">Pontos&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.posicao}>
              <StyledTableCell component="th" scope="row">
                {row.posicao}
              </StyledTableCell>
              <StyledTableCell align="right">{row.departamento}</StyledTableCell>
              <StyledTableCell align="right">{row.score}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
