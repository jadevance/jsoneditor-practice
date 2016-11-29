function Editor() {
  var self = this; 
  //  create the code editor
  var codeContainer = document.getElementById("codeEditor");
  var codeOptions = {
      mode: 'code',
      onError: function (err) {
      alert(err.toString());
     }
  };

  // create the tree viewer
  var viewContainer = document.getElementById("treeViewer");
  var viewOptions = {
      mode: 'tree',
      onError: function (err) {
          alert(err.toString());
      },
      onChange: function (change) { 
        // write this tomorrow, update the json with changes 
      },
      search: true
  };

  var editor = new JSONEditor(codeContainer, codeOptions);
  var viewer = new JSONEditor(viewContainer, viewOptions);

  // get json, will retrieve from controller eventually 
  var json = {
      "Array": [1, 2, 3],
      "Boolean": true,
      "Null": null,
      "Number": 123,
      "Object": {"a": "b", "c": "d"},
      "String": "Hello World"
  };

  // set json
  editor.set(json);
  viewer.set(json);

  // get json from view 
  var jsonEditor = editor.get();
  var jsonViewer = viewer.get();

  // Load a JSON document
  FileReaderJS.setupInput(document.getElementById('loadDocument'), {
      readAsDefault: 'Text',
      on: {
          load: function (event, file) {
              editor.setText(event.target.result);
          }
      }
  });

  // Save a JSON document
  document.getElementById('saveDocument').onclick = function () {

    // Save Dialog
    fname = window.prompt("Save as...");

    // Check json extension in file name
    if (fname.indexOf(".") == -1) {
        fname = fname + ".json";
    } else {
        if (fname.split('.').pop().toLowerCase() == "json") {
            // Nothing to do
        } else {
            fname = fname.split('.')[0] + ".json";
        }
    }; 
  }
}
