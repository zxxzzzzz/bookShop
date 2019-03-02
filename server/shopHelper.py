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
    return None
  return datas[0]

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

def searchBook(*args, title='', author='', press='', bookClass='', bookId=-1):
  classSql = f'class.class like "%{bookClass}%"'
  titleSql = f'book.title like "%{title}%"'
  authorSql = f'book.author like "%{author}%"'
  pressSql = f'book.press like "%{press}%"'
  bookIdSql = f'book.id = {bookId}'
  # priceSql = f' and `book.price` between {price[0]} and {price[1]}'
  baseSql = f'SELECT * from `book` INNER JOIN `class` on class.bookId=book.id and ('
  
  otherPartSql = '1=1'
  if title != '':
   otherPartSql = titleSql
  if author != '':
    if len(otherPartSql) < 6:
      otherPartSql = authorSql
    else:
      otherPartSql += ' or ' + authorSql
  if press != '':
    if len(otherPartSql) < 6:
      otherPartSql = pressSql
    else:
      otherPartSql += ' or ' + pressSql
  if bookClass != '':
    if len(otherPartSql) < 6:
      otherPartSql = classSql
    else:
      otherPartSql += ' or ' + otherPartSql
  if bookId != -1:
    if len(otherPartSql) < 6:
      otherPartSql = bookIdSql
    else:
      otherPartSql += ' or ' + bookIdSql
  otherPartSql += ')'
  return db.select(baseSql + otherPartSql)

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

def getUserInfo(userId):
  sql = f'select * from userinfo where userId={userId}'
  return db.select(sql)

def insertUserInfo(userId, sex, name, message, address):
  sql = f'select * from userinfo where userId={userId}'
  re = db.select(sql)
  if len(re) > 0:
    # update
    sql = f'update userinfo set sex="{sex}", name="{name}",message="{message}",address="{address}" where userId={userId}'
  else:
    # insert
    sql = f'insert into userinfo (userId, sex, name, message, address) values ({userId}, "{sex}", "{name}", "{message}", "{address}")'
  return db.commit(sql)

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

def delCart(id):
  sql = f'delete from shoppingcart where id={id}'
  return db.commit(sql)

def addOrder(userId, bookId):
  sql = f'insert into `order` (bookId, userId, state) values ({bookId}, {userId}, "待发货")'
  db.commit(sql)
  sql = f'update book set stockCount = stockCount -1 where id={bookId}'
  return db.commit(sql)

def getOrder(userId=-1):
  if(userId == -1):
    sql = f'select * from `order` inner join book on order.bookId=book.id' 
    return db.select(sql)
  sql = f'select * from `order` inner join book on order.bookId=book.id and order.userId={userId}'
  return db.select(sql)

def addBook(title, press, price, pageCount, extract, author, img, intro, bookClass, stockCount):
  sql = f'insert into book (title, press, price, pageCount, extract, author, img, introduction) values ("{title}", "{press}", {price}, {pageCount}, "{extract}", "{author}", "{img}", "{intro}")'
  db.commit(sql)
  sql = 'select id from book order by id DESC limit 1'
  bookId = db.select(sql)[0]['id']
  for elem in bookClass.split(' '):
    sql = f'insert into class (bookId, class) values ({bookId}, "{elem}")'
    db.commit(sql)
    
def updateBook(id, title, press, price, pageCount, extract, author, img, intro, bookClass, stockCount):
  sql = f'update book set title="{title}", press="{press}", price={price}, pageCount={pageCount}, extract="{extract}", author="{author}", img="{img}", introduction="{intro}", stockCount={stockCount} where id={id}'
  print(sql)
  db.commit(sql)
  sql = f'delete from class where bookId={id}'
  db.commit(sql)
  sql = f'insert into class (bookId, class) values ({id}, "{bookClass}")'
  return db.commit(sql)

def updateOrder(orderId, state):
  sql = f'update `order` set state="{state}" where id={orderId}'
  return db.commit(sql)

def updateUserInfo(userId, sex, name, message, address):
  sql = f'select * from userinfo where userId={userId}'
  data = db.select(sql)
  if len(data) > 0:
    # update
    sql = f'update userinfo set sex="{sex}", name="{name}", message="{message}", address="{address}" where userId={userId}'
    db.commit(sql)
  else:
    # insert
    sql = f'insert into userInfo (sex,name,message,address) values ("{sex}", "{name}", "{message}", "{address}") where userId='


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