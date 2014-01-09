var markdownpdf = require("markdown-pdf"),
    gui = require('nw.gui');

// fs.createReadStream("E:\\SkyDrive\\Work\\iRead\\Markdown Plan\\2013-12-13.md")
//     .pipe(markdownpdf())
//     .pipe(fs.createWriteStream("E:\\SkyDrive\\Work\\iRead\\Markdown Plan\\document.pdf"));


function mainCtrl($scope, $http, $timeout) {
    $scope.file = "";

    $scope.paths = [];

    $scope.convert = function() {
        $("#file").click();
    };

    $scope.fileNameChaged = function(element) {
        var files = element.files;
        var btn = $("#convert");
        btn.button('loading');

        var mdPaths = [];
        var pdfPaths = [];
        for (var i = files.length - 1; i >= 0; i--) {
            var f = files[i];
            mdPaths.push(f.path);
            pdfPaths.push(f.path.replace(".md", ".pdf"));
        }

        markdownpdf({

            cssPath: "../customPDF.css"
        }).from(mdPaths).to(pdfPaths, function() {
            $scope.$apply(function() {
                $scope.paths = $scope.paths.concat(pdfPaths);
            });
            btn.button('choose');
        });
    };

    $scope.open = function(path) {
        gui.Shell.openItem(path);
    };
}
