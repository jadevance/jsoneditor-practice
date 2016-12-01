function Editor() {
  var self = this;

  this.codeContainer  = null;
  this.treeContainer  = null;
  this.jsonEditor     = null;
  this.jsonTree       = null;


  this.jsonImport = FileReaderJS.setupInput(document.getElementById('loadDocument'), {
    readAsDefault: 'Text',
    on: {
      load: function (event, file) {
        self.jsonEditor.setText(event.target.result);
      }
    }
  });

  // default 
  this.json = {
    "Array": [1, 2, 3],
    "Boolean": true,
    "Null": null,
    "Number": 123,
    "Object": { "a": "b", "c": "d" },
    "String": "Hello World",
  };

  this.init = function(selector) {
    self.codeContainer = $(selector)
    var codeOptions = {
      mode: 'code',
      onError: function(error) {
          alert(error.toString());
    },
      search: true
    }

    self.jsonEditor = new JSONEditor(codeContainer, codeOptions, self.json);
    self.buildTreeViewer();
    $("#toTree").click(function() { self.updateTree() });
    $("#toCode").click(function() { self.updateCode() });
  }

  this.updateTree = function() {
    var json = self.jsonEditor.get();
    self.jsonEditor.set(json);
    self.jsonTree.set(json);
  }

  this.updateCode = function() {
    var json = self.jsonTree.get();
    self.jsonTree.set(json);
    self.jsonEditor.set(json);
  }


  this.setJson = function() {
    self.jsonEditor = self.jsonEditor.get()
    self.buildTreeViewer();
  }

  this.buildTreeViewer = function() {
    self.treeContainer = document.getElementById("treeContainer");

    var treeOptions = {
      mode: 'tree',
      onError: function (err) {
        alert(err.toString());
      },
      search: true
    };
    self.jsonTree = new JSONEditor(self.treeContainer, treeOptions, self.json);
  }
};


    // // Save a JSON document
    // document.getElementById('saveDocument').onclick = function () {

    //     // Save Dialog
    //     fname = window.prompt("Save as...");

    //     // Check json extension in file name
    //     if (fname.indexOf(".") == -1) {
    //         fname = fname + ".json";
    //     } else {
    //         if (fname.split('.').pop().toLowerCase() == "json") {
    //             // Nothing to do
    //         } else {
    //             fname = fname.split('.')[0] + ".json";
    //         }
    //     }
    //     var blob = new Blob([jsonEditor.getText()], { type: 'application/json;charset=utf-8' });
    //     saveAs(blob, fname);
    // };