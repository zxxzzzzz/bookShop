import dbHelper as db
from email.mime.text import MIMEText
from email.header import Header
import smtplib
import base64

'''
对商城的操作的包装
'''


def login(name, password):
  name = f"'{name}'"
  password = f"'{password}'"
  sql = f"select * from `user` where `name`={name} and `password`={password}"
  datas = db.select(sql)
  if len(datas) == 0:
    return False
  return True

def regi(name, password, mail):
  sql = f'insert into `user` (`name`, `password`, `role`, `active`, `mail`) values ("{name}", "{password}", 1, "unactive", "{mail}")'
  db.commit(sql)
  # 发送激活邮件
  enName = base64.b64encode(name.encode('utf8')).decode('utf8') # 加密后的名字
  content = f'请把该邮件地址复制到浏览器来激活邮件 http://localhost:5000/api/active/{enName}'
  sendMail(mail, content)

def activeUser(name):
  sql = f'update `user` set `active`="active" where `name`="{name}"'
  db.commit(sql)

def searchBook(*args, title='', author='', press='', bookClass=''):
  re = []
  sql = ''
  classSql = f' and class.class like "%{bookClass}%"'
  titleSql = f' and book.title like "%{title}%"'
  authorSql = f' and book.author like "%{author}%"'
  pressSql = f' and book.press like "%{press}%"'
  # priceSql = f' and `book.price` between {price[0]} and {price[1]}'
  baseSql = f'SELECT * from `book` INNER JOIN `class` on class.bookId=book.id'
  sql = baseSql
  if bookClass != '':
    sql += classSql
  if title != '':
    sql += titleSql
  if author != '':
    sql += authorSql
  if press != '':
    sql += pressSql
  # if price != []:
  #   sql += priceSql
  # print(sql)
  return db.select(sql)

def getRecomBooks(userId, limit = 10):
  # 直接查询最新操作
  re = []
  sql = f'SELECT * from `history` where `userId`={userId} order by id desc limit 1'
  datas = db.select(sql)
  if len(datas) == 1:
    row = datas[0]
    sql = f'SELECT class.class from `book` INNER JOIN `class` on class.bookId=book.id and book.id={row["bookId"]}'
    datas = db.select(sql)
    row = datas[0]
    bookClass = row['class']
    re = searchBook(bookClass=bookClass)
  return re

def getHotBooks(limit=10):
  re = []
  sql = f'SELECT bookId, count(bookId) from `history` group by `bookId` order by count(bookId) desc limit {limit}'
  datas = db.select(sql)
  baseSql = f'SELECT * from `book` INNER JOIN `class` on class.bookId=book.id and'
  for index, row in enumerate(datas):
    if index == len(datas) - 1:
      baseSql += f' book.id={row["bookId"]}'
    else:
      baseSql += f' book.id={row["bookId"]} or'
  return db.select(baseSql)
    
def getReadContent(bookId):
  sql = f'select extract from book where id={bookId}'
  row = db.select(sql)[0]
  return row['extract']

def addComment(userId, bookId, content):
  sql = f'insert into comment (bookid, content, userId) values ({bookId}, "{content}", {userId})'
  db.commit(sql)

def getComment(bookId):
  sql = f'select * from comment where bookId={bookId}'
  return db.select(sql)

def addCart(userId, bookId):
  sql = f'insert into shoppingcart (bookId, userId) values ({bookId}, {userId})'
  return db.commit(sql)

def getCart(userId):
  sql = f'select * from shoppingcart inner join book on shoppingcart.bookId = book.id and shoppingcart.userId={userId}'
  return db.select(sql)

def delCart(userId, bookId):
  sql = f'delete from shoppingcart where bookId={bookId} and userId={userId}'
  return db.commit(sql)

def addOrder(userId, bookId):
  sql = f'insert into order (bookId, userId, state) values ({bookId}, {userId}, "待发货")'
  return db.commit(sql)

def getOrder(userId):
  sql = f'select * from order where userId={userId}'
  return db.select(sql)


def sendMail(address, content):
  msg = MIMEText(content, 'plain', 'utf-8')
  msg['Subject'] = '激活邮件'
  msg['From'] = 'bookshopjjy@163.com'
  msg['To'] = address
  server = smtplib.SMTP('smtp.163.com',  25)
  server.login('bookshopjjy@163.com', 'a3c8Uh2Vb6DPjjy')
  server.sendmail('bookshopjjy@163.com', address, msg.as_string())
  server.quit()


if __name__ == "__main__":
    print(login('zxx','zxx'))
    print(login('zxx1','zxx'))
    # sendMail('812603872@qq.com', '你好')