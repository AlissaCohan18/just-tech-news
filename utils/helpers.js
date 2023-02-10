module.exports = {
  format_date: (date) => {
    //Instead of doing this formatting with Moment, we use the methods built into
    //the Date object to avoid bringing in unnecessary dependencies. If we need more
    //utility around time/date manipulation, then we could justify adding Moment
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },
  format_url: url => {
    return url
    //replace() returns the modified string; and can chain methods like below
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split('/')[0]
      .split('?')[0];
  }
};

