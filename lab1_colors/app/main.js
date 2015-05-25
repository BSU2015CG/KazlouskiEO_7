APP.initialize = function (event) {
    this.createComponent({
        description : 'RGB',
        callbackToRGB : function (values) {
            return values;
        },
        callbackFromRGB : function (values) {
            return values;
        }
    }).createComponent({
        description: 'HSV',
        // hsv -> rgb
        callbackToRGB: function (values) {
            values.H = parseFloat(values.H);
            values.S = parseFloat(values.S);
            values.V = parseFloat(values.V);

            function setValues(r, g, b) {
                return {R: r, G: g, B: b}
            }

            values.V /= 100;
            values.S /= 100;

            var C = values.V * values.S,
                X = C * (1 - Math.abs((values.H / 60) % 2 - 1)),
                m = values.V - C,
                result = {};

            if (values.H >= 0 && values.H < 60) {
                result = setValues(C, X, 0);
            } else if (values.H >= 60 && values.H < 120) {
                result = setValues(X, C, 0);
            } else if (values.H >= 120 && values.H < 180) {
                result = setValues(0, C, X);
            } else if (values.H >= 180 && values.H < 240) {
                result = setValues(0, X, C);
            } else if (values.H >= 240 && values.H < 300) {
                result = setValues(X, 0, C);
            } else {
                result = setValues(C, 0, X);
            }

            result.R += m;
            result.G += m;
            result.B += m;

            result.R *= 255;
            result.G *= 255;
            result.B *= 255;

            result.R = Math.round(result.R);
            result.G = Math.round(result.G);
            result.B = Math.round(result.B);

            return result;
        },
        // rgb -> hsv
        callbackFromRGB: function (values) {
            var _R = ( values.R / 255 ),                    //RGB from 0 to 255
                _G = ( values.G / 255 ),
                _B = ( values.B / 255 );

            var _Min = Math.min( _R, _G, _B ),    //Min. value of RGB
                _Max = Math.max( _R, _G, _B ),    //Max. value of RGB
                del_Max = _Max - _Min,
                result = {},
                del_R, del_G, del_B;

            result.V = _Max;

            if ( del_Max == 0 ) {
               result.H = 0;
               result.S = 0;
            }
            else {
               result.S = del_Max / _Max;

               del_R = ( ( ( _Max - _R ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
               del_G = ( ( ( _Max - _G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
               del_B = ( ( ( _Max - _B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;

               if      ( _R == _Max ) result.H = del_B - del_G;
               else if ( _G == _Max ) result.H = ( 1 / 3 ) + del_R - del_B;
               else if ( _B == _Max ) result.H = ( 2 / 3 ) + del_G - del_R;

               if ( result.H < 0 ) result.H += 1;
               if ( result.H > 1 ) result.H -= 1;
            }

            return {H: parseInt(result.H * 100, 10), S: parseInt(result.S * 100), V: parseInt(result.V * 100)};
        }
    }).createComponent({
        description: 'LUV',
        // cieluv -> rgb
        callbackToRGB: function (values) {
            values.L = parseFloat(values.L);
            values.U = parseFloat(values.U);
            values.V = parseFloat(values.V);

            function toRGB (n) {
                if (n < 0) {APP.warning.innerHTML = 'Smaller than 0'; return 0; }
                if (n > 255) {APP.warning.innerHTML = 'Large than 255'; return 255; }
                APP.warning.innerHTML = '';
                return n;
            }

            var ref_X, ref_Y, ref_Z, ref_U, ref_V, X, Y, Z;
            var _Y = ( values.L + 16 ) / 116, _U, _V, result = {};

            if ( Math.pow(_Y, 3) > 0.008856 ) { _Y = Math.pow(_Y, 3); }
            else { _Y = ( _Y - 16 / 116 ) / 7.787; }

            ref_X =  95.047;      //Observer= 2°, Illuminant= D65
            ref_Y = 100.000;
            ref_Z = 108.883;

            ref_U = ( 4 * ref_X ) / ( ref_X + ( 15 * ref_Y ) + ( 3 * ref_Z ) );
            ref_V = ( 9 * ref_Y ) / ( ref_X + ( 15 * ref_Y ) + ( 3 * ref_Z ) );

            _U = values.U / ( 13 * values.L ) + ref_U;
            _V = values.V / ( 13 * values.L ) + ref_V;

            Y = _Y * 100
            X =  - ( 9 * Y * _U ) / ( ( _U - 4 ) * _V  - _U * _V )
            Z = ( 9 * Y - ( 15 * _V * Y ) - ( _V * X ) ) / ( 3 * _V )

            // xyz to rgb
            var _X = X / 100,        //X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
                _Y = Y / 100,        //Y from 0 to 100.000
                _Z = Z / 100;        //Z from 0 to 108.883

            var _R = _X *  3.2406 + _Y * -1.5372 + _Z * -0.4986,
                _G = _X * -0.9689 + _Y *  1.8758 + _Z *  0.0415,
                _B = _X *  0.0557 + _Y * -0.2040 + _Z *  1.0570;

            if ( _R > 0.0031308 ) { _R = 1.055 * Math.pow( _R, ( 1.0 / 2.4 ) ) - 0.055; }
            else { _R = 12.92 * _R; }
            if ( _G > 0.0031308 ) { _G = 1.055 * Math.pow( _G, ( 1 / 2.4 ) ) - 0.055; }
            else { _G = 12.92 * _G; }
            if ( _B > 0.0031308 ) { _B = 1.055 * Math.pow( _B, ( 1 / 2.4 ) ) - 0.055; }
            else { _B = 12.92 * _B; }

            result.R = Math.round(_R * 255);
            result.G = Math.round(_G * 255);
            result.B = Math.round(_B * 255);

            return {R: toRGB(result.R), G: toRGB(result.G), B: toRGB(result.B)};
        },
        // rgb -> luv
        callbackFromRGB : function (values) {
            values.R = parseFloat(values.R);
            values.G = parseFloat(values.G);
            values.B = parseFloat(values.B);

            // RGB -> xyz
            var luv = {},
                _R = ( values.R / 255 ),        //R from 0 to 255
                _G = ( values.G / 255 ),        //G from 0 to 255
                _B = ( values.B / 255 );        //B from 0 to 255

            if ( _R > 0.04045 ) _R = Math.pow(( ( _R + 0.055 ) / 1.055 ) , 2.4);
            else                   _R = _R / 12.92;
            if ( _G > 0.04045 ) _G = Math.pow(( ( _G + 0.055 ) / 1.055 ) , 2.4);
            else                   _G = _G / 12.92;
            if ( _B > 0.04045 ) _B = Math.pow(( ( _B + 0.055 ) / 1.055 ) , 2.4);
            else                   _B = _B / 12.92;

            _R = _R * 100
            _G = _G * 100
            _B = _B * 100

            //Observer. = 2°, Illuminant = D65
            var X = _R * 0.4124 + _G * 0.3576 + _B * 0.1805,
                Y = _R * 0.2126 + _G * 0.7152 + _B * 0.0722,
                Z = _R * 0.0193 + _G * 0.1192 + _B * 0.9505;

            // xyz -> luv
            var _U = ( 4 * X ) / ( X + ( 15 * Y ) + ( 3 * Z ) ),
                _V = ( 9 * Y ) / ( X + ( 15 * Y ) + ( 3 * Z ) )
                _Y = Y / 100;

            _U = isNaN(_U) ? 0 : _U;
            _V = isNaN(_V) ? 0 : _V;
            _Y = isNaN(_Y) ? 0 : _Y;

            if ( _Y > 0.008856 ) _Y = Math.pow(_Y, ( 1/3 ));
            else _Y = ( 7.787 * _Y ) + ( 16 / 116 );

            var ref_X =  95.047,        //Observer= 2°, Illuminant= D65
                ref_Y = 100.000,
                ref_Z = 108.883,
                ref_U = ( 4 * ref_X ) / ( ref_X + ( 15 * ref_Y ) + ( 3 * ref_Z ) ),
                ref_V = ( 9 * ref_Y ) / ( ref_X + ( 15 * ref_Y ) + ( 3 * ref_Z ) );

            luv.L = ( 116 * _Y ) - 16;
            luv.U = 13 * luv.L * ( _U - ref_U );
            luv.V = 13 * luv.L * ( _V - ref_V );

            luv.L = Math.round(luv.L);
            luv.U = Math.round(luv.U);
            luv.V = Math.round(luv.V);
            return luv;
        }
    }).createComponent({
        description: 'CMYK',
        // cmyk -> rgb
        callbackToRGB: function (values) {
            values.C = parseFloat(values.C);
            values.M = parseFloat(values.M);
            values.Y = parseFloat(values.Y);
            values.K = parseFloat(values.K);
            var result = {};
            result.R = Math.round(255 * (1 - values.C) * (1 - values.K));
            result.G = Math.round(255 * (1 - values.M) * (1 - values.K));
            result.B = Math.round(255 * (1 - values.Y) * (1 - values.K));
            return result;
        },
        // rgb -> cmyk
        callbackFromRGB: function (values) {
            values.R = parseFloat(values.R);
            values.G = parseFloat(values.G);
            values.B = parseFloat(values.B);

            var R = values.R / 255,
                G = values.G / 255,
                B = values.B / 255,
                result = {};

            result.K = 1 - Math.max(R, G, B);
            if (result.K === 1) {
                result.C = result.M = result.Y = 1;
            } else {
                result.C = (1 - R - result.K) / (1 - result.K);
                result.M = (1 - G - result.K) / (1 - result.K);
                result.Y = (1 - B - result.K) / (1 - result.K);
            }

            return result;
        }
    });

    this.displayer = document.querySelector('#display-block');
    this.sectionHSV = document.querySelector('#HSV');
    this.sectionRGB = document.querySelector('#RGB');
    this.sectionLUV = document.querySelector('#LUV');
    this.sectionCMYK = document.querySelector('#CMYK');
    this.reset = document.querySelector('.reset-button');
    this.mainContent = document.querySelector('.container');
    this.warning = document.querySelector('.warning');
    this.palette = document.querySelector('#paletteInput');

    this.reset.addEventListener('click', this.resetCallback.bind(this));
    this.resetCallback();
}

APP.changeRange = function (content, value) {
    var component = content.parentNode.parentNode.id,
        currentValues,
        rgbValues;

    this.currentChange = component;
    // change track value
    content.previousSibling.previousSibling.value = value;

    currentValues = this.getComponents(content);

    rgbValues = this.converter[component].callbackToRGB(currentValues);

    // set all colors values
    this.setRGBValues(rgbValues);
};

APP.changePalette = function (value) {
    this.setRGBValues({ R: APP.converter.hexToR(value), G: APP.converter.hexToG(value), B: APP.converter.hexToB(value)});
};

APP.getComponents = function (content) {
    var i = 1,
        nodes = content.parentNode.parentNode.childNodes,
        result = {};

    for (i; i < nodes.length; i += 2) {
        result[nodes[i].childNodes[1].innerHTML[nodes[i].childNodes[1].innerHTML.indexOf('(') + 1]] = nodes[i].childNodes[3].value;
    }

    return result;
};

APP.changeInput = function (content, value) {
    // get component
    var component = content.parentNode.parentNode.id,
        rgbValues,
        currentValues;

    this.currentChange = component;
    // change track (value of one component)
    content.nextSibling.nextSibling.value = value;

    // get values from inputs
    currentValues = this.getComponents(content);

    // evaluate RGB
    rgbValues = this.converter[component].callbackToRGB(currentValues);

    // set all colors values
    this.setRGBValues(rgbValues);
};

APP.setRGBValues = function (values) {
    var i = 1, j = 1,
        nodes = this.mainContent.childNodes,
        currentValue,
        componentValue,
        innerElement;

    //display block set values
    this.displayer.style.backgroundColor = this.converter.rgbToHex(values.R, values.G, values.B);
    this.palette.value = this.converter.rgbToHex(values.R, values.G, values.B);

    for (i; i < nodes.length; i += 2) {
        if (nodes[i].id === this.currentChange) { continue; }
        currentValue = this.converter[nodes[i].id].callbackFromRGB(values);
        console.log(currentValue);

        for (j = 1; j < nodes[i].childNodes.length; j += 2) {
            innerElement = nodes[i].childNodes[j].childNodes[1].innerHTML;
            componentValue = currentValue[innerElement[innerElement.indexOf('(') + 1]];
            nodes[i].childNodes[j].childNodes[3].value = componentValue;
            nodes[i].childNodes[j].childNodes[5].value = componentValue;
        }
    }

    this.currentChange = null;
}

APP.resetCallback = function (event) {
    this.setRGBValues({R: 0, G: 0, B: 0});
};

window.addEventListener('load', APP.initialize.bind(APP));