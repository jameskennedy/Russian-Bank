import React from 'react';
import { NotificationContainer } from 'react-notifications';
import 'react-select/dist/react-select.css';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import RussianBankContainer from '../containers/RussianBankContainer';

const App = () => (
  <div>
    <RussianBankContainer />
    <NotificationContainer />
  </div>
);

export default App;
