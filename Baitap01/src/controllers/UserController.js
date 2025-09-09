const database = require('../config/database');
const { validationResult } = require('express-validator');

class UserController {
  // Display all users
  async index(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';

      let result;
      if (search) {
        const users = database.searchUsers(search);
        result = {
          users,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalUsers: users.length,
            hasNext: false,
            hasPrev: false
          }
        };
      } else {
        result = database.getUsersWithPagination(page, limit);
      }

      res.render('users/index', {
        title: 'Users Management',
        users: result.users,
        pagination: result.pagination,
        search: search,
        currentRoute: '/users'
      });
    } catch (error) {
      req.flash('error', error.message);
      res.redirect('/');
    }
  }

  // Show create user form
  create(req, res) {
    res.render('users/create', {
      title: 'Add New User',
      user: {},
      errors: {},
      currentRoute: '/users'
    });
  }

  // Store new user
  async store(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render('users/create', {
          title: 'Add New User',
          user: req.body,
          errors: errors.mapped(),
          currentRoute: '/users'
        });
      }

      const user = database.createUser(req.body);
      req.flash('success', `User ${user.firstName} ${user.lastName} created successfully!`);
      res.redirect('/users');
    } catch (error) {
      req.flash('error', error.message);
      res.render('users/create', {
        title: 'Add New User',
        user: req.body,
        errors: {},
        currentRoute: '/users'
      });
    }
  }

  // Show specific user
  show(req, res) {
    try {
      const user = database.getUserById(req.params.id);
      
      if (!user) {
        req.flash('error', 'User not found');
        return res.redirect('/users');
      }

      res.render('users/show', {
        title: `User: ${user.firstName} ${user.lastName}`,
        user: user,
        currentRoute: '/users'
      });
    } catch (error) {
      req.flash('error', error.message);
      res.redirect('/users');
    }
  }

  // Show edit user form
  edit(req, res) {
    try {
      const user = database.getUserById(req.params.id);
      
      if (!user) {
        req.flash('error', 'User not found');
        return res.redirect('/users');
      }

      res.render('users/edit', {
        title: `Edit User: ${user.firstName} ${user.lastName}`,
        user: user,
        errors: {},
        currentRoute: '/users'
      });
    } catch (error) {
      req.flash('error', error.message);
      res.redirect('/users');
    }
  }

  // Update user
  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const user = database.getUserById(req.params.id);
        return res.render('users/edit', {
          title: `Edit User: ${user.firstName} ${user.lastName}`,
          user: { ...user, ...req.body },
          errors: errors.mapped(),
          currentRoute: '/users'
        });
      }

      const user = database.updateUser(req.params.id, req.body);
      req.flash('success', `User ${user.firstName} ${user.lastName} updated successfully!`);
      res.redirect('/users');
    } catch (error) {
      req.flash('error', error.message);
      const user = database.getUserById(req.params.id);
      if (user) {
        res.render('users/edit', {
          title: `Edit User: ${user.firstName} ${user.lastName}`,
          user: { ...user, ...req.body },
          errors: {},
          currentRoute: '/users'
        });
      } else {
        res.redirect('/users');
      }
    }
  }

  // Delete user
  destroy(req, res) {
    try {
      const user = database.deleteUser(req.params.id);
      req.flash('success', `User ${user.firstName} ${user.lastName} deleted successfully!`);
    } catch (error) {
      req.flash('error', error.message);
    }
    res.redirect('/users');
  }

  // API endpoints for AJAX requests
  async apiIndex(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';

      let result;
      if (search) {
        const users = database.searchUsers(search);
        result = {
          users,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalUsers: users.length,
            hasNext: false,
            hasPrev: false
          }
        };
      } else {
        result = database.getUsersWithPagination(page, limit);
      }

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async apiShow(req, res) {
    try {
      const user = database.getUserById(req.params.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new UserController();