class Utils {
  findCurrentUserBet(game, userid) {
    let currentUserBet = {};
    if (game.bets.length > 0) {
      for (let bet of game.bets) {
        if (bet.user._id === userid) {
          currentUserBet = bet;
          break;
        }
      }
    }
    return currentUserBet;
  }
  parseDateToString(origDate) {
    const date = new Date(Date.parse(origDate));
    return (date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
  }

  dropDownNumberOptions = n => {
    let dropDownOptions = [];
    for (let i = 1; i <= n; i++) {
      dropDownOptions.push({ text: i, value: i });
    }
    return dropDownOptions;
  };
}

export default new Utils();
