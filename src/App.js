//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import Penguin from "./Penguin.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    Penguin,
    clickedPenguin: [],
    score: 0
  };

//when you click on a card ... the Penguin is taken out of the array
  imageClick = event => {
    const currentPenguin = event.target.alt;
    const PenguinAlreadyClicked =
      this.state.clickedPenguin.indexOf(currentPenguin) > -1;

//if you click on a Penguin that has already been selected, the game is reset and cards reordered
    if (PenguinAlreadyClicked) {
      this.setState({
        Penguin: this.state.Penguin.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedPenguin: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available Penguin, your score is increased and cards reordered
    } else {
      this.setState(
        {
          Penguin: this.state.Penguin.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedPenguin: this.state.clickedPenguin.concat(
            currentPenguin
          ),
          score: this.state.score + 1
        },
//if you get all 12 Penguin corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("You Win!");
            this.setState({
              Penguin: this.state.Penguin.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedPenguin: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.Penguin.map(Penguin => (
            <FriendCard
              imageClick={this.imageClick}
              id={Penguin.id}
              key={Penguin.id}
              image={Penguin.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;