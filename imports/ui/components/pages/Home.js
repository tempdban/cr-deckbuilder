import React, { Component } from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import Deck from '../deck';

import SubscribeComponent from '../helpers/SubscribeComponent';;
import  { createDeck } from '../../actions/actions';

class Home extends Component {
  componentWillMount() {
    this.props.subscribe('allTodos');
    this.props.subscribe('allCards');
    this.props.subscribe('allDecks');
  }
  render(){
    let { form, submitHandler, serverError, todos, cards, decks } = this.props;
    let cardsInDeck = decks.map((deck, i )=> {
      let deckCards = deck.cards.map((name, i)=> {
        let cardObj = cards.filter((card, i )=> name === card.idName);
        let cardInfo = cardObj[0];
        console.log('cardinfo', cardInfo);
        return (

          <li className="card" key={i}>
            <img src={cardInfo.image} />
            <div className="cardName">{cardInfo.name}</div>
          </li>
        )
      });
      console.log(deckCards);
      return (
        <ul className= "currentDeck" key={i}> {deckCards}</ul>
      )
    })
    return (
      <div className="home">
        <div className="notifier">
          {serverError.error ? <div className="server-error">{serverError.error.reason}</div> : "" }
        </div>
        <div>{cardsInDeck}</div>
        {/*<ul className="cards">
          {cards.map((card, i )=> <li className="card" key={i}><img src={card.image} />{card.name}</li>)}
        </ul>*/}
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    serverError: state.serverError,
    cards: state.cards,
    decks: state.decks,
    form: state.form.addTodoForm
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitHandler: (form) => {
      console.log(form)
      dispatch(createTodo(form.text.value.toLowerCase()))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeComponent(Home));
