import React from 'react';
import { Button, ButtonSize, ButtonType } from './components/Button/button'
import { Alert, AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';
import Icon from './components/Icon/icon';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon='arrow-down' size="5x" />
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
        <hr />
        <Menu defaultIndex="0">
          <MenuItem>menu 1</MenuItem>
          <MenuItem disabled>menu 2</MenuItem>
          <SubMenu title="submenu title">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>menu 3</MenuItem>
        </Menu>
        <Menu defaultIndex="0" mode="vertical" defaultOpenSubMenus={['2']}>
          <MenuItem>menu 1</MenuItem>
          <MenuItem disabled>menu 2</MenuItem>
          <SubMenu title="submenu title">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>menu 3</MenuItem>
        </Menu>
        <hr />
        <Tabs>
          <TabItem label={<Button size={ButtonSize.Small}>Default Small</Button>}>
            This is tab1 content.
          </TabItem>
          <TabItem label="tab2">
            This is tab2 content.
            <Button onClick={() => {console.log('123')}} size={ButtonSize.Small}>Default Small</Button>
          </TabItem>
          <TabItem label="tab3" disabled>
            This is tab3 content.
          </TabItem>
        </Tabs>
        <Tabs type="card">
          <TabItem label="tab1">
            This is tab1 content.
          </TabItem>
          <TabItem label="tab2">
            This is tab2 content.
          </TabItem>
          <TabItem label="tab3" disabled>
            This is tab3 content.
          </TabItem>
        </Tabs>
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
