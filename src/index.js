import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import data from './utils/data';

ReactDOM.render(
  <App data = {data}/>,
  document.getElementById('root')
);