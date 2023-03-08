$(window).on("load", function() {

    /*1.热门在线玩家TOP*/
    $(document).ready(function(){

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echarts_1'), 'westeros');

      // 指定图表的配置项和数据
      var option = {
          //提示框
          tooltip: {
            //触发方式
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          //图例组件
          legend: {
            data: ['在线人数', '人数峰值', '玩家游玩时长(*100)'],
            textStyle: {
            color: 'white',
            fontSize: '12'
                },
          },
          //分割线组件
          grid: {
            left: '0%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          //横坐标
          xAxis: [
            {
              name: "人/小时",
              type: 'value',
              axisLabel: {
                color: 'white',
                fontSize: '12'
              }
            }
          ],
          //纵坐标
          yAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              axisLabel: {
                color: 'white',
                fontSize: '12'
              },
              //数据
              data: []
            }
          ],
          dataZoom: [
                {
                    type: 'slider',//类型
                    show: true,//显示
                    yAxisIndex: [0],//使用y轴的index,默认值为0
                    left: '97%',//距离左边位置百分比
                    start: 100, //数据窗口范围的起始百分比
                    end: 95//数据窗口范围的结束百分比
                },
                {
                    type: 'inside',//类型
                    yAxisIndex: [0],//使用y轴的index,默认值为0
                    start: 40,//数据窗口范围的起始百分比
                    end: 0//数据窗口范围的结束百分比
                }
            ],
          series: [
            {
              name: '在线人数',
              type: 'bar',
              stack: 'Total',
              label: {
                show: true,
                position: 'inside',
                fontSize: '12'
              },
              emphasis: {
                focus: 'series'
              },
              data: []
            },
            {
              name: '人数峰值',
              type: 'bar',
              stack: 'Total',
              label: {
                show: true,
                position: 'inside',
                fontSize: '12'
              },
              emphasis: {
                focus: 'series'
              },
              data: []
            },
            {
              name: '玩家游玩时长(*100)',
              type: 'bar',
              label: {
                show: true,
                position: 'inside',
                fontSize: '12'
              },
              emphasis: {
                focus: 'series'
              },
              data: []
            },
          ]
        };

        var Name = [];
        var current_players = [];
        var peak_players = [];
        var hours_played = [];
        $.getJSON("../../Data/Steam_top_new.json", function(data) {
				console.log(data);
				var $echarts_1 = $("#echarts_1");
				for(i in data){
                    //console.log(data[i]);
                    //console.log(data[i]['name']);
                    Name.push(data[i]['name']);
                    current_players.push(data[i]['current_players']);
                    peak_players.push(data[i]['peak_players']);
                    hours_played.push(data[i]['hours_played']/100);
                }
                console.log(Name);
                console.log(current_players);
                console.log(peak_players);
                console.log(hours_played);
                myChart.setOption({
                yAxis: {
                    data: Name
                },
                series: [
                {
                    // 根据名字对应到相应的系列
                    name: '在线人数',
                    data: current_players,
                },
                {
                    // 根据名字对应到相应的系列
                    name: '人数峰值',
                    data: peak_players,
                },
                {
                    // 根据名字对应到相应的系列
                    name: '玩家游玩时长(*100)',
                    data: hours_played,
                },
                ]
            });
		})

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
});

    /*2.1热门游戏销量TOP*/
    $(document).ready(function(){
        // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echarts_2_1'), 'westeros');

      // 指定图表的配置项和数据
      var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {
             textStyle: {
            color: 'white',
            fontSize: '12'
                },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            name: "$美元",
            type: 'value',
            axisLabel: {
                color: 'white',
                fontSize: '12'
              },
          },
          yAxis: {
            type: 'category',
            axisLabel: {
                color: 'white',
                fontSize: '12'
            },
            data: ['Wii Sports','Super Mario Bros','Mario Kart Wii','Wii Sports Resort','Pokemon Red/Pokemon Blue','Tetris','New Super Mario Bros'
        ]
          },
          series: [
            {
              name: 'NA_Sales',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [11.38,23.2,11.27,15.75,15.85,29.08, 41.49]
            },
            {
              name: 'EU_Sales',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [9.23,2.26,8.89,11.01,12.88,3.58,29.02]
            },
            {
              name: 'JP_Sales',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [6.5,4.22,10.22,3.28,3.79,6.81,3.77]
            },
            {
              name: 'Other_Sales',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [2.9,0.58,1,2.96,3.31,0.77,8.46]
            },
            {
              name: 'Global_Sales',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [30.01,30.26,31.37,33,35.82,40.24,82.74]
            }
          ]
        };


      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      window.addEventListener("resize", function() {
            myChart.resize();
        });
    });

    /*2.2热门游戏地区销量TOP*/
    $(document).ready(function(){
        // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echarts_2_2'), 'westeros');

      // 指定图表的配置项和数据
      var option = {
          title: {
            text: '全球游戏销量占比图',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              label: {
                fontSize: '15',
              },
              data: [
                { value: 4392.95, name: 'NA_Sales' },
                { value: 2434.13, name: 'EU_Sales' },
                { value: 1291.02, name: 'JP_Sales' },
                { value: 797.75, name: 'Other_Sales' },
                { value: 8920.44, name: 'Global_Sales' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };


      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      window.addEventListener("resize", function() {
            myChart.resize();
        });
    });

    /*3.热门游戏玩家流量TOP*/
    $(document).ready(function(){
        // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echarts_3'), 'westeros');
        // prettier-ignore
        const data1 = [
        ["2019-January", 814616],
        ["2019-February", 744468],
        ["2019-March", 742356],
        ["2019-April", 709841],
        ["2019-May", 692966],
        ["2019-June", 614621],
        ["2019-July", 624785],
        ["2019-August", 595781],
        ["2019-September", 665371],
        ["2019-October", 639968],
        ["2019-November", 601881],
        ["2019-December", 598405],
        ["2020-January", 715850],
        ["2020-February", 686588],
        ["2020-March", 672502],
        ["2020-April", 523262],
        ["2020-May", 454481],
        ["2020-June", 420261],
        ["2020-July", 426008],
        ["2020-August", 454370],
        ["2020-September", 583029],
        ["2020-October", 565968],
        ["2020-November", 546031],
        ["2020-December", 746548],
        ["2021-January", 684511],
        ["2021-February", 654069],
        ["2021-March", 680071],
        ["2021-April", 621614],
        ["2021-May", 588453],
        ["2021-June", 587724],
        ["2021-July", 578933],
        ["2021-August", 647461],
        ["2021-September", 720052],
        ["2021-October", 747937],
        ["2021-November", 758412],
        ["2021-December", 767060],
        ["2022-January", 817229],
        ["2022-February", 916996],
        ["2022-March", 1145972],
        ["2022-April", 1305714],
        ["2022-May", 1193359],
        ["2022-June", 1009467],
        ["2022-July", 857560],
        ["2022-August", 925348],
        ["2022-September", 977769],
        ["2022-October", 943876],
        ["2022-November", 1037464],
        ["2022-December", 1164396],
        ["2023-January", 1124553],
        ["2023-February", 1123485]];
        const data2 = [
        ["2019-January", 116125],
        ["2019-February", 104902],
        ["2019-March", 98798],
        ["2019-April", 96503],
        ["2019-May", 83483],
        ["2019-June", 131936],
        ["2019-July", 112074],
        ["2019-August", 121830],
        ["2019-September", 101433],
        ["2019-October", 84553],
        ["2019-November", 85105],
        ["2019-December", 170316],
        ["2020-January", 167754],
        ["2020-February", 94308],
        ["2020-March", 94489],
        ["2020-April", 89792],
        ["2020-May", 82956],
        ["2020-June", 162021],
        ["2020-July", 162021],
        ["2020-August", 123556],
        ["2020-September", 97920],
        ["2020-October", 81337],
        ["2020-November", 81360],
        ["2020-December", 120693],
        ["2021-January", 118210],
        ["2021-February", 119439],
        ["2021-March", 126518],
        ["2021-April", 91586],
        ["2021-May", 108557],
        ["2021-June", 109164],
        ["2021-July", 197555],
        ["2021-August", 176207],
        ["2021-September", 135072],
        ["2021-October", 117002],
        ["2021-November", 138540],
        ["2021-December", 204137],
        ["2022-January", 214796],
        ["2022-February", 267360],
        ["2022-March", 209493],
        ["2022-April", 243284],
        ["2022-May", 260562],
        ["2022-June", 180302],
        ["2022-July", 134093],
        ["2022-August", 154677],
        ["2022-September", 126174],
        ["2022-October", 128578],
        ["2022-November", 157355],
        ["2022-December", 258539],
        ["2023-January", 184941],
        ["2023-February", 146438]];
        const dateList1 = data1.map(function (item) {
          return item[0];
        });
        const valueList1 = data1.map(function (item) {
          return item[1];
        });
        const dateList2 = data2.map(function (item) {
          return item[0];
        });
        const valueList2 = data2.map(function (item) {
          return item[1];
        });
        option = {
          // Make gradient line here
          visualMap: [
            {
              show: false,
              type: 'continuous',
              seriesIndex: 0,
              min: 400000,
              max: 1500000
            },
            {
              show: false,
              type: 'continuous',
              seriesIndex: 1,
              dimension: 0,
              min: 0,
              max: dateList1.length - 1
            }
          ],
          title: [
            {
              left: 'center',
              text: 'Counter-Strike: Global Offensive'
            },
            {
              top: '55%',
              left: 'center',
              text: 'Grand Theft Auto V'
            }
          ],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [
            {
              data: dateList1,
              axisLabel: {
                color: 'white',
                fontSize: '12'
              },
              splitLine: {
                show: false
              },
            },
            {
              data: dateList2,
              gridIndex: 1,
              axisLabel: {
                color: 'white',
                fontSize: '12'
              },
              splitLine: {
                show: false
              },
            }
          ],
          yAxis: [
            {
              axisLabel: {
                color: 'white',
                fontSize: '12'
              },
            },
            {
              gridIndex: 1,
              axisLabel: {
                color: 'white',
                fontSize: '12'
              },
            }
          ],
          grid: [
            {
              bottom: '60%'
            },
            {
              top: '60%'
            }
          ],
          series: [
            {
              type: 'line',
              showSymbol: false,
              data: valueList1,
              lineStyle: {
                width: 5,
              },
            },
            {
              type: 'line',
              showSymbol: false,
              data: valueList2,
              xAxisIndex: 1,
              yAxisIndex: 1,
              lineStyle: {
                width: 5,
              },
            }
          ]
        };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      window.addEventListener("resize", function() {
            myChart.resize();
        });
    });

    /*4.热门游戏分类TOP*/
    $(document).ready(function(){
        // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echarts_4'), 'westeros');
        const data1 = [
          {
            name: '2600',
            value: 133
          },
          {
            name: '3DO',
            value: 3
          },
          {
            name: '3DS',
            value: 509
          },
          {
            name: 'DC',
            value: 52
          },
          {
            name: 'DS',
            value: 2163
          },
          {
            name: 'GB',
            value: 98
          },
          {
            name: 'GBA',
            value: 822
          },
          {
            name: 'GC',
            value: 556
          },
          {
            name: 'GEN',
            value: 27
          },
          {
            name: 'GG',
            value: 1
          },
          {
            name: 'N64',
            value: 98
          },
          {
            name: 'NG',
            value: 12
          },
          {
            name: 'PC',
            value: 960
          },
          {
            name: 'PCFX',
            value: 1
          },
          {
            name: 'PS',
            value: 1196
          },
          {
            name: 'PS2',
            value: 2161
          },
          {
            name: 'PS3',
            value: 1329
          },
          {
            name: 'PS4',
            value: 336
          },
          {
            name: 'PSP',
            value: 1213
          },
          {
            name: 'PSV',
            value: 413
          },
          {
            name: 'SAT',
            value: 173
          },
          {
            name: 'SCD',
            value: 6
          },
          {
            name: 'SNES',
            value: 239
          },
          {
            name: 'TG16',
            value: 2
          },
          {
            name: 'WS',
            value: 6
          },
          {
            name: 'Wii',
            value: 1325
          },
          {
            name: 'WiiU',
            value: 143
          },
          {
            name: 'X360',
            value: 1265
          },
          {
            name: 'XB',
            value: 824
          },
          {
            name: 'XOne',
            value: 213
          }
        ];
        const data2 = [
        {
           name: 'Action',
           value: 3316
        },
        {
           name: 'Adventure',
           value: 1286
        },
        {
           name: 'Fighting',
           value: 848
        },
        {
           name: 'Misc',
           value: 1739
        },
        {
           name: 'Platform',
           value: 886
        },
        {
           name: 'Puzzle',
           value: 582
        },
        {
           name: 'Racing',
           value: 1249
        },
        {
           name: 'Role-Playing',
           value: 1488
        },
        {
           name: 'Shooter',
           value: 1310
        },
        {
           name: 'Simulation',
           value: 867
        },
        {
           name: 'Sports',
           value: 2346
        },
        {
           name: 'Strategy',
           value: 681
        }
        ];
        option = {
          title: [
            {
              text: '热门游戏分类图',
              left: 'center'
            },
            {
              subtext: '游戏平台分类',
              left: '25%',
              top: '80%',
              textAlign: 'center'
            },
            {
              subtext: '游戏类型分类',
              left: '75%',
              top: '80%',
              textAlign: 'center'
            }
          ],
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              type: 'pie',
              radius: '60%',
              center: ['50%', '50%'],
              data: data1,
              label: {
                position: 'outer',
                alignTo: 'none',
                bleedMargin: 5,
                fontSize: '15'
              },
              left: 0,
              right: '50%',
              top: 0,
              bottom: 0
            },
            {
              type: 'pie',
              radius: '60%',
              center: ['50%', '50%'],
              data: data2,
              label: {
                position: 'outer',
                alignTo: 'labelLine',
                bleedMargin: 5,
                fontSize: '15'
              },
              left: '50%',
              right: 0,
              top: 0,
              bottom: 0
            },
          ]
        };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      window.addEventListener("resize", function() {
            myChart.resize();
        });
    });

    /*5.全球流量地图*/
    $(document).ready(function(){
        // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echarts_5'), 'westeros');
      var option = {
            title: {

                left: 'center',
                top: 'top'
            },
           tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    var value = (params.value + '').split('.');
                    value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
                            + '.' + value[1];
                    return params.seriesName + '<br/>' + params.name + ' : ' + value;
                }
            },
            visualMap: {
                min: 0,
                max: 1000,
                text:['High','Low'],
                realtime: false,
                calculable: true,
                color: ['#cbb0e3', '#edafda', '#59c4e6', '#a5e7f0'],
                textStyle: {
                  color: "rgba(0, 255, 234, 1)"
                }
            },
            series: [
                {
                    name: 'Global traffic (2023)',
                    type: 'map',
                    mapType: 'world',
                    roam: true,
                    fontSize: '12',
                    itemStyle:{
                        emphasis:{
                            label:{
                                show:true
                            }
                        }
                    },
                    data: [
                      {
                        "name": "Afghanistan",
                        "value": 468.9257719495
                      },
                      {
                        "name": "Angola",
                        "value": 201.9739681516
                      },
                      {
                        "name": "Albania",
                        "value": 725.4820718385
                      },
                      {
                        "name": "United Arab Emirates",
                        "value": 228.267892624
                      },
                      {
                        "name": "Argentina",
                        "value": 539.8872899415
                      },
                      {
                        "name": "Armenia",
                        "value": 536.0287946785
                      },
                      {
                        "name": "French Southern and Antarctic Lands",
                        "value": 426.3598943672
                      },
                      {
                        "name": "Australia",
                        "value": 288.0938694341
                      },
                      {
                        "name": "Austria",
                        "value": 388.6305886144
                      },
                      {
                        "name": "Azerbaijan",
                        "value": 270.5378003036
                      },
                      {
                        "name": "Burundi",
                        "value": 518.0872202108
                      },
                      {
                        "name": "Belgium",
                        "value": 282.8088268154
                      },
                      {
                        "name": "Benin",
                        "value": 505.3505498328
                      },
                      {
                        "name": "Burkina Faso",
                        "value": 130.0946807107
                      },
                      {
                        "name": "Bangladesh",
                        "value": 325.5109437212
                      },
                      {
                        "name": "Bulgaria",
                        "value": 446.7635722848
                      },
                      {
                        "name": "The Bahamas",
                        "value": 535.2608986546
                      },
                      {
                        "name": "Bosnia and Herzegovina",
                        "value": 518.8680111081
                      },
                      {
                        "name": "Belarus",
                        "value": 644.2117653828
                      },
                      {
                        "name": "Belize",
                        "value": 407.7111238347
                      },
                      {
                        "name": "Bermuda",
                        "value": 325.965433911
                      },
                      {
                        "name": "Bolivia",
                        "value": 663.6332709488
                      },
                      {
                        "name": "Brazil",
                        "value": 696.6321985183
                      },
                      {
                        "name": "Brunei",
                        "value": 781.2619630853
                      },
                      {
                        "name": "Bhutan",
                        "value": 601.1519822955
                      },
                      {
                        "name": "Botswana",
                        "value": 92.4893041469
                      },
                      {
                        "name": "Central African Republic",
                        "value": 448.2213235083
                      },
                      {
                        "name": "Canada",
                        "value": 459.5340725793
                      },
                      {
                        "name": "Switzerland",
                        "value": 660.7530194422
                      },
                      {
                        "name": "Chile",
                        "value": 671.0491913075
                      },
                      {
                        "name": "China",
                        "value": 450.5140201043
                      },
                      {
                        "name": "Ivory Coast",
                        "value": 455.1593148165
                      },
                      {
                        "name": "Cameroon",
                        "value": 450.7040451721
                      },
                      {
                        "name": "Democratic Republic of the Congo",
                        "value": 563.814209074
                      },
                      {
                        "name": "Republic of the Congo",
                        "value": 714.6995735533
                      },
                      {
                        "name": "Colombia",
                        "value": 565.9555265837
                      },
                      {
                        "name": "Costa Rica",
                        "value": 144.7877630135
                      },
                      {
                        "name": "Cuba",
                        "value": 435.0405321393
                      },
                      {
                        "name": "Northern Cyprus",
                        "value": 556.0638505566
                      },
                      {
                        "name": "Cyprus",
                        "value": 528.0158871255
                      },
                      {
                        "name": "Czech Republic",
                        "value": 323.9085681172
                      },
                      {
                        "name": "Germany",
                        "value": 458.536030331
                      },
                      {
                        "name": "Djibouti",
                        "value": 727.8054246146
                      },
                      {
                        "name": "Denmark",
                        "value": 445.3439136901
                      },
                      {
                        "name": "Dominican Republic",
                        "value": 662.7364437855
                      },
                      {
                        "name": "Algeria",
                        "value": 536.9273819578
                      },
                      {
                        "name": "Ecuador",
                        "value": 554.7268378373
                      },
                      {
                        "name": "Egypt",
                        "value": 811.5121018928
                      },
                      {
                        "name": "Eritrea",
                        "value": 589.5629757678
                      },
                      {
                        "name": "Spain",
                        "value": 333.4244056103
                      },
                      {
                        "name": "Estonia",
                        "value": 718.7992129126
                      },
                      {
                        "name": "Ethiopia",
                        "value": 665.9953848821
                      },
                      {
                        "name": "Finland",
                        "value": 365.3487085162
                      },
                      {
                        "name": "Fiji",
                        "value": 652.7242360769
                      },
                      {
                        "name": "Falkland Islands",
                        "value": 173.1368820686
                      },
                      {
                        "name": "France",
                        "value": 351.547540889
                      },
                      {
                        "name": "Gabon",
                        "value": 287.8438246838
                      },
                      {
                        "name": "United Kingdom",
                        "value": 431.2230854236
                      },
                      {
                        "name": "Georgia",
                        "value": 624.4878723261
                      },
                      {
                        "name": "Ghana",
                        "value": 522.8288601371
                      },
                      {
                        "name": "Guinea",
                        "value": 271.1177168116
                      },
                      {
                        "name": "Gambia",
                        "value": 355.9456466095
                      },
                      {
                        "name": "Guinea Bissau",
                        "value": 536.9243174705
                      },
                      {
                        "name": "Equatorial Guinea",
                        "value": 396.0433329842
                      },
                      {
                        "name": "Greece",
                        "value": 533.9538122404
                      },
                      {
                        "name": "Greenland",
                        "value": 188.970504394
                      },
                      {
                        "name": "Guatemala",
                        "value": 483.9978269016
                      },
                      {
                        "name": "French Guiana",
                        "value": 742.8254652793
                      },
                      {
                        "name": "Guyana",
                        "value": 558.8985749909
                      },
                      {
                        "name": "Honduras",
                        "value": 639.6081688896
                      },
                      {
                        "name": "Croatia",
                        "value": 470.7961769867
                      },
                      {
                        "name": "Haiti",
                        "value": 365.9439366867
                      },
                      {
                        "name": "Hungary",
                        "value": 245.3419021434
                      },
                      {
                        "name": "Indonesia",
                        "value": 831.8339039256
                      },
                      {
                        "name": "India",
                        "value": 471.0761367419
                      },
                      {
                        "name": "Ireland",
                        "value": 598.2067800385
                      },
                      {
                        "name": "Iran",
                        "value": 682.8413641509
                      },
                      {
                        "name": "Iraq",
                        "value": 348.1897210283
                      },
                      {
                        "name": "Iceland",
                        "value": 568.4774220775
                      },
                      {
                        "name": "Israel",
                        "value": 763.5195934473
                      },
                      {
                        "name": "Italy",
                        "value": 475.700415215
                      },
                      {
                        "name": "Jamaica",
                        "value": 588.3865999264
                      },
                      {
                        "name": "Jordan",
                        "value": 660.720938923
                      },
                      {
                        "name": "Japan",
                        "value": 435.3211123552
                      },
                      {
                        "name": "Kazakhstan",
                        "value": 353.0734980107
                      },
                      {
                        "name": "Kenya",
                        "value": 212.2078044482
                      },
                      {
                        "name": "Kyrgyzstan",
                        "value": 464.0235748163
                      },
                      {
                        "name": "Cambodia",
                        "value": 743.2149297735
                      },
                      {
                        "name": "South Korea",
                        "value": 529.1243385634
                      },
                      {
                        "name": "Kosovo",
                        "value": 812.9676261415
                      },
                      {
                        "name": "Kuwait",
                        "value": 529.4902798874
                      },
                      {
                        "name": "Laos",
                        "value": 731.607259989
                      },
                      {
                        "name": "Lebanon",
                        "value": 962.4240278095
                      },
                      {
                        "name": "Liberia",
                        "value": 608.9129644812
                      },
                      {
                        "name": "Libya",
                        "value": 264.5641996085
                      },
                      {
                        "name": "Sri Lanka",
                        "value": 681.1699305645
                      },
                      {
                        "name": "Lesotho",
                        "value": 544.4422144264
                      },
                      {
                        "name": "Lithuania",
                        "value": 670.6402928494
                      },
                      {
                        "name": "Luxembourg",
                        "value": 524.180514646
                      },
                      {
                        "name": "Latvia",
                        "value": 795.0420895713
                      },
                      {
                        "name": "Morocco",
                        "value": 453.5621209607
                      },
                      {
                        "name": "Moldova",
                        "value": 414.1713383599
                      },
                      {
                        "name": "Madagascar",
                        "value": 402.1243095318
                      },
                      {
                        "name": "Mexico",
                        "value": 512.9631233755
                      },
                      {
                        "name": "Macedonia",
                        "value": 415.3594964494
                      },
                      {
                        "name": "Mali",
                        "value": 460.6563988669
                      },
                      {
                        "name": "Myanmar",
                        "value": 604.4898422102
                      },
                      {
                        "name": "Montenegro",
                        "value": 602.5899625816
                      },
                      {
                        "name": "Mongolia",
                        "value": 394.8276669066
                      },
                      {
                        "name": "Mozambique",
                        "value": 360.2411578256
                      },
                      {
                        "name": "Mauritania",
                        "value": 392.3908268881
                      },
                      {
                        "name": "Malawi",
                        "value": 402.3169743513
                      },
                      {
                        "name": "Malaysia",
                        "value": 656.5550047845
                      },
                      {
                        "name": "Namibia",
                        "value": 613.8142526118
                      },
                      {
                        "name": "New Caledonia",
                        "value": 519.1595864622
                      },
                      {
                        "name": "Niger",
                        "value": 336.8681903084
                      },
                      {
                        "name": "Nigeria",
                        "value": 419.8741443609
                      },
                      {
                        "name": "Nicaragua",
                        "value": 527.108410264
                      },
                      {
                        "name": "Netherlands",
                        "value": 628.8486494676
                      },
                      {
                        "name": "Norway",
                        "value": 560.2043071484
                      },
                      {
                        "name": "Nepal",
                        "value": 510.2194383816
                      },
                      {
                        "name": "New Zealand",
                        "value": 544.0022336719
                      },
                      {
                        "name": "Oman",
                        "value": 349.9039248612
                      },
                      {
                        "name": "Pakistan",
                        "value": 487.8685666739
                      },
                      {
                        "name": "Panama",
                        "value": 328.5157459571
                      },
                      {
                        "name": "Peru",
                        "value": 302.2204925501
                      },
                      {
                        "name": "Philippines",
                        "value": 495.4958015609
                      },
                      {
                        "name": "Papua New Guinea",
                        "value": 488.765726019
                      },
                      {
                        "name": "Poland",
                        "value": 383.8413793016
                      },
                      {
                        "name": "Puerto Rico",
                        "value": 520.7112647772
                      },
                      {
                        "name": "North Korea",
                        "value": 601.9411318896
                      },
                      {
                        "name": "Portugal",
                        "value": 473.6643533855
                      },
                      {
                        "name": "Paraguay",
                        "value": 608.5620505405
                      },
                      {
                        "name": "Qatar",
                        "value": 734.4569065024
                      },
                      {
                        "name": "Romania",
                        "value": 444.5063448689
                      },
                      {
                        "name": "Russia",
                        "value": 407.3308464834
                      },
                      {
                        "name": "Rwanda",
                        "value": 385.5880235471
                      },
                      {
                        "name": "Western Sahara",
                        "value": 666.5530655025
                      },
                      {
                        "name": "Saudi Arabia",
                        "value": 685.1288413262
                      },
                      {
                        "name": "Sudan",
                        "value": 531.5891631661
                      },
                      {
                        "name": "South Sudan",
                        "value": 631.5730624101
                      },
                      {
                        "name": "Senegal",
                        "value": 571.8734825156
                      },
                      {
                        "name": "Solomon Islands",
                        "value": 779.1480430165
                      },
                      {
                        "name": "Sierra Leone",
                        "value": 434.9153058052
                      },
                      {
                        "name": "El Salvador",
                        "value": 466.1842606163
                      },
                      {
                        "name": "Somaliland",
                        "value": 506.8144669915
                      },
                      {
                        "name": "Somalia",
                        "value": 678.7401053457
                      },
                      {
                        "name": "Republic of Serbia",
                        "value": 341.5321162448
                      },
                      {
                        "name": "Suriname",
                        "value": 702.8597210427
                      },
                      {
                        "name": "Slovakia",
                        "value": 833.424227052
                      },
                      {
                        "name": "Slovenia",
                        "value": 607.415562729
                      },
                      {
                        "name": "Sweden",
                        "value": 544.0613807065
                      },
                      {
                        "name": "Swaziland",
                        "value": 560.1856858106
                      },
                      {
                        "name": "Syria",
                        "value": 426.6087899604
                      },
                      {
                        "name": "Chad",
                        "value": 579.6947303513
                      },
                      {
                        "name": "Togo",
                        "value": 257.0297318327
                      },
                      {
                        "name": "Thailand",
                        "value": 335.1644209826
                      },
                      {
                        "name": "Tajikistan",
                        "value": 553.1225738367
                      },
                      {
                        "name": "Turkmenistan",
                        "value": 649.43647633
                      },
                      {
                        "name": "East Timor",
                        "value": 656.0568833711
                      },
                      {
                        "name": "Trinidad and Tobago",
                        "value": 378.5192336339
                      },
                      {
                        "name": "Tunisia",
                        "value": 410.3082670206
                      },
                      {
                        "name": "Turkey",
                        "value": 617.4214458177
                      },
                      {
                        "name": "United Republic of Tanzania",
                        "value": 784.0570269199
                      },
                      {
                        "name": "Uganda",
                        "value": 561.8258227923
                      },
                      {
                        "name": "Ukraine",
                        "value": 840.4681093736
                      },
                      {
                        "name": "Uruguay",
                        "value": 470.1382047248
                      },
                      {
                        "name": "United States of America",
                        "value": 474.4829840094
                      },
                      {
                        "name": "Uzbekistan",
                        "value": 542.9894365579
                      },
                      {
                        "name": "Venezuela",
                        "value": 495.3480815614
                      },
                      {
                        "name": "Vietnam",
                        "value": 453.6910515871
                      },
                      {
                        "name": "Vanuatu",
                        "value": 232.9861107401
                      },
                      {
                        "name": "West Bank",
                        "value": 808.6857738156
                      },
                      {
                        "name": "Yemen",
                        "value": 266.1605472341
                      },
                      {
                        "name": "South Africa",
                        "value": 688.328244182
                      },
                      {
                        "name": "Zambia",
                        "value": 501.7632391603
                      },
                      {
                        "name": "Zimbabwe",
                        "value": 553.8399767558
                      }
                    ]
                }
            ]
        };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      window.addEventListener("resize", function() {
            myChart.resize();
        });
    });

});
