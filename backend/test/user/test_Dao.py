import json

import pytest

from src.util.dao import DAO


class TestUserDao:
  @pytest.fixture
  def sut(self):
    dao = DAO(collection_name='user')
    ids = []
    yield {'dao': dao, 'ids': ids}
    for id in ids:
      dao.delete(id['$oid'])

  @pytest.mark.dao
  def test_create_valid(self, sut):
    data = {'firstName': 'Jane', 'lastName': 'Doe', 'email': 'd@d.com'}
    user = sut["dao"].create(data)
    sut['ids'].append(user['_id'])
    assert user['firstName'] == data['firstName'] and user['lastName'] == data[
      'lastName'] and user['email'] == data['email']

  @pytest.mark.dao
  def test_create_missing_required_field(self, sut):
    data = {'lastName': 'Doe', 'email': 'c@c.com'}  # Missing 'firstName'
    with pytest.raises(Exception) as e:
      user = sut["dao"].create(data)
      if user is not None:
        sut['ids'].append(user['_id'])

  @pytest.mark.dao
  def test_create_duplicate_unique_field(self, sut):
    data1 = {'firstName': 'Jane', 'lastName': 'Doe', 'email': 'a@a.com'}
    data2 = {'firstName': 'A', 'lastName': 'A', 'email': 'a@a.com'}
    user = sut["dao"].create(data1)

    sut['ids'].append(user['_id'])

    # Second create should fail
    with pytest.raises(Exception) as e:
      user2 = sut["dao"].create(data2)  # Should raise an exception but doesnt
      if user2 is not None:
        sut['ids'].append(user2['_id'])

  @pytest.mark.dao
  def test_not_complient_json(self, sut):
    data = {'firstName': 'Jane', 'lastName': 'Doe', 'email': 1212}
    with pytest.raises(Exception) as e:
      user = sut["dao"].create(data)
      if user is not None:
        sut['ids'].append(user['_id'])


class TestTaskDao:
  @pytest.fixture
  def sut(self):
    dao = DAO(collection_name='task')
    ids = []
    yield {'dao': dao, 'ids': ids}
    for id in ids:
      dao.delete(id['$oid'])

  @pytest.mark.dao
  def test_create_valid(self, sut):
    data = {'title': 'testing1', 'description': 'test1'}
    task = sut["dao"].create(data)
    sut['ids'].append(task['_id'])
    assert (task['title'] == data['title'] and
            task['description'] == data['description'])

  # Test id: T2
  @pytest.mark.dao
  def test_create_missing_required_field(self, sut):
    data = {'description': 'test1'}
    with pytest.raises(Exception) as e:
      task = sut["dao"].create(data)
      if task is not None:
        sut['ids'].append(task['_id'])

  @pytest.mark.dao
  def test_create_duplicate_unique_field(self, sut):
    data1 = {'title': 'test2', 'description': 'test1'}
    data2 = {'title': 'test2', 'description': 'test1123'}
    task = sut["dao"].create(data1)

    sut['ids'].append(task['_id'])

    # Second create should fail
    with pytest.raises(Exception) as e:
      task2 = sut["dao"].create(data2)  # Should raise an exception but doesnt
      if task2 is not None:
        sut['ids'].append(task2['_id'])

  # Test id: T4
  @pytest.mark.dao
  def test_not_complient_json(self, sut):
    data = {'title': 1.23, 'description': 'test1'}
    with pytest.raises(Exception) as e:
      task = sut["dao"].create(data)
      if task is not None:
        sut['ids'].append(task['_id'])


class TestTodoDao:
  @pytest.fixture
  def sut(self):
    dao = DAO(collection_name='todo')
    ids = []
    yield {'dao': dao, 'ids': ids}
    for id in ids:
      dao.delete(id['$oid'])

  @pytest.mark.dao
  def test_create_valid(self, sut):
    data = {'description': 'test1'}
    todo = sut["dao"].create(data)
    sut['ids'].append(todo['_id'])
    assert todo['description'] == data['description']

  @pytest.mark.dao
  def test_create_missing_required_field(self, sut):
    data = {'done': True}
    with pytest.raises(Exception) as e:
      todo = sut["dao"].create(data)
      if todo is not None:
        sut['ids'].append(todo['_id'])

  @pytest.mark.dao
  def test_create_duplicate_unique_field(self, sut):
    data1 = {'description': 'test2', 'done': False}
    data2 = {'description': 'test2', 'done': True}
    todo = sut["dao"].create(data1)

    sut['ids'].append(todo['_id'])

    # Second create should fail
    with pytest.raises(Exception) as e:
      todo2 = sut["dao"].create(data2)  # Should raise an exception but doesnt
      if todo2 is not None:
        sut['ids'].append(todo2['_id'])

  @pytest.mark.dao
  def test_not_complient_json(self, sut):
    data = {'description': 123, 'done': 'true'}
    with pytest.raises(Exception) as e:
      todo = sut["dao"].create(data)
      if todo is not None:
        sut['ids'].append(todo['_id'])


class TestVideoDao:
  @pytest.fixture
  def sut(self):
    dao = DAO(collection_name='video')
    ids = []
    yield {'dao': dao, 'ids': ids}

    for id in ids:
      dao.delete(id['$oid'])

  # Test id: T1
  @pytest.mark.dao
  def test_create_valid(self, sut):
    data = {'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
    todo = sut["dao"].create(data)
    sut['ids'].append(todo['_id'])
    assert todo['url'] == data['url']

  @pytest.mark.dao
  def test_create_missing_required_field(self, sut):
    data = {}
    with pytest.raises(Exception) as e:
      video = sut["dao"].create(data)
      if video is not None:
        sut['ids'].append(video['_id'])


  # Test id: T4
  @pytest.mark.dao
  def test_not_complient_json(self, sut):
    data = {'url': 123}
    with pytest.raises(Exception) as e:
      video = sut["dao"].create(data)
      if video is not None:
        sut['ids'].append(video['_id'])
