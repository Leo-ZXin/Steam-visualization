# 导入所需库包
import time
from lxml import etree
import pandas as pd
import requests


# 获取网页源码
def get_html(url):
    # 定义请求头模拟机器
    headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                             'Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.57'}
    # 异常处理
    try:
        response = requests.get(url, headers=headers)
        # 声明编码方式
        response.encoding = response.apparent_encoding
        # 判断
        if response.status_code == 200:
            pass
            # print('成功获取源代码')
        else:
            print('失败！')
    except Exception as e:
        print('获取源代码失败：%s' % e)
    # 返回response
    return response.text


# 3. 解析网页源代码
def parse_html(html):
    html = etree.HTML(html)
    # 盒子
    games = html.xpath('//*[@id="top-games"]/tbody')[0]
    # print(games)

    # 游戏排名
    game_id = games.xpath('./*/td[1]/text()')
    print(game_id)

    # 游戏名称
    game_name = games.xpath('./*/td[2]/a/text()')
    print(game_name)

    # 游戏当前在线人数
    game_now = games.xpath('./*/td[3]/text()')
    print(game_now)

    # 游戏在线人数峰值
    game_peak = games.xpath('./*/td[5]/text()')
    print(game_peak)

    # 玩家游戏总时长
    game_time = games.xpath('./*/td[6]/text()')
    print(game_time)

    # 定义游戏信息
    Game = {
        'game_id': game_id,
        'game_name': game_name,
        'game_now': game_now,
        'game_peak': game_peak,
        'game_time': game_time
    }
    # print(HOUSE)
    return Game


# 保存数据
def save_data(Game):
    # 以csv格式写入本地
    Game_data = pd.DataFrame(Game)
    Game_data.to_csv('../Data/Steam_top.csv', mode='a', index=False, header=False)
    print("游戏玩家人数写入本地成功。")


if __name__ == '__main__':
    # 热门游戏排行   https://steamcharts.com/top/p.1

    # 定义url并获取网页源代码
    url_city = 'https://steamcharts.com/top/p.1'

    # 获取游戏信息
    for page in range(4):
        url = 'https://steamcharts.com/top/p.{}'.format(page + 1)
        print(url)
        html = get_html(url)
        # 2.解析网页源代码
        steam = parse_html(html)
        time.sleep(10)
        # 保存信息
        save_data(steam)
        print('第' + str(page + 1) + '页已完成！')
    print('数据获取已完成！')
