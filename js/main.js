var DB = (DB || {});

function Article(seed, data) {
  this.team = 'TEAM';
  this.title = 'TEAM finds new home';
  this.quote = '';
  this.titlePrefix = true;
  this.articleType = 1; // 1 = new player to existing roster, 2 = team disbanded, 3 = new formed team

  if (data) {
    this.db = data;
  } else {
    console.log('No Data Found');
    this.db = {};
  }

}

Article.prototype.createTeam = function () {
  var self = this;
  var teamNameTypes = ['prefix', 'solo', 'suffix', 'rasta'];
  var teamNameType = randomItem(teamNameTypes);

  if (self.db.hasOwnProperty('team_names')) {
    var teamName = randomItem(self.db.team_names); // base team name

    switch (teamNameType) {
      case 'prefix':
        var prefix = randomItem(self.db.team_prefix);
        self.team = prefix + teamName;
        break;
      case 'solo':
        self.team = teamName;
        break;
      case 'suffix':
        var suffix = randomItem(self.db.team_suffix);
        self.team = teamName + suffix;
        break;
      case 'rasta':
        self.team = 'Rasta' + teamName.substring(0, 2).toUpperCase();
        break;
    }

  }

};

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBool(likelihood) {
  return Math.random() * 100 < (likelihood || 50);
}

function generateArticle() {
  var article = new Article(0, DB);
  article.createTeam();
  updateArticle(article);
  console.log(article.team);
}

function updateArticle(obj) {

  // Set the article title
  $('#article_title').html(obj.team);

  // TODO
  // set random (100 < cc > 5)comment count
  // set players
  // set quote
  // set article
  // set comments

}

function handleSuccess(data) {
  DB = data; // todo test data is done nicely
  generateArticle();
}

$(function () {

  $.ajax({
    dataType: 'json',
    url: 'data.json',
    data: {},
    success: handleSuccess
  });

  $('#generate_button').click(function (e) {
    return generateArticle();
  });

});