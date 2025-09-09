const express = require('express');
const router = express.Router();
const database = require('../config/database');

// Home page
router.get('/', (req, res) => {
  const users = database.getAllUsers();
  const stats = {
    totalUsers: users.length,
    maleUsers: users.filter(user => user.gender === 'male').length,
    femaleUsers: users.filter(user => user.gender === 'female').length,
    averageAge: users.length > 0 ? Math.round(users.reduce((sum, user) => sum + (user.age || 0), 0) / users.length) : 0
  };

  res.render('home', {
    title: 'User Management System',
    stats: stats,
    recentUsers: users.slice(-5).reverse(), // Last 5 users
    currentRoute: '/'
  });
});

module.exports = router;