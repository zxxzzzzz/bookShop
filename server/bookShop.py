from flask import Flask
from flask import request
from flask import jsonify
import shopHelper as shop
import base64

app = Flask(__name__)

baseUrl = '/api'


# 登陆
@app.route(baseUrl + '/login', methods=['POST'])
def login():
  '''
  格式：
    name:
    password:
  '''
  args = request.get_json(force = True)
  name = args['name']
  password = args['password']
  isExist = False
  if shop.login(name, password):
    isExist = True
  return jsonify({
    'isSuccess': isExist
  })

# 登出(登出不在服务器做，在浏览器端做)
# 删除                                 
@app.route(baseUrl + '/logout')
def logout():
  '''
  格式：
    name:
    password:
  '''
  return 'Hello, World!'

# 注册
@app.route(baseUrl +  '/regi', methods=['POST'])
def regi():
  '''
  name
  password
  mail
  '''
  args = request.get_json(force = True)
  name = args['name']
  password = args['password']
  mail = args['mail']
  shop.regi(name, password, mail)
  return jsonify({
    'isSuccess': True
  })

# 激活
@app.route(baseUrl +  '/active/<name>')
def active(name):
  oriName = base64.b64decode(name.encode('utf8')).decode('utf8')
  shop.activeUser(oriName)
  return jsonify({
    'isSuccess': True
  })

# 书籍查询
@app.route(baseUrl + '/search')
def search():
  args = request.args
  params = {}
  for key in args:
    params[key] = args[key]
  data = shop.searchBook(**params)
  return jsonify(data)

# 书籍推荐
@app.route(baseUrl + '/recom')
def recom():
  args = request.args
  data = shop.getRecomBooks(args['userId'])
  return jsonify(data)

# 排行榜
@app.route(baseUrl + '/hot')
def hot():
  data = shop.getHotBooks()
  return jsonify(data)

# 试读
@app.route(baseUrl + '/read')
def read():
  bookId = request.args['bookId']
  content = shop.getReadContent(bookId)
  return jsonify({
    'content': content
  })

# 添加书评
@app.route(baseUrl + '/comment', methods=['POST'])
def comment():
  args = request.get_json(force = True)
  userId = args['userId']
  bookId = args['bookId']
  content = args['content']
  shop.addComment(userId, bookId, content)
  return jsonify({
    'isSuccess':True
  })



# 获取书评
@app.route(baseUrl + '/comment')
def getComment():
  args = request.args
  bookId = args['bookId']
  return jsonify(
    shop.getComment(bookId)
  )

# 添加购物车
@app.route(baseUrl + '/cart', methods=['POST'])
def cart():
  args = request.get_json(force = True)
  userId = args['userId']
  bookId = args['bookId']
  shop.addCart(userId, bookId)
  return jsonify({
    'isSuccess':True
  })

# 获取购物车内容
@app.route(baseUrl + '/cart')
def getCart():
  args = request.args
  userId = args['userId']
  data = shop.getCart(userId)
  return jsonify(data)

# 取消购买书籍
@app.route(baseUrl + '/cash', methods=['POST'])
def cancelBuy():
  args = request.get_json(force = True)
  userId = args['userId']
  bookId = args['bookId']
  shop.delCart(userId, bookId)
  return jsonify({
    'isSuccess':True
  })

# 支付
@app.route(baseUrl + '/order', methods=['POST'])
def pay():
  args = request.get_json(force = True)
  userId = args['userId']
  bookId = args['bookId']
  shop.addOrder(userId, bookId)
  return jsonify({
    'isSuccess':True
  })

# 获取订单信息
@app.route('/order')
def order():
  args = request.args
  userId = args['userId']
  return jsonify(shop.getOrder(userId))
  
# 确认收货
@app.route('/delivery')
def index():
  return 'Hello, World!'
