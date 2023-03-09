import pandas as pd

data = pd.read_csv('../Data/Games.csv')
pd.set_option('display.max_column', None)
data = pd.DataFrame(data).set_index('Rank')
df = data.loc[:, ['Name', 'Platform', 'Year', 'Genre', 'Publisher']]
# print(df)

df['Name'] = df['Name'].astype('str')
df['Platform'] = df['Platform'].astype('str')
df['Year'] = df['Year'].astype('str')
df['Genre'] = df['Genre'].astype('str')
df['Publisher'] = df['Publisher'].astype('str')
df['Information'] = '<li><p><span>' + df['Name'] + '</span><span>' + df['Platform'] + '</span><span>' + df['Year'] + '</span><span>' + df['Genre'] + '</span><span>' + df['Publisher'] + '</span></p></li>'
df_Information = df.loc[:, 'Information']
# print(df_Information)

df_Information.to_csv('Information.txt', sep=' ', header=0)