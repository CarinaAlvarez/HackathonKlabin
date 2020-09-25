import React from 'react';
import SearchAppBar from './Header';
import CustomTheme from './Palette.js';
import { ThemeProvider } from '@material-ui/core/styles';
import RecipeReviewCard from './CardInicial';
import CardRH from './Card RH';
import Card2 from './CardHist';
import Card3 from './CardPlacar';
import ChatWindow from './ChatWindow';

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <div className='App'>
        <SearchAppBar></SearchAppBar>
      </div>
      <div>
        <RecipeReviewCard></RecipeReviewCard>
      </div>
      <div>
        <Card3></Card3>
      </div>
      <div>
        <Card2></Card2>
      </div>
      <div>
        <CardRH></CardRH>
      </div>
      <ChatWindow/>
    </ThemeProvider>
  );
}

export default App;
