(function () {

  var botName = 'david-bot'

  var BotClass = function () {
    // <<Initialize bot state here>>
    var deck = { 14: 2, 13: 2, 12: 2, 11: 2, 10: 2, 9: 2, 8: 2, 7: 2, 6: 2, 5: 2, 4: 2, 3: 2, 2: 2},
    oppDeck = {
      14: 4 - deck[14],
      13: 4 - deck[13],
      12: 4 - deck[12],
      11: 4 - deck[11],
      10: 4 - deck[10],
      9: 4 - deck[9],
      8: 4 - deck[8],
      7: 4 - deck[7],
      6: 4 - deck[6],
      5: 4 - deck[5],
      4: 4 - deck[4],
      3: 4 - deck[3],
      2: 4 - deck[2]
    },
    roundCount = 0;
    return {
      name: botName,
      play: function (drawnCard, remainingDeckSize, moveType) {
        //
        // moveType will be either 'normal', 'war', 'normal-gamble', or 'war-gamble'
        //
        // Return 'accept' to play the drawn card, or 'gamble' to draw a different card.
        //
        roundCount++
        console.log(roundCount)
        console.log(deck)
        console.log(oppDeck)
        if (drawnCard.value <= 8 && (moveType === 'normal' || moveType === 'war')) {
          return 'gamble'
        }
        else {
          return 'accept'
        }
      },
      handleRoundResult: function (didIWin, loot) {
        // TODO: Whatever you want. You can do aanything
        console.log(loot)
        if(didIWin) {
          for(var i = 0, x = loot.length; i < x; i++) {
            if(!loot[i].isMine) {
              deck[loot[i].value] += 1;
              oppDeck[loot[i].value] -= 1;
            }
          }
        } else {
          for(var j = 0, x = loot.length; j < x; j++) {
            if(loot[j].isMine) {
              deck[loot[j].value] -= 1;
              oppDeck[loot[j].value] += 1;
            }
          }
        }
      }
    }
  }

  BotClass.botName = botName

  var isNodeJs = typeof module != "undefined" && module !== null && module.exports
  if (isNodeJs) {
    module.exports = BotClass
  }
  else {
    BotRegistry.register(botName, BotClass)
  }
})()
