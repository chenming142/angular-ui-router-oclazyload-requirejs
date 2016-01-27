(function ($) {
    var defaults = {
        label: ['省', '市', '区'],
        areaWheels: 'PCD',
        areasKey : ['Provinces', 'Cities', 'Districts']
    };
    $.mobiscroll.presetShort('area');
    $.mobiscroll.presets.area = function (inst) {
        var orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            wg = [],
            wheels = [],
            ttl,
            AddressInfo = s.AddresssInfo;
        var areas = s.areaWheels.split(''),areasKey = s.areasKey;
        for (var i = 0; i < areas.length; i++) {
            genWheels(getAreaInfo(i), s.label[i], i);
        }
        wheels.push(wg);
        function getAreaInfo(index) {
            var area, _p, _c;
            if (areas[index] === "P") {
                area = AddressInfo[areasKey[index]];
            }
            if (areas[index] === "C") {
                _p = wg[0].keys[0];
                area = AddressInfo[areasKey[index]][_p];
            }
            if (areas[index] === "D") {
                _c = wg[1].keys[0];
                area = AddressInfo[areasKey[index]][_c];
            }
            return area;
        }
        function splitStr(str, len, suffix){
            len = len || 4;
            suffix = suffix || "...";
            if(str && str.length > len){
                return str.substring(0, len) + suffix;
            }
            return str;
        }

        function genWheels(area, lbl, type, isRet) {
            var values = [], keys = [];
            type = areas[type];
            if (type == "P") {
                for (var i = 0; i < area.length; i++) {
                    values.push(area[i]['_proviceid']);
                    keys.push(splitStr(area[i]['_provicename']));
                }
            }
            if (type == "C") {
                for (var i = 0; i < (area && area.length); i++) {
                    values.push(area[i]['_cityid']);
                    keys.push(splitStr(area[i]['_cityname']));
                }
            }
            if (type == "D") {
                for (var i = 0; i < (area && area.length); i++) {
                    values.push(area[i]['_districtid']);
                    keys.push(splitStr(area[i]['_districtname']));
                }
            }
            if (isRet) {
                return {
                    values: keys,
                    keys: values,
                    label: lbl
                };
            }
            addWheel(wg, values, keys, lbl);
        }

        function addWheel(wg, k, v, lbl) {
            //console.log("v: "+v+", k: "+k+", label: "+lbl);
            wg.push({
                values: v,
                keys: k,
                label: lbl
            });
        }

        function internalChangeWheel(index, val, wheel, initial){
            clearTimeout(ttl);
            var wheels = [], key, origin = val;
            val = typeof val === 'string'? val.split(" ")[index] : val[index];
            if (index < s.label.length - 1) {
                var data, idx = parseInt(++index);//(1:市， 2:区);
                ttl = setTimeout(function () {
                    //TODO:要改变的省市区类型

                    data = genWheels(AddressInfo[areasKey[idx]][val], s.label[idx], idx ,true);
                    //设置要改变的省市区数据
                    wheel.setWheels(idx, data);
                    wheels.push(idx);

                    if(idx < s.label.length - 1){
                        var next = idx + 1, nextVal = initial ? origin[1] :data['keys'][0];
                        data = genWheels(AddressInfo[areasKey[next]][nextVal], s.label[next], next ,true);
                        wheel.setWheels(next, data);
                        wheels.push(next);
                    }
                    if(initial)wheel.temp = origin;

                    wheel.changeWheel(wheels, 0);
                }, 500);
            }
        }
        return {
            wheels: wheels,
            onBeforeShow: function (wheel) {
                s.wheels = wheels;
                if(s.curAddrInfo){
                    internalChangeWheel(0, s.curAddrInfo, wheel, true);
                }
            },
            onSelect: function (PCD, wheel) {
                //console.log("--- onSelect ---");
                if(PCD){
                    var addrInfo = PCD && PCD.split(" ");
                    wheel.option({'curAddrInfo': addrInfo, 'values': addrInfo});
                }
            },
            onChange: function (index, val, wheel) {
                //TODO:当前选择的省市区类型(0:省, 1：市)
                //console.log("{index: "+index+", val: "+val+"}");
                internalChangeWheel(index, val, wheel)
            }
        }
    };
})(jQuery);