import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { POINTS_CLASSNAME, MAPCONTAINER_CLASSNAME } from "./constants";

describe("проверка из коробки", function(){
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("проверка составляющих", function(){
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);

  it('список точек маршрута отображается', () => {
    expect(div.querySelectorAll("." + POINTS_CLASSNAME).length).toBeGreaterThan(0);
  });

  it('загрузилась Яндекс.Карта', ()=>{
    expect(div.querySelector('.' + MAPCONTAINER_CLASSNAME).contains(div.querySelector("[class^='ymaps']")))
  });

  it('загрузились точки на карте', ()=>{
    expect(div.querySelector('.' + MAPCONTAINER_CLASSNAME).contains(div.querySelector("[class~='placemark']")))
  });

});