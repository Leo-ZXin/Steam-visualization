import pandas as pd


def Games_Sales():  # 游戏销量排行
    # 读取文件
    data_path = pd.read_csv('../Data/Games.csv')
    data = pd.DataFrame(data_path).set_index('Rank')  # 各地区游戏销售总量
    NA_Sales = data['NA_Sales'].sum()
    EU_Sales = data['EU_Sales'].sum()
    JP_Sales = data['JP_Sales'].sum()
    Other_Sales = data['Other_Sales'].sum()
    Global_Sales = data['Global_Sales'].sum()
    Sales = [{
        'NA_Sales': NA_Sales,
        'EU_Sales': EU_Sales,
        'JP_Sales': JP_Sales,
        'Other_Sales': Other_Sales,
        'Global_Sales': Global_Sales,
    }]
    data.to_json('../Data/Games_new.json', orient='records')
    print("游戏销量写入本地成功。")
    Sales = pd.DataFrame(Sales)
    Sales.to_json('../Data/Games_Sales_new.json', orient='records')
    print("地区销量写入本地成功。")

    # print(Sales)


def Top():  # 游戏玩家数量排行
    # 读取文件
    data_path = pd.read_csv('../Data/Steam_top.csv', header=None)
    data_path.columns = ['Top', 'name', 'current_players', 'peak_players', 'hours_played']
    data = pd.DataFrame(data_path)
    data.replace('\s+', '', regex=True, inplace=True)  # 数据清洗
    # print(data)
    data.to_json('../Data/Steam_top_new.json', orient='records')
    print("游戏玩家人数写入本地成功。")


def time_to():  # 游戏玩家变化
    data_path = pd.read_csv('../Data/Player_traffic.csv', encoding='ISO-8859-1')
    data = pd.DataFrame(data_path)
    data.groupby(data['gamename'])
    df1 = data[data['gamename'] == 'Counter-Strike: Global Offensive']
    df2 = data[data['gamename'] == 'Grand Theft Auto V']
    df = pd.concat([df1, df2])
    # print(df)

    df['year'] = (df['year'] + 2).astype('str')
    df['month'] = df['month'].astype('str')
    df['time'] = df['year'] + '-' + df['month']
    df = df.loc[:, ['gamename', 'time', 'peak']]
    # print(df['time'])
    # print(df)

    df.to_json('../Data/Player_traffic_new.json', orient='records')


def classify():  # 游戏分类
    pd.set_option('display.max_column', None)
    data_path = pd.read_csv('../Data/Games.csv', encoding='ISO-8859-1', index_col='Rank')
    data = pd.DataFrame(data_path)
    df = data.loc[:, ['Name', 'Platform', 'Year', 'Genre', 'Publisher']]

    Platform = df.groupby('Platform').size()
    # print(Platform)
    # Platform.to_json('../Data/Platform.json')

    Genre = df.groupby('Genre').size()
    # print(Genre)
    # Genre.to_json('../Data/Genre.json')

    Publisher = df.groupby('Publisher').size()
    # print(Publisher)
    # Publisher.to_json('../Data/Publisher.json')


if __name__ == '__main__':
    # Games_Sales()  # 游戏销量排行

    # Top()  # 游戏玩家数量排行

    # time_to()  # 游戏玩家变化

    classify()  # 游戏分类
