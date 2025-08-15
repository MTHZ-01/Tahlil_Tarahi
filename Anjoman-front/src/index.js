import { createContext ,React} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import reducer from "./redux/reducer"
import { createStore } from "redux"
import { Router } from 'react-router-dom';

import { TextField } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const store = createStore(reducer)
const MyContext = createContext();
const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  

  // <ThemeProvider theme={theme}>

    <CacheProvider value={cacheRtl}>
      <Provider store={store}>

        <App />

      </Provider>
    </CacheProvider>

  // </ThemeProvider >


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
