var ReportType = function(value) {
    this.value = value;
};

var REPORT_TYPE = {
    'CSV': new ReportType('CSV')
  , 'HTML': new ReportType('HTML')
};

var TableDelimiterStrategy = {
    'CSV': {
        preCell:    function() { return '\"'; }
      , postCell:   function() { return '\"'; }
      , postBetweenCell:   function() { return ','; }
      , preRow:     function() { return ''; }
      , postRow:    function() { return '\n'; }
      , preTable:   function() { return ''; }
      , postTable:  function() { return ''; }
    }
  , 'HTML': {
        preCell:    function() { return '\t<td>'; }
      , postBetweenCell:   function() { return ''; }
      , postCell:   function() { return '</td>'; }
      , preRow:     function() { return '<tr>\n'; }
      , postRow:    function() { return '</tr>\n'; }
      , preTable:   function() { return '<table>\n'; }
      , postTable:  function() { return '</table>\n'; }
    }
};
