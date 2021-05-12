import React from 'react';
import { Button, ButtonSize, ButtonType } from './components/Button/button'
import { Alert, AlertType } from './components/Alert/alert';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => {console.log('123')}} size={ButtonSize.Small}>Default Small</Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>Primary Large</Button>
        <Button btnType={ButtonType.Danger}>Danger</Button>
        <Button disabled>Disabled</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank">Link</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>Link Disabled</Button>
        <hr />
        <Alert title="Default Alert" />
        <Alert title="Danger Alert closeable" type={AlertType.Danger} closeable />
        <Alert title="Warning Alert" type={AlertType.Warning} />
        <Alert title="Success Alert closeable" description="This is description." type={AlertType.Success} closeable />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
