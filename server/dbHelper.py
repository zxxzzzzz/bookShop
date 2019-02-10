import pymysql.cursors

'''
数据库操作助手函数库
'''
# 连接数据库
_con = pymysql.connect(host='localhost',
                             user='root',
                             password='',
                             db='bookshop',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)


# Connect to the database



def select(sqlStr, size = 0):
  result = None
  global _con
  _con.close()
  _con = pymysql.connect(host='localhost',
                             user='root',
                             password='',
                             db='bookshop',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
  with _con.cursor() as cursor:
    cursor.execute(sqlStr)
    if size <= 0:
      result = cursor.fetchall()
    else:
      result = cursor.fetchmany(size)
  return result


def commit(sqlStr):
  with _con.cursor() as cursor:
    cursor.execute(sqlStr)
  _con.commit()



if __name__ == '__main__':
  '''
  测试
  '''    
  print(select('select * from user'), 2)
  commit("insert into `user` (name,password,role,active) values ('zx', 'zx', 1, 'active')")
  commit("delete from `user` where `name`='zx'")
