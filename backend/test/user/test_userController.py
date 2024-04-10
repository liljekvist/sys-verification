from unittest.mock import patch

import pytest

from src.controllers.usercontroller import UserController


class TestUserController:

  # Test id: T1
  @pytest.mark.user
  @patch('src.util.helpers.DAO', autospec=True)
  def test_get_user_valid_one_user(self, mockedDAO):
    user = [{'firstName': 'Jane', 'lastName': 'Doe', 'email': 'jane@doe.com'}]
    mockedDAO.find.return_value = user
    uc = UserController(dao=mockedDAO)

    assert uc.get_user_by_email('jane@doe.com') == user[0]

  # Test id: T2
  @pytest.mark.user
  @patch('src.util.helpers.DAO', autospec=True)
  def test_get_user_valid_multiple_user(self, mockedDAO):
    user = [{'firstName': 'Jane', 'lastName': 'Doe', 'email': 'jane@doe.com'},
            {'firstName': 'John', 'lastName': 'Doe', 'email': 'jane@doe.com'}]
    mockedDAO.find.return_value = user
    uc = UserController(dao=mockedDAO)

    assert uc.get_user_by_email('jane@doe.com') == user[0]

  # Test id: T3, T4
  @pytest.mark.user
  @patch('src.util.helpers.DAO', autospec=True)
  def test_get_user_not_found(self, mockedDAO):
    user = []
    mockedDAO.find.return_value = user
    uc = UserController(dao=mockedDAO)

    assert uc.get_user_by_email('jane@doe.com') is None

  # Test id: T5
  @pytest.mark.user
  @patch('src.util.helpers.DAO', autospec=True)
  def test_get_user_not_valid_email_multiple(self, mockedDAO):
    with pytest.raises(ValueError) as e_info:
      user = [{'firstName': 'Jane', 'lastName': 'Doe', 'email': 'jane.doe'},
              {'firstName': 'John', 'lastName': 'Doe', 'email': 'jane.doe'}]
      mockedDAO.find.return_value = user
      uc = UserController(dao=mockedDAO)
      assert uc.get_user_by_email('jane.doe') is None

  # Test id: T6
  @pytest.mark.user
  @patch('src.util.helpers.DAO', autospec=True)
  def test_get_user_not_valid_email_one(self, mockedDAO):
    with pytest.raises(ValueError) as e_info:
      user = [{'firstName': 'Jane', 'lastName': 'Doe', 'email': 'jane.doe'}]
      mockedDAO.find.return_value = user
      uc = UserController(dao=mockedDAO)
      assert uc.get_user_by_email('jane.doe') is None

  # Test id: T7, T8
  @pytest.mark.user
  @patch('src.util.helpers.DAO', autospec=True)
  def test_get_user_not_valid_email_no_match(self, mockedDAO):
    with pytest.raises(ValueError) as e_info:
      user = []
      mockedDAO.find.return_value = user
      uc = UserController(dao=mockedDAO)
      assert uc.get_user_by_email('jane.doe') is None
