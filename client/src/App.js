import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Splash from "./pages/Splash";
import MainMenu from "./pages/MainMenu";
import CalorieEntry from "./pages/CalorieEntry";
import CalorieEntryEdit from "./pages/CalorieEntryEdit";
import CalorieData from "./pages/CalorieData";
import StoreFinder from "./pages/StoreFinder";
import RecipeFinder from "./pages/RecipeFinder";
import HealthTimeline from "./pages/HealthTimeline";
import HealthCard from "./pages/HealthCard";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
// import Login from "./"
import Amplify, { Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

Amplify.configure(awsconfig);

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    Hub.listen('auth', (data) => {
      const { payload } = data
      console.log('A new auth event has happened: ', data)
       if (payload.event === 'signIn') {
         console.log('a user has signed in!')
       }
       if (payload.event === 'signOut') {
         console.log('a user has signed out!')
       }
       localStorage.setItem("username", payload.data.attributes.email);
    });
  }
  
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Splash} />
            {/* <Route exact path="/Login" component={Login} /> */}
            <Route exact path="/MainMenu" component={MainMenu} />
            <Route exact path="/CalorieEntry" component={CalorieEntry} />
            <Route exact path="/CalorieEntryEdit" component={CalorieEntryEdit} />
            <Route exact path="/CalorieData" component={CalorieData} />
            <Route exact path="/StoreFinder" component={StoreFinder} />
            <Route exact path="/RecipeFinder" component={RecipeFinder} />
            <Route exact path="/HealthTimeline" component={HealthTimeline} />
            <Route exact path="/HealthCard" component={HealthCard} />
            <Route exact path="/Resources" component={Resources} />
            <Route exact path="/Contact" component={Contact} />
            {/* <Route exact path="/anotherpage/:id" component={AnotherPage} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

//  render={() => (<CalorieEntryEdit calorieData={"Hello There"}/>)}

export default withAuthenticator(App, { includeGreetings: false} );
