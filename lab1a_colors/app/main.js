var APP = {
    config: {
        'red': {
            title: 'Red color',
            color: '#C81913'
        },
        'green': {
            title: 'Green color',
            color: '#33CC33'
        },
        'blue': {
            title: 'Blue color',
            color: '#0000CC'
        }
    }
};

APP.init = function () {
    this.input = $('#fileInput')[0];
    this.imageContainer = $('#image-container')[0];
    this.imageCanvas = $('#image-canvas')[0];
    $('#fileInput').change(APP.loadImage.bind(APP));

    this.initComponents();
};

APP.initComponents = function () {
    this.initComponent('redComponents')
        .initComponent('greenComponents')
        .initComponent('blueComponents');
};

APP.initComponent = function (componentList) {
    this[componentList] = [];
    this[componentList].length = 255;
    for (var i = 0; i < 256; i++) {
        this[componentList][i] = 0;
    }
    return this;
};

APP.loadImage = function(event) {

    // create full size image
    var image = document.createElement('img'),
        self = this,
        i, j;

    this.initComponents();

    image.style.opacity = '0';
    self.imageCanvas.style.opacity = '0';

    image.onload = function (event) {
        self.imageCanvas.width = image.clientWidth;
        self.imageCanvas.height = image.clientHeight;

        self.imageCanvas.getContext('2d').drawImage(image, 0, 0, image.clientWidth, image.clientHeight);

        // evaluate for for
        for (i = 0; i < image.clientWidth; i++ ) {
            for (j = 0; j < image.clientHeight; j++ ) {
                self.redComponents[self.imageCanvas.getContext('2d').getImageData(i, j, 1, 1).data[0]]++;
                self.greenComponents[self.imageCanvas.getContext('2d').getImageData(i, j, 1, 1).data[1]]++;
                self.blueComponents[self.imageCanvas.getContext('2d').getImageData(i, j, 1, 1).data[2]]++;
            }
        }

        self.redComponents[0] = 0;
        self.greenComponents[0] = 0;
        self.blueComponents[0] = 0;

        self.redComponents[256] = 0;
        self.greenComponents[256] = 0;
        self.blueComponents[256] = 0;

        self.plotGraphics();

        //remove image and style canvas
        self.imageCanvas.style.height = '400px';
        self.imageCanvas.style.opacity = 1;

        image.style.display = 'none';
    }

    this.imageContainer.appendChild(image);
    image.src = URL.createObjectURL(event.target.files[0]);
};

APP.plotGraphics = function () {
     this.plotGraphic(this.config.red, this.redComponents, $('#R'))
         .plotGraphic(this.config.green, this.greenComponents, $('#G'))
         .plotGraphic(this.config.blue, this.blueComponents, $('#B'));

    return this;
};

// data array of values
// container - container {jQuery object}
APP.plotGraphic = function (config, data, container) {
    container.highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: config.title
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' :
                    'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'range',
            maxRange: 255 // fourteen days
        },
        yAxis: {
            title: {
                text: 'count'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, config.color],
                        [1, config.color]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: config.title,
            pointInterval: 1,
            pointStart: 0,
            data: data
        }]
    });

    return this;
};

$(document).ready(APP.init.bind(APP));