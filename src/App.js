import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { Header } from './Componentes/ui/Header'
import { UserView } from './Componentes/Usuario/UserView'
import { DirectorView } from './Componentes/Director/DirectorView'
import { GeneroView } from './Componentes/Genero/GeneroView'
import { MediaView } from './Componentes/Media/MediaView'
import { ProductoraView } from './Componentes/Productora/ProductoraView'
import { TipoViewv } from './Componentes/Tipo/TipoViewv'
import {MediaUpdate} from './Componentes/Media/MediaUpdate'




function App() {
  return <Router>
 <Header/>
    <Switch>
      <Route exact path="/" component={MediaView}/>
      <Route exact path="/director" component={DirectorView}/>
      <Route exact path="/genero" component={GeneroView}/>
      <Route exact path="/productora" component={ProductoraView}/>
      <Route exact path="/tipo" component={TipoViewv}/>
      <Route exact path="/usuario" component={UserView}/>
      <Route exact path="/media/edit/:mediaId" component= {MediaUpdate}/>
      <Redirect to= '/'/>
    </Switch>
</Router>

}

export default App;
